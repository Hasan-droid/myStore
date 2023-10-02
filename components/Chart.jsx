import React from "react";
import { List, ListItem, ListIcon, Divider, Button, Box, Flex, Spacer } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Card from "./Cards";
import { redirect, Form } from "react-router-dom";
// import { Container } from "react-bootstrap";
export default function Chart() {
  //get data from local storage
  const data = JSON.parse(localStorage.getItem("state"));
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
  return (
    <>
      <Flex>
        <Box>
          <List>{CardsMaps}</List>
        </Box>
        <Spacer />
        <Form method="post">
          <Box>
            <Button colorScheme="teal" size="lg" type="submit" onClick={() => {}}>
              Check out
            </Button>
          </Box>
        </Form>
      </Flex>
    </>
  );
}
