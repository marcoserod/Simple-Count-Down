import {  ChakraProvider, ColorModeScript, localStorageManager } from "@chakra-ui/react"
import { CountDown } from "./components/CountDown"
import './App.css'
import { Navbar } from "./components/Navbar"
import theme from "./theme"


function App() {

  return (

    <ChakraProvider colorModeManager={localStorageManager}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Navbar></Navbar>
      <CountDown></CountDown>
    </ChakraProvider>
  )
}

export default App
