/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
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
import { on } from "process";
import { useEffect } from "react";

export default function NavBar_sm_Size({ cartItemsNumber, userToken, handleLogOut }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const navigate = useNavigate();
  const [categoryClicked, setCategoryClicked] = useState({ category: "", clicked: false });

  const handleNavigation = (e) => {
    //get the name of the clicked element
    console.log("e.target.id", e.target.id);
    const category = e.target.id;
    navigate(`/${category}`);
    setCategoryClicked((prevState) => {
      if (prevState.category === category) {
        return { category: "", clicked: false };
      } else {
        return { category: category, clicked: true };
      }
    });

    onClose();
  };
  useEffect(() => {
    const pageDocument = document.location.pathname.split("/")[1];
    setCategoryClicked({ category: pageDocument, clicked: true });
    console.log("pageDocument from drawer", pageDocument);
  }, [document.location.pathname]);
  //change the background color of the clicked element

  return (
    <>
      <Flex width="100%" alignItems="center" justifyContent="space-between" p={4}>
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
            <Box
              w="90%"
              className="drawer"
              //make the background color of the clicked element green
              bg={categoryClicked.clicked && categoryClicked.category === "home" ? "green" : "white"}
            >
              Home
            </Box>

            <Box
              w="90%"
              className="drawer"
              name="waterSpaces"
              id="waterSpaces"
              bg={categoryClicked.clicked && categoryClicked.category === "waterSpaces" ? "#647AA3" : "white"}
              onClick={(e) => {
                handleNavigation(e);
              }}
            >
              Water Spaces
            </Box>
            <Box
              w="90%"
              className="drawer"
              id="candles"
              bg={categoryClicked.clicked && categoryClicked.category === "candles" ? "#647AA3" : "white"}
              onClick={(e) => {
                handleNavigation(e);
              }}
            >
              Candles
            </Box>
            {userToken && (
              <Box
                // w="100%"
                className="drawer"
                id="candles"
                bg={categoryClicked.clicked && categoryClicked.category === "logout" ? "#647AA3" : "white"}
                onClick={() => {
                  handleLogOut();
                  onClose();
                }}
              >
                logOut
              </Box>
            )}
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
