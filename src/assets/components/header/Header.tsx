/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
18/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

//Lib
import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material"
import BaseContainer from "../container/Container";

const Header = () => {

  return (
    <AppBar position="sticky" color="primary" sx={{ boxShadow: "none" }}>
      <BaseContainer>
        <Toolbar disableGutters>
          <Grid container>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "left", alignItems:"center" }}>
              <Box sx={{ flexGrow: 0, margin: "15px" }}>
                <Typography>
                  Logo
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "right", alignItems:"center" }}>
              <Box sx={{ flexGrow: 0, margin: "15px" }}>
                <Typography sx={{ fontFamily: "Poppins", fontSize: "14px" }}>
                  Locate
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 0, margin: "15px" }}>
                <Typography sx={{ fontFamily: "Poppins", fontSize: "14px" }}>
                  Help
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </BaseContainer>
    </AppBar>
  )
}

export default Header;