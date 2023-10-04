import React, { useEffect } from "react";
import { List, ListItem, ListIcon, Divider, Button, Box, Flex, Spacer } from "@chakra-ui/react";
import jwtDecode from "jwt-decode";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Card from "./Cards";
import { redirect, Form, useNavigate } from "react-router-dom";
import { emptyChart } from "../Redux/features/ChartSlicer";
import { useDispatch } from "react-redux";
// import { Container } from "react-bootstrap";
export default function Chart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //get data from local storage
  const data = JSON.parse(localStorage.getItem("state"));

  useEffect(() => {
    window.scrollTo(0, -200);
  }, []);

  const CardsMaps = data.ChartData.map((item, index) => {
    return (
      <>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          {item.title}
        </ListItem>
        <Divider />
      </>
    );
  });

  const handleCheckOut = () => {
    const userToken = localStorage.getItem("token");
    if (!userToken) return navigate("/signin");
    const decodedToken = jwtDecode(userToken);
    if (!decodedToken.role) return navigate("/signin");
    const role = decodedToken.role;
    if (role !== "user") return navigate("/signin");
    //run emptyLocalStorage action
    emptyChart(dispatch);
    //return data and invoke redirect function
    return navigate("/waterSpaces", { replace: true });
  };
  return (
    <>
      <Flex>
        <Box>
          <List>{CardsMaps}</List>
        </Box>
        <Spacer />
        <Box>
          <Button
            colorScheme="teal"
            size="lg"
            onClick={() => {
              handleCheckOut();
            }}
          >
            Check out
          </Button>
        </Box>
      </Flex>
    </>
  );
}
