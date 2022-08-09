// import "./App.css";
import * as React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

import authLink from "./utils/auth";
import Jumbotron from "./components/Jumbotron";
import Home from "./pages/Home";
import Login from "./pages/login";
import NoMatch from "./pages/noMatch";
import Signup from "./pages/signup";
import Success from "./pages/success";
import Nav from "./components/Nav";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloClient client={client}>
      <ChakraProvider theme={theme}>
        <Jumbotron />
        <Home />
      </ChakraProvider>
    </ApolloClient>
  );
}

export default App;
