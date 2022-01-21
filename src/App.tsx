import { QueryClient, QueryClientProvider } from "react-query"
import { Container } from "@mui/material"
import WeatherHistory from "./WeatherHistory"
import Version from "./Version"
import styled from "@emotion/styled"

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

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <Content>
          <WeatherHistory />
          <Version />
        </Content>
      </Container>
    </QueryClientProvider>
  )
}

export default App
