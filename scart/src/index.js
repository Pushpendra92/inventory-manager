
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import ReactDOM from "react-dom"
import App from "./App"
import theme from "./theme"
import { BrowserRouter as Router, Route } from "react-router-dom";
ReactDOM.render(
  <>
  <Router>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Router>
  </>,
  document.getElementById("root"),
)


