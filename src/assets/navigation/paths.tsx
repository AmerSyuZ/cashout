/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
18/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

import Home from "../screens/Public/Home";
import { pathConstants } from "./pathConstants";

export interface pathProps {
  path: string;
  name?: string;
  element?: JSX.Element;
  nestedRoutes?: pathProps[];
  hideHeader?: boolean;
  hideFooter?: boolean;
  hideHeroes?:boolean;
}

export const publicPaths: pathProps[] = [
  {
    path: pathConstants.NOTFOUND,
    name: "Not Found",
    element: <Home />,
  },
  {
    path: pathConstants.HOME,
    name: "Home",
    element: <Home />,
  },
  {
    path: pathConstants.ABOUT,
    name: "About",
    //element: <NotFound />,
  },
  {
    path: pathConstants.BOOK,
    name: "Book",
    //element: <NotFound />,
  },
]