import { styled } from "@mui/material";
import TextFieldWrapper from "./TextField";

const TextFieldStyle = styled(TextFieldWrapper)`
	margin: 15px 0px;
	background-color:red
	width: 100%;
	& .muifilledinput-root: {
		backgroundcolor: #ffffff;
	}
	& .muifilledinput-root.mui-focused: {
		backgroundcolor: #ffffff;
	}

	& .muifilledinput-input: {
		padding: 14px;
	}
`;

export { TextFieldStyle };
