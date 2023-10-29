/* eslint-disable react/prop-types */
import React from "react";
import { Navbar, Container, Nav, NavbarBrand } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { Button, Flex } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";

export default function NavBar_Med_Lg_Size({ cartItemsNumber, userToken, handleLogOut }) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Navbar id="hd" className="header">
        <Container>
          <NavbarBrand>
            <Link to="/waterSpaces" id="waterSpaces">
              {" "}
              Home
            </Link>
          </NavbarBrand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/waterSpaces" id="waterSpaces">
                {" "}
                Water Spaces
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/candles" id="candles">
                {" "}
                Candles
              </Link>
            </Nav.Link>
          </Nav>
          <Nav.Link>
            <Link className="h" to="/chart" id="chart">
              {" "}
              <div className="chartIcon">
                <BsFillCartFill size={40} />
                {console.log("cartItemsNumber", cartItemsNumber)}
                <p className="counter">{cartItemsNumber}</p>
              </div>
            </Link>
          </Nav.Link>
        </Container>
      </Navbar>
      {userToken && (
        //make the button fixed and on the right side but not fixed
        <Button
          id="logOutBtn"
          onClick={handleLogOut}
          bg="transparent"
          border="1px"
          borderColor="black"
          color="black"
          //put the button on the right side
          _hover={{ bg: "black", color: "white" }}
        >
          <BiLogOut size={30} />
          Log Out
        </Button>
      )}
    </Flex>
  );
}