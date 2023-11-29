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
import { useActionData, useLoaderData } from "react-router-dom";
import CustomToast from "./Toast";
import "../styles/scrollBarCart.css";
export const CheckTokenExperimentData = (token) => {
  if (!token) return true;
  const currentTime = new Date().getTime() / 1000;
  const decodeToken = jwtDecode(token);
  return decodeToken.exp < currentTime ? true : false;
};
// eslint-disable-next-line react-refresh/only-export-components
export const verifyAdmin = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const decodeToken = jwtDecode(token);
  if (decodeToken.role === "admin") return true;
  return false;
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
  const [totalOrderInbox, setTotalOrderInbox] = useState(0);
  const { data } = useLoaderData();
  console.log("windowSize", windowSize);
  const itemsData = useSelector((state) => {
    return state.CartSlicer;
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
    const totalPendingOrders = data.filter((order) => order.orderStatus === "pending").length;
    setTotalOrderInbox(totalPendingOrders);
    //get phone property from data
  }, [data]);

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
            verifyAdmin={verifyAdmin}
            totalOrderInbox={totalOrderInbox}
          />
        )}
        {windowSize === "base" && (
          <NavBar_sm_Size
            cartItemsNumber={cartItemsNumber}
            userToken={userToken}
            handleLogOut={handleLogOut}
            verifyAdmin={verifyAdmin}
            totalOrderInbox={totalOrderInbox}
          />
        )}
        <Spacer />
      </Flex>
      <Box minH={"75vh"} id="cardsList">
        {/* send useBreakpointValue as function to outlet context */}
        <Outlet context={[useBreakpointValue, verifyAdmin]} />
      </Box>
      <Box zIndex={20} position="relative" bottom="0" width="100%">
        <Footer />
      </Box>
    </>
  );
}
