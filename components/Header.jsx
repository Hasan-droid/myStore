import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Header.css";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Spacer } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/react";
import NavBar_Med_Lg_Size from "./NavBar_Med_Lg_Size";
import NavBar_sm_Size from "./NavBar_sm_Size";
import jwtDecode from "jwt-decode";
import { useActionData } from "react-router-dom";
import CustomToast from "./Toast";

export const CheckTokenExperimentData = (token) => {
  const currentTime = new Date().getTime() / 1000;
  const decodeToken = jwtDecode(token);
  return decodeToken.exp < currentTime ? true : false;
};

export default function Header() {
  const dataFromActions = useActionData();
  console.log("[[[[[[datafromAction]]]]", dataFromActions);
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  const [cartItemsNumber, setCartItemNumber] = React.useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastReceivedStatus, setToastReceivedStatus] = useState("");
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

  useEffect(() => {
    if (!dataFromActions) return;
    if (dataFromActions?.data?.state === 200) {
      setShowToast(true);
      setToastReceivedStatus("success");
      setTimeout(() => {
        setShowToast(false);
      }, 100);
    } else if (dataFromActions?.data?.state === 400) {
      setShowToast(true);
      setToastReceivedStatus("error");
      setTimeout(() => {
        setShowToast(false);
      }, 100);
    }
  }, [dataFromActions]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/waterSpaces");
  };

  return (
    <>
      {showToast && (
        <CustomToast
          receivedPosition="top"
          receivedStatus={toastReceivedStatus}
          receivedTitle={dataFromActions?.data.message}
        />
      )}
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
