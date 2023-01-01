import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { 
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from "@chakra-ui/react";

import { ADD_USER } from "../../utils/mutations";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

export default function LoginSignup (props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [formState, setFormState] = useState({ email:"", password:"" });
  // const [login, {error}] = useMutation(LOGIN);
  // const [addUser] = useMutation(ADD_USER);

  return (
    <>
      <Button onClick={onOpen} onClose={onClose}>Login</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome back!</ModalHeader>
          <p>If you're a new user, you can sign up here.</p>
          <Tabs variant="soft-rounded" isFitted>
            <TabList>
              <Tab>Login</Tab>
              <Tab>Signup</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ModalBody>


                </ModalBody>

                <ModalFooter>
                  <Button>Login</Button>
                </ModalFooter>
              </TabPanel>

              <TabPanel>
                <ModalBody>


                </ModalBody>

                <ModalFooter>
                  <Button>Signup</Button>
                </ModalFooter>
                </TabPanel>
            </TabPanels>
            </Tabs>
        </ModalContent>
      </Modal>
    </>
  )
}