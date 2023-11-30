/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { Navbar, Container, Nav, NavbarBrand } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCartFill, BsFillInboxFill } from "react-icons/bs";
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
import { useEffect } from "react";
import DrawerMenu from "./DrawerMenu";

export default function NavBar_sm_Size({
  cartItemsNumber,
  userToken,
  handleLogOut,
  verifyAdmin,
  totalOrderInbox,
}) {
  //handle the navigation to the clicked element from the drawer
  //this functionality runs from here not from the action router

  //change the background color of the clicked element

  return (
    <>
      <Flex
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        p={8}
        position="fixed"
        mt={7}
        zIndex={4}
        ml={-5}
        //let the background red when Y scroll is bigger than 0
        bg={"white"}
        borderBottom="1px solid #c6ebbe"
        h={2}
      >
        <Box>
          <DrawerMenu userToken={userToken} handleLogOut={handleLogOut} />
        </Box>
        <Box>Home</Box>
        <Box
        //
        >
          {!verifyAdmin() ? (
            <Nav.Link>
              <Link className="h" to="/cart" id="cart">
                {" "}
                <div className="cartIcon">
                  <BsFillCartFill size={40} color={"#c6ebbe"} />

                  <p className="counter">{cartItemsNumber}</p>
                </div>
              </Link>
            </Nav.Link>
          ) : (
            <Nav.Link>
              <Link className="h" to="/orders" id="inbox">
                {" "}
                <div className="cartIcon">
                  <BsFillInboxFill size={40} />
                  <p className="inbox">{totalOrderInbox}</p>
                </div>
              </Link>
            </Nav.Link>
          )}
        </Box>
      </Flex>
    </>
  );
}
