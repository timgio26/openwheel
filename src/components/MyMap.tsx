import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
// import { Coordinate} from "@/utils/types";

type MapProp = {
  lat1: string | number | undefined;
  lng1: string | number | undefined;
  lat2: string | number | undefined;
  lng2: string | number | undefined;
  onMapClick: (
    point: "startingPoint" | "destination",
    lat: string,
    lng: string
  ) => void;
};

export function MyMap({ lat1, lng1, onMapClick }: MapProp) {
  const [pointType, setPointType] = useState<"startingPoint" | "destination">(
    "startingPoint"
  );
  function MapClick() {
    useMapEvents({
      click: (e) => {
        console.log(e.latlng);
        if (pointType == "startingPoint") {
          onMapClick(
            "startingPoint",
            e.latlng.lat.toString(),
            e.latlng.lng.toString()
          );
        } else {
          onMapClick(
            "destination",
            e.latlng.lat.toString(),
            e.latlng.lng.toString()
          );
        }

        // handleMap({lat:e.latlng.lat,lng:e.latlng.lng})
      },
    });
    return null;
  }

  return (
    <div className="h-160 w-auto mt-4 mb-4 relative flex justify-center">
      <MapContainer
        className="h-full w-full z-0"
        center={[39.083131, -94.553563]}
        zoom={10}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClick />
        {lat1 && lng1 && (
          <Marker position={{ lat: Number(lat1), lng: Number(lng1) }} />
        )}
      </MapContainer>
      <div
        className="bg-gray-300 dark:bg-gray-600 px-3 py-1 rounded-full absolute bottom-3 shadow-md"
        onClick={() =>
          setPointType(
            pointType == "startingPoint"
              ? "destination"
              : "startingPoint"
          )
        }
      >
        {pointType == "startingPoint"
          ? "set destination"
          : "set starting point"}
      </div>
    </div>
  );
}
