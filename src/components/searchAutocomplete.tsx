import {
  TextField,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import { searchAPI } from '../store/api/searchApi';
import { FC, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import debounce from "lodash.debounce"
import { ISearch } from '../interfaces/ISearch';
import SearchFields from './searchFields';

const SearchAutocomplete: FC = () => {
  const [query, setQuery] = useState('')
  const [autoComplete, setAutoComplete] = useState<ISearch>()
  const [fetchAutocomplete, { isLoading }] = searchAPI.useFetchAutocompleteMutation()
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<any[]>([
    { label: 'games', data: autoComplete?.games } || { label: '' },
    { label: 'developers', data: autoComplete?.developers } || { label: '' },
    { label: 'publishers', data: autoComplete?.publishers } || { label: '' },
    { label: 'users', data: autoComplete?.users } || { label: '' }
  ])

  const handleChange = debounce((input: string) => {
    setQuery(input)
  }, 500)

  const getAutocompleteData = async () => {
    const data = await fetchAutocomplete(query)
    setAutoComplete(data.data)
  }

  useEffect(() => {
    if (query !== '') getAutocompleteData()
  }, [query])

  useEffect(() => {
    setAutoCompleteOptions(
      [
        { label: autoComplete?.games.length ? 'games' : '1', data: autoComplete?.games },
        { label: autoComplete?.developers.length ? 'developers' : '2', data: autoComplete?.developers },
        { label: autoComplete?.publishers.length ? 'publishers' : '3', data: autoComplete?.publishers },
        { label: autoComplete?.users.length ? 'users' : '4', data: autoComplete?.users }
      ]
    )
  }, [autoComplete])

  return (
    <Autocomplete
      id="country-select-demo"
      sx={{
        backgroundColor: 'white',
        width: '80%'
      }}
      options={autoCompleteOptions}
      autoHighlight
      filterOptions={x => x}
      renderOption={(props, option) => (
        <SearchFields data={option} key={option.label} />
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          variant="standard"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start" style={{ paddingLeft: 5 }}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(event) => handleChange(event.target.value)}
        />
      )}
    />
  );
}

export default SearchAutocomplete;
