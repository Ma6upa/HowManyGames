import { IDeveloper } from "../interfaces/IDeveloper"
import { IGame } from "../interfaces/IGame"
import { IPublisher } from "../interfaces/IPublisher"
import { FC } from "react"
import { IUser } from "../interfaces/ISearch"
import {
  Typography,
} from "@mui/material";
import SearchField from "./searchField"

interface SearchFieldsProps {
  data: { label: string, data: IGame[] } | { label: string, data: IDeveloper[] } | { label: string, data: IPublisher[] } | { label: string, data: IUser[] }
}

const SearchFields: FC<SearchFieldsProps> = ({
  data
}) => {
  return (
    <>
      {data.label === 'games' && (
        <div>
          <Typography variant="h5" style={{ marginLeft: 5 }}>Games</Typography>
          {data.data.map((item, index) => (
            <SearchField data={item} label={data.label} key={item.id} />
          ))}
        </div>
      )}
      {data.label === 'developers' && (
        <div>
          <Typography variant="h5">Developers</Typography>
          {data.data.map((item, index) => (
            <SearchField data={item} label={data.label} key={item.id} />
          ))}
        </div>
      )}
      {data.label === 'publishers' && (
        <div>
          <Typography variant="h5">Publishers</Typography>
          {data.data.map((item, index) => (
            <SearchField data={item} label={data.label} key={item.id} />
          ))}
        </div>
      )}
      {data.label === 'users' && (
        <div>
          <Typography variant="h5">Users</Typography>
          {data.data.map((item, index) => (
            <SearchField data={item} label={data.label} key={item.id} />
          ))}
        </div>
      )}
    </>
  )
}

export default SearchFields