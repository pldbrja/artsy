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
  Image,
  HStack
} from "@chakra-ui/react";

// Create hamburger menu for mobile use that includes all links from the nav

function Nav()
{
  function showNavigation()
  {
    if (Auth.loggedIn())
    {
      return (
        <HStack>
          <a className="nav-link" href="/" onClick={() => Auth.logout()}>
            Logout
          </a>

          <Cart />
        </HStack>
      );
    } else
    {
      return (
        <HStack>
            <LoginSignup />

            <Cart />
        </HStack>
      );
    }
  }

  return (
    <Container maxW="xxl" py={3} background="gray.200">
      <Flex aria-labelledby="nav-title">
        <Box>
          <Link to="/">
            <Image src="/images/ArtsyLogo.png" boxSize="25px" />
          </Link>
        </Box>
        
        <Spacer />

        {showNavigation()}
      </Flex>
    </Container>
  );
}

export default Nav;
