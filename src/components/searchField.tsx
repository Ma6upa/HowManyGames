import { IDeveloper } from "../interfaces/IDeveloper"
import { IGame } from "../interfaces/IGame"
import { IPublisher } from "../interfaces/IPublisher"
import { FC, useEffect, useState } from "react"
import { IUser } from "../interfaces/ISearch"
import {
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom"

interface SearchFieldProps {
  data: IGame | IDeveloper | IPublisher | IUser,
  label: string
}

const SearchField: FC<SearchFieldProps> = ({
  data,
  label
}) => {
  const [link, setLink] = useState('/')

  useEffect(() => {
    switch(label) {
      case 'games': 
        setLink(`/game/${data.id}`);
        break;
      case 'developers': 
        setLink(`/developer/${data.id}`)
        break;
      case 'publishers': 
        setLink(`/publisher/${data.id}`)
        break;
      case 'users': 
        setLink(`/user/${data.id}`)
        break;
      default: setLink('/')
    }
  }, [data])

  return (
    <Link 
      style={{ textDecoration: 'none', color: 'black' }} 
      to={link}   
    >
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