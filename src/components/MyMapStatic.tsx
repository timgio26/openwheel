// import { useState } from "react";
import { MapContainer, TileLayer, Marker,Polyline} from "react-leaflet";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { iconDestination } from "./MyMapIcon";

// import { Coordinate} from "@/utils/types";

type MapProp = {
  lat1: string | number | undefined;
  lng1: string | number | undefined;
  lat2: string | number | undefined;
  lng2: string | number | undefined;
};

export function MyMapStatic({ lat1, lng1, lat2, lng2 }: MapProp) {
  return (
    <div className="h-70 w-auto mt-4 mb-4 relative flex justify-center">

      <MapContainer
        className="h-full w-full z-0"
        center={[(Number(lat1)+Number(lat2))/2, (Number(lng1)+Number(lng2))/2]}
        zoom={10}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* <MapClick /> */}
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

    </div>
  );
}
