/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
21/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

import { FilledInput, FormControl, IconButton, InputAdornment } from "@mui/material"
import SuperIcon from "../others/SuperIcon";


const TextField = (hideIcon?) => {

  return (
    <FormControl
      sx={{
        margin: "15px 0px",
        width: '100%',
        '& .MuiFilledInput-root': {
          backgroundColor: "#FFFFFF"
        },
        '& .MuiFilledInput-root.Mui-focused': {
          backgroundColor: "#FFFFFF"
        },
        '& .MuiFilledInput-input': {
          padding: "14px"
        }
      }}
      variant="filled">
      <FilledInput
        type="text"
        placeholder="Search Location"
        inputProps={{ "aria-label": 'description' }}
        endAdornment={hideIcon ?
          <InputAdornment position="end">
            <IconButton
              onClick={() => { }}
            >
              <SuperIcon iconName="CiSearch" />
            </IconButton>
          </InputAdornment>
          : null}
        sx={{ borderRadius: "10px" }}
        disableUnderline
      />
    </FormControl>
  )
}

export default TextField;