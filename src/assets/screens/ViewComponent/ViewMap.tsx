import React from "react";
import MainMap from "../../components/map/Map";

const ViewMap = ({ coordinate, mapData }) => {
	return <MainMap userLocation={coordinate} mapData={mapData} />;
};

export default ViewMap;
