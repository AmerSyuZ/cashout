/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
18/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

import { Box } from "@mui/material";
import { styles } from "../../utilities/genConfigs";

interface ContainerProps {
    children?: JSX.Element | JSX.Element[];
    styles?: styles
}

const BaseContainer = ({ children }: ContainerProps) => {
    return (
        <Box sx={{ padding: "0% 10%" }}>
            {children}
        </Box>
    )
}

export default BaseContainer