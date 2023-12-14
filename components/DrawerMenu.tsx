import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { verifyAdmin } from "./Header";
import { loginFromPhone } from "../redux/features/LoginInSlicer";
import { useDispatch } from "react-redux";

interface Types {
  props: {
    userToken: string;
    handleLogOut: () => void;
  };
}

const DrawerMenu: React.FC<Types["props"]> = ({ userToken, handleLogOut }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [categoryClicked, setCategoryClicked] = useState({ category: "", clicked: false });

  useEffect(() => {
    const pageDocument = document.location.pathname.split("/")[1];
    setCategoryClicked({ category: pageDocument, clicked: true });
    console.log("pageDocument from drawer", pageDocument);
  }, [document.location.pathname]);

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
  return (
    <>
      <Button
        bg="#c6ebbe"
        onClick={onOpen}
        className="hamburger"
        //use the hamburger icon from chakra-ui
      >
        <HamburgerIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
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

            <Button
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
            </Button>
            <Button
              w="90%"
              className="drawer"
              id="candles"
              bg={categoryClicked.clicked && categoryClicked.category === "candles" ? "#647AA3" : "white"}
              onClick={(e) => {
                handleNavigation(e);
              }}
            >
              Candles
            </Button>
            {verifyAdmin() && (
              <Button
                w="90%"
                className="drawer"
                id="candles"
                bg={categoryClicked.clicked && categoryClicked.category === "logout" ? "#647AA3" : "white"}
                onClick={() => {
                  navigate("/inboxPhone");
                  onClose();
                }}
              >
                Inbox
              </Button>
            )}
            {!verifyAdmin() && (
              <Button
                w="90%"
                className="drawer"
                id="candles"
                bg={categoryClicked.clicked && categoryClicked.category === "logout" ? "#647AA3" : "white"}
                onClick={() => {
                  navigate("/ordersPhone");
                  onClose();
                }}
              >
                Orders
              </Button>
            )}
            {userToken && (
              <Button
                w="90%"
                className="drawer"
                id="candles"
                bg={categoryClicked.clicked && categoryClicked.category === "logout" ? "#647AA3" : "white"}
                onClick={() => {
                  handleLogOut();
                  onClose();
                }}
              >
                logOut
              </Button>
            )}
            {!userToken && (
              <Button
                w="90%"
                className="drawer"
                id="candles"
                bg={categoryClicked.clicked && categoryClicked.category === "signin" ? "#647AA3" : "white"}
                onClick={() => {
                  navigate("/signin");
                  onClose();
                  dispatch(loginFromPhone());
                }}
              >
                SignIn
              </Button>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
