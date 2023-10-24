import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Header.css";
import { BsFillCartFill } from "react-icons/bs";
import Footer from "./Footer";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Spacer } from "@chakra-ui/react";
import { NavbarBrand } from "react-bootstrap";
import { Button, Flex } from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  const [cartItemsNumber, setCartItemNumber] = React.useState([]);
  const dispatch = useDispatch();
  const itemsData = useSelector((state) => {
    return state.ChartSlicer;
  });

  useEffect(() => {
    let count = 0;
    itemsData.chartData.forEach((item) => {
      console.log("item ]]]]]]]]]", item);
      count += item?.quantity;
    });

    setCartItemNumber(count);
  }, [itemsData]);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/waterSpaces");
  };
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" p={4}>
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
                  <p>{cartItemsNumber}</p>
                </div>
              </Link>
            </Nav.Link>
          </Container>
        </Navbar>
        <Spacer />

        {userToken && (
          //make the button fixed and on the right side
          <Button
            id="logOutBtn"
            onClick={handleLogOut}
            bg="transparent"
            border="1px"
            borderColor="black"
            color="black"
            _hover={{ bg: "black", color: "white" }}
          >
            <BiLogOut size={30} />
            Log Out
          </Button>
        )}
      </Flex>
      <Box minH={"75vh"} id="cardsList">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
