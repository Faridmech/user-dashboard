import AppRouter from "./AppRouter"
import { BrowserRouter } from "react-router-dom"

import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
