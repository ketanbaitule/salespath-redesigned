"use client";
import { LatLng } from "@mmit/latlong";
import dynamic from "next/dynamic";

const MapView = dynamic(
  () =>
    import(
      "@/app/(dashboard)/dashboard/salesperson/[salespersonId]/_salespersonMapView/MapView"
    ),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function LocationTracker({
  _polyline,
}: {
  _polyline: [number, number][];
}) {
  return (
    <div className="px-10 py-5 w-full">
      <MapView _polyline={_polyline} />
    </div>
  );
}
