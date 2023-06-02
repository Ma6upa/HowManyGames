import { IDeveloper } from "../interfaces/IDeveloper"
import { IGame } from "../interfaces/IGame"
import { IPublisher } from "../interfaces/IPublisher"
import { FC } from "react"
import { IUser } from "../interfaces/ISearch"
import {
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom"

interface SearchFieldProps {
  data: IGame | IDeveloper | IPublisher | IUser
}

const SearchField: FC<SearchFieldProps> = ({
  data
}) => {

  return (
    <Link to={'releaseDate' in data ? '/game/' + data.id : ''} style={{ textDecoration: 'none', color: 'black' }}>
      <Box sx={{
        width: '100%',
        height: 50,
        marginLeft: 1,
        display: 'flex',
        flexDirection: 'row'
      }}>

        <Box>
          <img src={import.meta.env.VITE_API + `/${data.picturePath}`} style={{
            width: 35,
            height: 35,
          }} alt="No picture" />
        </Box>
        <Box sx={{
          marginLeft: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography variant="h6">
            {'name' in data ? data.name : data.nickname}
          </Typography>
        </Box>
      </Box>
    </Link>
  )
}

export default SearchField