import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import {  HStack, Switch, useColorMode } from "@chakra-ui/react"


export const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header>
        <HStack>
        <SunIcon></SunIcon>
        <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
        <MoonIcon></MoonIcon>
        </HStack>
  </header>)
}
