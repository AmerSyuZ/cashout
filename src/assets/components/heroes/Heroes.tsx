/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
18/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

import { Box, Container, Grid, Typography } from "@mui/material";
import BaseContainer from "../container/Container";
import TextField from "../input/TextField";

//Lib


const Heroes = () => {
  return (
    <Box sx={{ backgroundColor: "secondary.light", padding: "5% 15%" }}>
      <Grid container>
        <Grid item xs={6}>
          <Typography
            sx={{
              fontFamily: "Baloo 2",
              fontWeight: "700",
              color: "secondary.main",
              fontSize: "20px"
            }}>
            Find your nearest outlets..
          </Typography>
          <TextField />
        </Grid>
        <Grid item xs={6}>

        </Grid>
      </Grid>
    </Box>
  )
}

export default Heroes;