import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { gamesAPI } from "../store/api/gamesApi";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
  Modal,
  Divider
} from "@mui/material"

const GamePage = () => {
  const theme = createTheme();
  const { id } = useParams();
  const { data: game, isLoading } = gamesAPI.useGetGameQuery(Number(id))
  const [openModal, setOpenModal] = useState(false)

  const handleClose = () => {
    setOpenModal(false)
  }

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
            <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{
                width: '20%',
                left: 0,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <img src={import.meta.env.VITE_API + `/${game?.picturePath}`} style={{
                  width: '100%',
                }} alt="No picture" />
              </Box>
              <Box sx={{
                width: '70%',
                right: 0
              }}>
                <Button
                  onClick={() => setOpenModal(true)}
                >
                  Add to list +
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="sm">
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            marginTop: '10%',
            borderRadius: 5,
            height: 300
          }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">
                Please log in
              </Typography>
              <Divider />
              <Box
                sx={{
                  width: '90%',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginTop: 10
                }}
              >
                <Typography variant="h4">
                  You have to be logged in to use this option
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Modal>
    </ThemeProvider>
  )
}

export default GamePage;
