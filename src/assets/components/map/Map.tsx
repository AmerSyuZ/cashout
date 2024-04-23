/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
18/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";

// Define the interface for the original data structure
interface OldDataStructure {
  _id: string;
  Merchant: string;
  State: string;
  State_Abbreviation: string;
  Lat: string; // String, as some data might be string-formatted
  Lang: string;
}

// Define the interface for the new data structure
interface NewDataStructure {
  key: string;
  name: string;
  lat: number; // Numeric type for latitude
  lng: number; // Numeric type for longitude
}

type Marked = google.maps.LatLngLiteral & { key: string };
type Props = { marked: Marked[] }

const transformData = (data: OldDataStructure[]): NewDataStructure[] => {
  return data.map(item => ({
    key: item._id,
    name: item.Merchant, // Change "Merchant" to "name"
    lat: parseFloat(item.Lat), // Convert to float
    lng: parseFloat(item.Lang) // Convert to float
  }));
};
const Markers = ({ marked }: Props) => {
  console.log(marked)
  return (
    <>
      {marked.map((marker) => {
        if (marker.lat && marker.lng) {
          const latlng: google.maps.LatLngLiteral = { lat: marker.lat, lng: marker.lng }
          return (
            <AdvancedMarker position={latlng} key={marker.key}>
              <span>@</span>
            </AdvancedMarker>
          )
        }
      })}
    </>
  )
}

const MainMap = (userLocation, mapData) => {
  const newData: NewDataStructure[] = transformData(userLocation.mapData);
  const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);

  console.log("userlocation", mapData)
  console.log("userlocation", userLocation)
  return mapData && (
    <APIProvider apiKey={import.meta.env.VITE_MAP_API_KEY}>
      <div style={{ height: "80%" }}>
        <Map
          defaultZoom={9}
          defaultCenter={userLocation.userLocation}
          mapId={import.meta.env.VITE_MAP_ID}>
          <Markers marked={newData} />
        </Map>
      </div>
    </APIProvider>
  )

}


// const { isLoaded } = useLoadScript({
//   googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
// })
// const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

// return (
//   <Box maxHeight={2}>
//     {!isLoaded ? (
//       <h3>Loading ...</h3>
//     ) : (
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={10}
//       />
//     )}
//   </Box>
// )


export default MainMap;