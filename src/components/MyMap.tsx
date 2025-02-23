import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker,Polyline} from "react-leaflet";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { iconDestination } from "./MyMapIcon";

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

export function MyMap({ lat1, lng1, lat2, lng2, onMapClick }: MapProp) {
  const [pointType, setPointType] = useState<"startingPoint" | "destination">(
    "startingPoint"
  );
  function MapClick() {
    useMapEvents({
      click: (e) => {
        // console.log(e.latlng);
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
      <div className="absolute top-3 z-10 font-bold bg-white text-black px-3 py-1 rounded-full">
        Click to set{" "}
        {pointType == "startingPoint" ? "starting point" : "destination"}
      </div>
      <MapContainer
        className="h-full w-full z-0"
        center={[39.083131, -94.553563]}
        zoom={10}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        <MapClick />
        {lat1 && lng1 && (
          <Marker
            position={{ lat: Number(lat1), lng: Number(lng1) }}
            title="Starting Point"
          />
        )}
        {lat2 && lng2 && (
          <Marker
            position={{ lat: Number(lat2), lng: Number(lng2) }}
            title="Destination"
            icon={iconDestination}
          />
        )}
        {
          (lat1 && lng1 && lat2 && lng2) &&
          <Polyline positions={[
            [Number(lat1),Number(lng1)],
            [Number(lat2),Number(lng2)],
          ]}/>

        }
      </MapContainer>
      <div
        className="bg-gray-300 dark:bg-gray-600 px-10 py-1 rounded-full absolute bottom-3 shadow-md border-1 flex flex-row items-center "
        onClick={() =>
          setPointType(
            pointType == "startingPoint" ? "destination" : "startingPoint"
          )
        }
      >
        {pointType == "startingPoint" ? (
          <>
            <span>NEXT</span>
            <IoIosArrowForward />
          </>
        ) : (
          <>
            <IoIosArrowBack />
            <span>BACK</span>
          </>
        )}
      </div>
    </div>
  );
}
