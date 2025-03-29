"use client";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Trips } from "@/types/trips";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TripTable({
  trips,
}: {
  trips: { [key: string]: Trips[] };
}) {
  const tripsByDate = Object.keys(trips).flatMap((date) => {
    const subTrips = trips[date];
    return subTrips.map((trip) => ({ date: date, trip: trip }));
  });

  console.log(tripsByDate);

  const columns: ColumnDef<{
    date: string;
    trip: Trips;
  }>[] = [
    { header: "Date", accessorKey: "date" },
    {
      header: "Distance",
      accessorKey: "trip.distance",
      cell: ({ row }) => `${row.original.trip.distance} m`,
    },
    {
      header: "View Trip",
      cell: ({ row }) => (
        <Button variant="outline" className="w-full" asChild>
          <Link
            href={{
              pathname: usePathname(),
              query: {
                tripStartId: row.original.trip.startId,
                tripEndId: row.original.trip.endId,
                page: "location",
              },
            }}
          >
            View Trip
          </Link>
        </Button>
      ),
    },
  ];
  return (
    <div>
      <DataTable columns={columns} data={tripsByDate} />
    </div>
  );
}
