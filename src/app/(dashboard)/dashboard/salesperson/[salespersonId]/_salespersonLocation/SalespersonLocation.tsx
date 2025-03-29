import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trips } from "@/types/trips";
import { createClient } from "@/utils/supabase/server";
import { Distance, LatLng } from "@mmit/latlong";
import TripTable from "./TripTable";

export default async function SalespersonLocation({
  salesperson_id,
}: {
  salesperson_id: string;
}) {
  const client = await createClient();
  const locationHistory = await client
    .from("location_tracker")
    .select("*")
    .eq("salesperson_id", salesperson_id)
    .order("datetime", { ascending: false })
    .then(({ data, error }) => {
      if (error) {
        console.log(error);
        return [];
      }
      return data.map((location) => ({
        id: location.id,
        datetime: location.datetime,
        lat: location.lat,
        long: location.long,
      }));
    });

  const locationHistoryByDate = locationHistory.reduce(
    (acc, curr) => {
      const date = new Date(curr.datetime).toDateString();
      if (acc[date]) {
        acc[date].push(curr);
      } else {
        acc[date] = [curr];
      }
      return acc;
    },
    {} as { [key: string]: typeof locationHistory }
  );

  const sortedLocationHistoryByDate = Object.keys(locationHistoryByDate)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .reduce(
      (acc, date) => {
        acc[date] = locationHistoryByDate[date].sort(
          (a, b) =>
            new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
        );
        return acc;
      },
      {} as { [key: string]: typeof locationHistory }
    );

  const distance = new Distance();

  const distanceThreshold = 1500; // in meters

  const subTripsByDate: { [key: string]: Trips[] } = {};

  Object.keys(sortedLocationHistoryByDate).forEach((date) => {
    const locations = sortedLocationHistoryByDate[date];
    const subTrips: Trips[] = [];

    let currentSubTrip: Trips = {
      startId: locations[0].id,
      endId: locations[0].id,
      distance: 0,
      path: [[locations[0].lat, locations[0].long]],
    };

    for (let i = 1; i < locations.length; i++) {
      const prevLocation = locations[i - 1];
      const currentLocation = locations[i];

      const adjacentDistance = distance.distance(
        new LatLng(prevLocation.lat, prevLocation.long),
        new LatLng(currentLocation.lat, currentLocation.long)
      );

      if (adjacentDistance > distanceThreshold) {
        currentSubTrip.endId = prevLocation.id; // Set the endId for the current sub-trip
        subTrips.push(currentSubTrip);
        currentSubTrip = {
          startId: currentLocation.id,
          endId: currentLocation.id,
          distance: 0,
          path: [[currentLocation.lat, currentLocation.long]],
        };
      } else {
        currentSubTrip.distance += adjacentDistance;
        currentSubTrip.path.push([currentLocation.lat, currentLocation.long]);
        currentSubTrip.endId = currentLocation.id; // Update the endId as we progress
      }
    }

    currentSubTrip.endId = locations[locations.length - 1].id; // Set the endId for the last sub-trip
    subTrips.push(currentSubTrip); // Push the last sub-trip
    subTripsByDate[date] = subTrips;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Trips</CardTitle>
        <CardDescription> List of Recent Trips </CardDescription>
      </CardHeader>
      <CardContent>
        {Object.keys(subTripsByDate).length === 0 ? (
          <div>No trips recorded</div>
        ) : (
          <TripTable trips={subTripsByDate} />
        )}
      </CardContent>
    </Card>
  );
}
