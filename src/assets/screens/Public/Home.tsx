/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
18/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

import { Button, Grid } from "@mui/material";
import MainMap from "../../components/map/Map";
import { Query } from "../../utilities/GraphQL";
import getMerchantDetail from "../../api/query/getMerchantDetail";
import { Obj } from "../../utilities/common";
import { useEffect, useState } from "react";
import TextField from "../../components/input/TextField";
import getMerchantQuery from "../../api/query/getMerchantQuery";
import Heroes from "../../components/heroes/Heroes";
import ViewMap from "../ViewComponent/ViewMap";
import { RequestType, geocode, setKey } from "react-geocode";

const Home = () => {
	const [mapData, setMapData] = useState(undefined);
	const [coordinate, setCoordinate] = useState(undefined);
	const [userLocation, setUserLocation] = useState(undefined);
	const [value, setValue] = useState("");
	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const createLatLngLiteral = (
		latitude: number,
		longitude: number,
	): google.maps.LatLngLiteral => {
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
			navigator.geolocation.getCurrentPosition((pos) => {
				setCoordinate(
					createLatLngLiteral(pos.coords.latitude, pos.coords.longitude),
				);
			});
		}
	}, [navigator.geolocation]);

	const getRes = (res: Obj, err: string) => {
		if (res && !err) {
			setMapData(res);
		} else {
			console.log(err);
		}
	};

	setKey(import.meta.env.VITE_MAP_API_KEY);
	const address = async (value) => {
		await geocode(RequestType.ADDRESS, value)
			.then((response) => {
				setCoordinate(response.results[0].geometry.location);
				console.log("geocode response", response);
			})
			.catch((error) => {
				console.log("geocode error", error);
			});
	};

	return (
		<>
			{/* {address()} */}
			{console.log("home coor", coordinate)}
			{/* {console.log("mapData", mapData)} */}
			{/* <Query
        query={getMerchantDetail}
        variables={{
          amount: 200
        }}
        onComplete={getRes}
      /> */}
			<Query query={getMerchantQuery} onComplete={getRes} />
			<Heroes
				value={value}
				onChange={handleChange}
				onPress={() => address(value)}
			/>
			<Grid container rowSpacing={2} margin={2} sx={{ height: "100vh" }}>
				<Grid item xs={4}></Grid>
				<Grid item xs={8}>
					{mapData && coordinate && (
						<ViewMap coordinate={coordinate} mapData={mapData} />
						// <MainMap userLocation={coordinate} mapData={mapData} />
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default Home;
