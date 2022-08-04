// import "./App.css";
import * as React from "react";
import Header from "./components/Header";

import { extendTheme, ChakraProvider } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <h1>Profile</h1>
      <div>
        <p>img</p>
        <p>img</p>
        <p>img</p>
        <p>img</p>
        <p>img</p>
        <p>img</p>
        <p>img</p>
        <p>img</p>
      </div>
    </ChakraProvider>
  );
}

export default App;