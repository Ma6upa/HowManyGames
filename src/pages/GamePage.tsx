import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { gamesAPI } from "../store/api/gamesApi";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material"

const GamePage = () => {
  const theme = createTheme();
  const { id } = useParams();
  const { data: game, isLoading } = gamesAPI.useGetGameQuery(Number(id))

  useEffect(() => {
    console.log(game)
  }, [game])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {isLoading && (
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Typography component="h1" variant="h4">
              Идет загрузка...
            </Typography>
          </Box>
        )}
        {!isLoading && (
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <Typography component="h1" variant="h4">
              {game?.name}
            </Typography>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  )
}

export default GamePage;
