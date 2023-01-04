import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { 
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Checkbox,
  Stack
} from "@chakra-ui/react";

import { ADD_USER } from "../../utils/mutations";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

function LoginSection (props) {
  const [formState, setFormState] = useState({ email:"", password:"" });
  const [login, {error}] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try
    {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <FormControl onSubmit={handleFormSubmit} isRequired>
      <ModalBody>
        <FormLabel>Email</FormLabel>
        <Input 
          name="email"
          type="email"
          id="eml"
          onChange={handleChange}
        />

        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="password"
          id="pwd"
          onChange={handleChange}
        />
      </ModalBody>

      <ModalFooter>
        <Button onClick={handleFormSubmit} type="submit">Login</Button>
      </ModalFooter>
    </FormControl>
  )
}

function SignupSection (props) {
  const [formState, setFormState] = useState({ email:"", password:"" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };


  return (
    <FormControl isRequired>
      <ModalBody>
        <Stack spacing={20} direction="row">
          <FormLabel>First Name</FormLabel>

          <FormLabel>Last Name</FormLabel>
        </Stack>
        <Stack direction="row">
          <Input 
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />

          <Input
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </Stack>
        {/* <FormLabel>First Name</FormLabel>
        <Input 
          name="firstName"
          type="firstName"
          id="firstName"
          onChange={handleChange}
        />

        <FormLabel>Last Name</FormLabel>
        <Input
          name="lastName"
          type="lastName"
          id="lastName"
          onChange={handleChange}
        /> */}

        <FormLabel>Email</FormLabel>
        <Input 
          name="email"
          type="email"
          id="email"
          onChange={handleChange}
        />

        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="password"
          id="password"
          onChange={handleChange}
        />
        <FormHelperText>Password must be more than 5 characters.</FormHelperText>
      </ModalBody>

      <ModalFooter>
        <Button onClick={handleFormSubmit} type="submit">Signup</Button>
      </ModalFooter>
    </FormControl>
  )
}


export default function LoginSignup (props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <a as={Button} className="spec nav-link" onClick={onOpen} onClose={onClose}>Login</a>

      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <p>Welcome back</p> 
            <ModalCloseButton />
            <p>If you aren't signed up, you can do that here.</p>
          </ModalHeader>

          <Tabs variant="soft-rounded" isFitted>
            <TabList>
              <Tab>Login</Tab>
              <Tab>Signup</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <LoginSection />
              </TabPanel>

              <TabPanel>
                <SignupSection />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalContent>
      </Modal>
    </>
  )
}