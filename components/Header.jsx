import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Header.css";
import { BsFillCartFill } from "react-icons/bs";
import Footer from "./Footer";
import { Outlet, Link, useActionData } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchItemsData } from "../redux/features/ChartItemsDataSlicer";
import { Box, position } from "@chakra-ui/react";
import { NavLink, NavbarBrand } from "react-bootstrap";

export default function Header() {
  const dataFromActions = useActionData();
  const [items, setItems] = React.useState([]);
  useEffect(() => {
    if (!localStorage.getItem("state")) {
      setItems([]);
    }
  }, [window.location.pathname]);
  const itemsData = useSelector((state) => {
    console.log("state.ChartSlicer", state.ChartSlicer);
    return state.ChartSlicer;
  });
  useEffect(() => {
    setItems(itemsData.ChartData);
  }, [itemsData]);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        // document.getElementById("hd").classList.add("headerScroll");
      } else {
        document.getElementById("hd").classList.remove("headerScroll");
      }
    });
  }, []);

  // useEffect(() => {
  //   dispatch(fetchItemsData());
  // }, [dispatch]);
  console.log("itemsData", itemsData);
  return (
    <>
      <Navbar id="hd" className="header" data-bs-theme="light">
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
                <p>{items.length}</p>
              </div>
            </Link>
          </Nav.Link>
        </Container>
      </Navbar>
      <Box minH={"75vh"} id="cardsList">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
