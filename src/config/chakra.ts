import { extendTheme } from '@chakra-ui/react'


export const colors = {
    brand: "#DBEC03",
    green: "#4AB299",
    pink: "#E55986",
    primary: "#DBEC03",
    whiteSmoke: "#F0F0F0"
}


const theme = extendTheme({
  fonts: {
    heading: `Outfit, sans-serif`,
    body: `Outfit, sans-serif`,
  },
  colors: {
    brand: "#8B919F", 
  },
})

export default theme