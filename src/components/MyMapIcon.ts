import L from 'leaflet';
// import { FaFlagCheckered } from "react-icons/fa";
import img from "../assets/flag.png"
import carimg from "../assets/carIcon.png"
import blueFlag from "../assets/blue-flag.png"


const iconDestination = new L.Icon({
    iconUrl: img,
    iconRetinaUrl: img,
    // iconAnchor: null,
    // popupAnchor: null,
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    iconSize: new L.Point(40,40),
    className: 'bg-transparent',
});

const iconCar = new L.Icon({
    iconUrl: carimg,
    iconRetinaUrl: carimg,
    // iconAnchor: null,
    // popupAnchor: null,
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    iconSize: new L.Point(40,40),
    className: 'bg-transparent',
});

const iconBlueFlag = new L.Icon({
    iconUrl: blueFlag,
    iconRetinaUrl: blueFlag,
    // iconAnchor: null,
    // popupAnchor: null,
    // shadowUrl: null,
    // shadowSize: null,
    // shadowAnchor: null,
    iconSize: new L.Point(40,40),
    className: 'bg-transparent',
});

export { iconDestination,iconCar,iconBlueFlag};