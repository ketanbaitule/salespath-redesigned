import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import LocationTracker from "./LocationTracker";
import { Distance, LatLng } from "@mmit/latlong";
import { Button } from "@/components/ui/button";

export default async function LocationMapView({
  salesperson_id,
  searchParams,
}: {
  salesperson_id: string;
  searchParams: { tripStartId: string; tripEndId: string } | undefined | null;
}) {
  const client = await createClient();

  let data;

  if (
    searchParams &&
    "tripStartId" in searchParams &&
    "tripEndId" in searchParams
  ) {
    data = await client
      .from("location_tracker")
      .select("*")
      .eq("salesperson_id", salesperson_id)
      .gte("id", searchParams.tripStartId)
      .lte("id", searchParams.tripEndId)
      .order("datetime", { ascending: false });
    console.log("Old Data", data.data?.length);
  } else {
    data = await client
      .from("location_tracker")
      .select("*")
      .eq("salesperson_id", salesperson_id)
      .order("datetime", { ascending: false })
      .limit(50);

    if (data.data) {
      const currentDate = new Date().toISOString().split("T")[0];
      const filteredData = data.data.filter((location) =>
        location.datetime.startsWith(currentDate)
      );

      if (filteredData.length === 0) {
        data.data = [];
      } else {
        const distance = new Distance();

        const thresholdDistance = 500; // in meters

        let startTrip = filteredData[0];
        let filteredLocations = [startTrip];
        for (let i = 1; i < filteredData.length; i++) {
          const currentLocation = filteredData[i];
          const startLocation = filteredLocations[filteredLocations.length - 1];
          const adjacentDistance = distance.distance(
            new LatLng(startLocation.lat, startLocation.long),
            new LatLng(currentLocation.lat, currentLocation.long)
          );
          if (adjacentDistance <= thresholdDistance) {
            filteredLocations.push(currentLocation);
          } else {
            break;
          }
        }

        data.data = filteredLocations;
        console.log("Latest Data", data.data);
      }
    }
  }

  const polylines = data.data?.map((location) => [location.lat, location.long]);

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Location Map</CardTitle>
            <CardDescription>
              View the location of the salesperson
            </CardDescription>
          </div>
          <div>
            <Button>Refresh</Button>
          </div>
        </CardHeader>
        <CardContent>
          {data.data && data.data.length > 0 ? (
            <LocationTracker
              _polyline={(polylines as [number, number][]) || []}
            />
          ) : (
            <div>No location data available</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
