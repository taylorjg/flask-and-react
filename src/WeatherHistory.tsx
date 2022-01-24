import { useState } from "react"
import axios from "axios"
import { useQuery } from "react-query"
import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import WeatherHistoryChart, { HourlyData } from "./WeatherHistoryChart"

const WeatherHistory = () => {

  const [numDays, setNumDays] = useState(1)
  const [showWindSpeed, setShowWindSpeed] = useState(true)

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
    setNumDays(value)
  }

  const handleChangeWindSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowWindSpeed(event.target.checked)
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
      <div style={{ width: '800px', height: '500px', backgroundColor: 'paleturquoise' }}>
        <WeatherHistoryChart weatherData={weatherData} showWindSpeed={showWindSpeed} />
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: '.5rem' }}>
        <FormControlLabel control={
          <Checkbox checked={showWindSpeed} onChange={handleChangeWindSpeed} size="small" />
        } label="Show wind speed" />
      </Box>
    </Box>
  )
}

export default WeatherHistory
