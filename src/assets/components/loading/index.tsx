import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingProps {
  isLoading : boolean
}

const Loading = ({isLoading}) => {
  console.log("loading state", isLoading)
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: 10 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading;