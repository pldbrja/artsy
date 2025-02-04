import "./App.css";
import * as React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { 
  ChakraProvider, 
  Box,
  Container,
} from "@chakra-ui/react";

import Home from "./pages/Home";
import Details from "./pages/Details";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import Nav from "./components/nav";

import { ArtProvider } from "./utils/GlobalState";

// const colors = {
//   brand: {
//     900: "#1a365d",
//     800: "#153e75",
//     700: "#2a69ac",
//   },
// };

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) =>
{
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App()
{
  return (
    <ApolloProvider client={client}>
      <ArtProvider>
        <ChakraProvider>
          <Box>
            <Router>
              <Nav />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/nomatch" element={<NoMatch />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/success" element={<Success />} />
                <Route path="/products/:id" element={<Details />} />
              </Routes>
            </Router>
          </Box>
        </ChakraProvider>
      </ArtProvider>
    </ApolloProvider>
  );
}

export default App;
