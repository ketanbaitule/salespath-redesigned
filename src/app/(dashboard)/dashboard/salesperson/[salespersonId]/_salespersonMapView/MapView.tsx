"use client";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { MapContainer, Polyline, TileLayer, useMapEvents } from "react-leaflet";

export default function MapView({
  _polyline,
}: {
  _polyline: [number, number][];
}) {
  const [polyline, setPolyline] = useState<LatLng[]>([]);
  useEffect(() => {
    setPolyline(_polyline.map(([lat, lng]) => new LatLng(lat, lng)));
  }, [_polyline]);

  // Calculate the mean latitude and longitude
  const latSum = _polyline.reduce((acc, [lat]) => acc + lat, 0);
  const lngSum = _polyline.reduce((acc, [, lng]) => acc + lng, 0);
  const meanLat = latSum / _polyline.length;
  const meanLng = lngSum / _polyline.length;
  const meanLatLong = new LatLng(
    meanLat || 21.161361200807214,
    meanLng || 79.08576965332033
  );

  const limeOptions = { color: "lime" };
  return (
    <MapContainer
      center={meanLatLong || new LatLng(21.161361200807214, 79.08576965332033)}
      zoom={13}
      className="h-[80vh] w-full relative"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">'
      />
      <Polyline pathOptions={limeOptions} positions={polyline} />
      <CustomMapComponent />
    </MapContainer>
  );
}

function CustomMapComponent() {
  useMapEvents({
    click: async (e) => {
      console.log("Map Clicked", e);
      toast.info(
        `Lat, Long of current location is: ${e.latlng.lat}, ${e.latlng.lng}`
      );
      await navigator.clipboard.writeText(`${e.latlng.lat}, ${e.latlng.lng}`);
    },
    locationfound: (location) => {
      console.log("location found:", location);
    },
  });
  return (
    <>
      <Toaster />
    </>
  );
}
