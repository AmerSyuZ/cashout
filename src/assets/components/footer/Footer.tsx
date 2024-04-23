/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
21/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

//Lib
import { AppBar, Box, Typography } from "@mui/material"

//Local Import
import BaseContainer from "../container/Container";


const Footer = () => {

  return (
    <AppBar
      position="sticky"
      color="primary"
      sx={{
        top: '100%',
        bottom: 0,
        boxShadow: "none",
        borderTop: "1px solid #EEEEEE",
      }}>
      <BaseContainer>
        <Box sx={{
          flexGrow: 0,
          margin: "15px",
          display: "flex",
          justifyContent: "center"
        }}>
          <Typography sx={{ fontWeight: 300, fontSize: "12px", textAlign:"center" }}>
            © 2023-2025 Payments Network Malaysia Sdn Bhd (PayNet) 200801035403 (836743-D). All Rights Reserved | Legal
          </Typography>
        </Box>
      </BaseContainer>
    </AppBar>
  )
}

export default Footer;