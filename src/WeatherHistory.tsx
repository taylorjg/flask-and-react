import { useState } from "react"
import axios from "axios"
import { useQuery } from "react-query"
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import WeatherHistoryChart, { HourlyData } from "./WeatherHistoryChart"

const WeatherHistory = () => {

  const [numDays, setNumDays] = useState(1)

  const queryResult = useQuery<HourlyData[], Error>(
    ['weatherdata', numDays],
    () => axios.get('/api/weatherdata', { params: { numDays } }).then(({ data }) => data),
    {
      onError: error => {
        console.error(error.message)
      }
    })

  if (queryResult.isFetching) {
    return <div>Fetching...</div>
  }

  const weatherData = queryResult.data ?? []

  const handleChangeNumDays = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as number
    console.log('[handleChangeNumDays]', 'value:', value)
    setNumDays(value)
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: '.5rem' }}>
        <FormControl size="small" sx={{ minWidth: '10rem' }}>
          <InputLabel id="num-days-label">Number of days</InputLabel>
          <Select
            labelId="num-days-label"
            id="num-days"
            value={numDays}
            label="Number of days"
            onChange={handleChangeNumDays}
            disabled={queryResult.isFetching}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <WeatherHistoryChart weatherData={weatherData} />
    </Box>
  )
}

export default WeatherHistory
