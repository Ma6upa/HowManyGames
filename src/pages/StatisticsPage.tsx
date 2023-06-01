import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material"
import { useAppSelector } from "../hooks/redux";


const StatisticsPage = () => {
  const { user } = useAppSelector(state => state.userReducer);
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />

        <Box sx={{
          marginTop: 8,
          display: 'flex',
          justifyContent: 'flex-start'
        }}>
          <Typography component="h1" variant="h4">
            Settings
          </Typography>
        </Box>
        {user && (
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            statistics
          </Box>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default StatisticsPage
