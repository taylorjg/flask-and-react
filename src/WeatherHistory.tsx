import axios from "axios"
import { useQuery } from "react-query"
import WeatherHistoryChart, { HourlyData } from "./WeatherHistoryChart"

const WeatherHistory = () => {

  const queryResult = useQuery<HourlyData[], Error>(
    'weatherdata',
    () => axios.get('/weatherdata').then(({ data }) => data),
    {
      onSuccess: data => {
        console.dir(data)
      },
      onError: error => {
        console.error(error.message)
      }
    })

  if (queryResult.isFetching) {
    return <div>Fetching...</div>
  }

  const weatherData = queryResult.data ?? []

  return (
    <WeatherHistoryChart weatherData={weatherData} />
  )
}

export default WeatherHistory
