/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
20/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

//Lib
import { createTheme } from "@mui/material";

//Local Import
import Baloo2 from "./fonts/Baloo2-SemiBold.ttf"

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF'
    },
    secondary: {
      main: '#237ABE',
      light: '#F3FAFF'
    },
    success: {
      main: '#37B249'
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Baloo 2'
    ].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    }
  }
})

export default theme;