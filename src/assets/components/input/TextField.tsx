/*
--------------------------------------- CHANGE LOG ---------------------------------------
Date(DD/MM/YY)        Author      Version         Remarks
------------------------------------------------------------------------------------------
21/03/2024            Amer Syu     1.0.0           - Base Setup 
*/

import {
	FilledInput,
	FormControl,
	IconButton,
	InputAdornment,
	TextField,
	styled,
} from "@mui/material";
import SuperIcon from "../others/SuperIcon";

interface TextFieldProps {
	hideIcon?: any;
	value: string;
	onChange?: React.ChangeEventHandler;
	onPress?: () => any;
}
const TextFieldWrapper: React.FC<TextFieldProps> = ({
	hideIcon,
	value,
	onChange,
	onPress,
}) => {
	console.log("hideiOV", hideIcon);
	return (
		<>
			{/* <TextField /> */}
			<FormControl
				sx={{
					margin: "15px 0px",
					width: "100%",
					"& .MuiFilledInput-root": {
						backgroundColor: "#FFFFFF",
					},
					"& .MuiFilledInput-root.Mui-focused": {
						backgroundColor: "#FFFFFF",
					},
					"& .MuiFilledInput-input": {
						padding: "14px",
					},
				}}
				variant="filled"
			>
				<FilledInput
					type="text"
					placeholder="Search Location"
					inputProps={{ "aria-label": "description" }}
					endAdornment={
						hideIcon ? (
							<InputAdornment position="end">
								<IconButton onClick={onPress}>
									<SuperIcon iconName="CiSearch" />
								</IconButton>
							</InputAdornment>
						) : null
					}
					value={value}
					onChange={onChange}
					sx={{ borderRadius: "10px" }}
					disableUnderline
				/>
			</FormControl>
		</>
	);
};

export default TextFieldWrapper;
