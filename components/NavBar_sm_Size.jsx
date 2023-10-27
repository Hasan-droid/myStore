import { useRef } from "react";
import { Navbar, Container, Nav, NavbarBrand } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import "../styles/PhoneDrawer.css";
import "../styles/Header.css";

export default function NavBar_sm_Size({ cartItemsNumber }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const navigate = useNavigate();

  const handleNavigation = (e) => {
    //get the name of the clicked element
    console.log("e.target.id", e.target.id);
    navigate(`/${e.target.id}`);
    //change the background color of the clicked element
  };

  return (
    <>
      <Flex width="100%" alignItems="center" justifyContent="space-between">
        <Box>
          <Button
            ref={btnRef}
            bg="#c6ebbe"
            onClick={onOpen}
            className="hamburger"
            zIndex="15"
            //use the hamburger icon from chakra-ui
          >
            <HamburgerIcon />
          </Button>
        </Box>
        <Box>Home</Box>
        <Box
        //
        >
          <Nav.Link>
            <Link className="h" to="/chart" id="chart">
              {" "}
              <div className="chartIcon">
                <BsFillCartFill size={40} color="#c6ebbe" />
                {console.log("cartItemsNumber", cartItemsNumber)}
                <p className="counter">{cartItemsNumber}</p>
              </div>
            </Link>
          </Nav.Link>
        </Box>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
            <Box w="100%" className="drawer">
              Home
            </Box>

            <Nav className="me-auto">
              <Box
                w="100%"
                border="1px solid red"
                className="drawer"
                name="waterSpaces"
                id="waterSpaces"
                onClick={(e) => {
                  handleNavigation(e);
                }}
              >
                Water Spaces
              </Box>
              <Box
                w="100%"
                border="1px solid red"
                className="drawer"
                id="candles"
                onClick={(e) => handleNavigation(e)}
              >
                Candles
              </Box>
            </Nav>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
