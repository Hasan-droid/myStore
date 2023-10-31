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
import { useBreakpointValue } from "@chakra-ui/react";
import NavBar_Med_Lg_Size from "./NavBar_Med_Lg_Size";
import NavBar_sm_Size from "./NavBar_sm_Size";

export const CheckTokenExperimentData = (token) => {
  const currentTime = new Date().getTime() / 1000;
  token.exp < currentTime ? true : false;
};

export default function Header() {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  const [cartItemsNumber, setCartItemNumber] = React.useState([]);
  const windowSize = useBreakpointValue({ base: "base", md: "md", lg: "lg" });
  console.log("windowSize", windowSize);
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
        {(windowSize === "lg" || windowSize === "md") && (
          <NavBar_Med_Lg_Size
            cartItemsNumber={cartItemsNumber}
            userToken={userToken}
            handleLogOut={handleLogOut}
          />
        )}
        {windowSize === "base" && (
          <NavBar_sm_Size cartItemsNumber={cartItemsNumber} userToken={userToken} handleLogOut={handleLogOut} />
        )}
        <Spacer />
      </Flex>
      <Box minH={"75vh"} id="cardsList">
        {/* send useBreakpointValue as function to outlet context */}
        <Outlet context={[useBreakpointValue]} />
      </Box>
      <Footer />
    </>
  );
}
