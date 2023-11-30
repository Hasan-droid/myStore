/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Navbar, Container, Nav, NavbarBrand } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsFillCartFill, BsFillInboxFill } from "react-icons/bs";
import { Button, Flex } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import UserMenu from "./UserMenu";

export default function NavBar_Med_Lg_Size({
  cartItemsNumber,
  userToken,
  handleLogOut,
  verifyAdmin,
  totalOrderInbox,
}) {
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
          {!verifyAdmin() ? (
            <>
              <Nav.Link>
                <Link className="h" to="/chart" id="chart">
                  {" "}
                  <div className="chartIcon">
                    <BsFillCartFill size={40} />
                    <p className="counter">{cartItemsNumber}</p>
                  </div>
                </Link>
              </Nav.Link>
            </>
          ) : (
            <Nav.Link>
              <Link className="h" id="inbox" to="/inbox">
                {" "}
                <div className="chartIcon">
                  <BsFillInboxFill size={45} />
                  {totalOrderInbox > 0 && <p className="inbox">{totalOrderInbox}</p>}
                </div>
              </Link>
            </Nav.Link>
          )}
          <Nav.Link>
            <UserMenu handleLogOut={handleLogOut} userToken={userToken} verifyAdmin={verifyAdmin} />
          </Nav.Link>
        </Container>
      </Navbar>
    </Flex>
  );
}
