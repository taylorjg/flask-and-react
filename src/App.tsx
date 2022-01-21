import { QueryClient, QueryClientProvider } from "react-query"
import WeatherHistory from "./WeatherHistory"
import Version from "./Version"
import "./App.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false
    }
  }
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <WeatherHistory />
        <Version />
      </div>
    </QueryClientProvider>
  )
}

export default App
