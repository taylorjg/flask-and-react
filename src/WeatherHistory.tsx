import { useState } from "react"
import axios from "axios"
import { useQuery } from "react-query"
import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import WeatherHistoryChart, { HourlyData } from "./WeatherHistoryChart"
import styled from "@emotion/styled"

const StyledChartPlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f3f3;
`

const StyledQueryLoadingMessage = styled.div`
  font-size: xx-large;
  font-style: italic;
`

const StyledQueryErrorMessage = styled.div`
  font-size: xx-large;
  font-style: italic;
  color: red;
`

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

  const handleChangeNumDays = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as number
    setNumDays(value)
  }

  const handleChangeWindSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowWindSpeed(event.target.checked)
  }

  const renderChart = (): JSX.Element => {
    if (queryResult.isLoading) {
      return (
        <StyledQueryLoadingMessage>Loading...</StyledQueryLoadingMessage>
      )
    }

    if (queryResult.isError) {
      return (
        <StyledQueryErrorMessage>{queryResult.error.message}</StyledQueryErrorMessage>
      )
    }

    const weatherData = queryResult.data ?? []

    return (
      <WeatherHistoryChart weatherData={weatherData} showWindSpeed={showWindSpeed} />
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
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
      <StyledChartPlaceholder>
        {renderChart()}
      </StyledChartPlaceholder>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: '.5rem' }}>
        <FormControlLabel control={
          <Checkbox
            checked={showWindSpeed}
            onChange={handleChangeWindSpeed}
            disabled={queryResult.isFetching}
            size="small"
          />
        } label="Show wind speed" />
      </Box>
    </Box>
  )
}

export default WeatherHistory
