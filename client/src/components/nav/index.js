import React from "react";
import Auth from "../../utils/auth";
import Cart from "../cart";
import LoginSignup from "../loginModal";

import { Link } from "react-router-dom";
import { 
  Tabs, 
  Button,
  TabList, 
  Tab,
  Container,
  Flex,
  Box,
  Spacer,
  Heading,
  Image
} from "@chakra-ui/react";

function Nav()
{
  function showNavigation()
  {
    if (Auth.loggedIn())
    {
      return (
        <Box>
          <a href="/" onClick={() => Auth.logout()}>
            Logout
          </a>

          <Cart />
        </Box>
      );
    } else
    {
      return (
        <Box>
            <Link to="/login">Login</Link>
            <LoginSignup />
            <Cart />
        </Box>
      );
    }
  }

  return (
    <Container maxW="xxl">
      <Flex aria-labelledby="nav-title">
        <Box>
          <Link to="/">
              <Image src="/images/ArtsyLogo.png" boxSize="25px"/>
              Artsy
          </Link>
        </Box>
        
        <Spacer />

        <Box>
          {showNavigation()}
        </Box>
      </Flex>
    </Container>
  );
}

export default Nav;
