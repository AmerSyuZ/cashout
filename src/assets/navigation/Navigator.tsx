/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
18/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

//Lib
import {
	Route,
	Outlet,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

//Local Import
import BaseContainer from "../components/container/Container";
import { pathProps, publicPaths } from "./paths";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Heroes from "../components/heroes/Heroes";

const Navigator = () => {
	const getLayout = (props: pathProps, isPublic: boolean) => {
		return (
			<>
				{!props.hideHeader && <Header />}
				{/* {!props.hideHeroes && <Heroes />} */}
				<BaseContainer>
					<Outlet />
				</BaseContainer>
				{!props.hideFooter && <Footer />}
			</>
		);
	};

	const GenerateRoutes = (paths: pathProps[], isPublic: boolean) => {
		return paths.map((routeProps: pathProps, i) => {
			if (routeProps.nestedRoutes) {
				return (
					<Route key={i} path={routeProps.path}>
						{GenerateRoutes(routeProps.nestedRoutes, isPublic)}
					</Route>
				);
			} else {
				return (
					<Route key={i} element={getLayout(routeProps, isPublic)}>
						<Route
							key={i}
							index={routeProps.path === ""}
							path={routeProps.path === "" ? null : routeProps.path}
							element={routeProps.element}
						/>
					</Route>
				);
			}
		});
	};

	return {
		publicRoutes: GenerateRoutes(publicPaths, true),
	};
};

export const router = createBrowserRouter(
	createRoutesFromElements(<Route>{Navigator().publicRoutes}</Route>),
	{ basename: import.meta.env.BASE_URL },
);
