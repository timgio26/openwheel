import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { iconCar, iconBlueFlag } from "./MyMapIcon";
import { distance } from "../utils/helperFn";

type MapProp = {
  latd1: string | number | undefined;
  lngd1: string | number | undefined;
  latd2: string | number | undefined;
  lngd2: string | number | undefined;
  latp1: string | number | undefined;
  lngp1: string | number | undefined;
  latp2: string | number | undefined;
  lngp2: string | number | undefined;
};

function maxVal(a: string | number | undefined,b: string | number | undefined){
  if(!a || !b) return 0
  if(a>b)return Number(a)
  return Number(b)
}

export function MyMapDriverPassenger({
  latd1,
  lngd1,
  latd2,
  lngd2,
  latp1,
  lngp1,
  latp2,
  lngp2,
}: MapProp) {

  const dist = distance(maxVal(latd1,latp1),maxVal(lngd1,lngp1),maxVal(latd2,latp2),maxVal(lngd2,lngp2))

  return (
    <div className="h-70 w-auto mt-4 mb-4 relative flex justify-center pointer-events-none">
      <MapContainer
        className="h-full w-full z-0"
        center={[
          (Number(latp1) + Number(latp2)) / 2,
          (Number(lngp1) + Number(lngp2)) / 2,
        ]}
        zoom={(dist*-0.6 )+ 15.2}
        zoomControl={false}
        preferCanvas={true}
        dragging={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {latd1 && lngd1 && (
          <Marker
            position={{ lat: Number(latd1), lng: Number(lngd1) }}
            title="Starting Point"
            icon={iconCar}
          />
        )}

        {latp1 && lngp1 && (
          <>
            <Marker
              position={{ lat: Number(latp1), lng: Number(lngp1) }}
              title="Starting Point"
            />
          </>
        )}

        {latp2 && lngp2 && (
          <Marker
            position={{ lat: Number(latp2), lng: Number(lngp2) }}
            title="Destination"
            icon={iconBlueFlag}
          />
        )}

        {latd1 && lngd1 && latd2 && lngd2 && (
          <Polyline
            positions={[
              [Number(latd1), Number(lngd1)],
              [Number(latd2), Number(lngd2)],
            ]}
            color="black"
            weight={2}
            opacity={0.5}
          />
        )}
        
      </MapContainer>
    </div>
  );
}
