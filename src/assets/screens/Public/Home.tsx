/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
18/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

import { Button, Grid } from "@mui/material"
import MainMap from "../../components/map/Map";
import { Query } from "../../utilities/GraphQL";
import getMerchantDetail from "../../api/query/getMerchantDetail";
import { Obj } from "../../utilities/common";
import { useEffect, useState } from "react";
import TextField from "../../components/input/TextField";

const Home = () => {
  const [mapData, setMapData] = useState(undefined);
  const [coordinate, setCoordinate] = useState(undefined);

  const createLatLngLiteral = (latitude: number, longitude: number): google.maps.LatLngLiteral => {
    // Ensure the latitude and longitude are finite numbers
    if (!isFinite(latitude) || !isFinite(longitude)) {
      throw new Error("Latitude and Longitude must be finite numbers");
    }

    return {
      lat: latitude,
      lng: longitude,
    };
  };

  useEffect(() => {
    // to get user current coordinate.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setCoordinate(createLatLngLiteral(pos.coords.latitude, pos.coords.longitude));
      });
    }
  }, [navigator.geolocation]);

  const getRes = (res: Obj, err: string) => {
    if (res && !err) {
      setMapData(res)
    } else {
      console.log(err)
    }
  }

  return (
    <>
      {console.log("home coor", coordinate)}
      {console.log("mapData", mapData)}
      <Query
        query={getMerchantDetail}
        variables={{
          amount: 200
        }}
        onComplete={getRes}
      />
      <Grid container rowSpacing={2} margin={2} sx={{ height: "100vh" }}>
        <Grid item xs={4}>
          
        </Grid>
        <Grid item xs={8}>
          {mapData && coordinate &&
            <MainMap
              userLocation={coordinate}
              mapData={mapData} />
          }
        </Grid>
      </Grid>
    </>
  )
}

export default Home;