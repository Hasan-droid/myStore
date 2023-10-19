"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { Form, useActionData, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomToast from "./Toast";
export default function SignIn() {
  const dataFromActions = useActionData();
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log("dataFromActions?.data", dataFromActions?.data);
    if (dataFromActions?.data?.state && dataFromActions?.data?.type === "toast") {
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
      return;
    }
    if (dataFromActions?.data.state) {
      setIsLoading(false);
      setError({ state: true, type: dataFromActions?.data.type, message: dataFromActions?.data.message });
    }
  }, [dataFromActions?.data]);

  const [error, setError] = useState({ state: false, type: "", message: "" });
  const handleClick = () => {
    if (error) if (error.state) return;
    setIsLoading(true);
  };
  return (
    <>
      {showToast && (
        <CustomToast receivedPosition="top" receivedStatus="error" receivedTitle={dataFromActions.data.message} />
      )}
      {isLoading && (
        <div
          className="toto"
          style={{
            // filter: isLoading ? "blur(4px)" : "none",
            backgroundColor: isLoading ? "rgba(255, 255, 255, 0.5)" : null,
            // position: "relative",
            zIndex: 5,
            position: "absolute", // Position the spinner within the form
            top: "0%",
            left: "0%",
            width: "100%",
            height: "100%", // Required for overlaying the spinner // Required for overlaying the spinner// Required for overlaying the spinner
          }}
        ></div>
      )}
      {isLoading && (
        <div className="spinner" style={{ zIndex: 50 }}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            position="absolute" // Position the spinner within the form
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            // Center the spinner
          />
        </div>
      )}
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Text color={"blue.400"}>features</Text> ✌️
            </Text>
          </Stack>
          <Form method="post">
            <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl isInvalid={error.state}>
                  <FormErrorMessage>{error.type === "invalid" ? error.message : ""}</FormErrorMessage>
                </FormControl>
                <FormControl
                  id="email"
                  isInvalid={
                    (error.state && error.type === "username field") ||
                    error.type === "invalid" ||
                    error.type === "username and password field"
                  }
                >
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="username" onChange={() => setError({ state: false })} />
                  <FormErrorMessage>
                    {error.type === "username field" || error.type === "username and password field"
                      ? error.message
                      : ""}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  id="password"
                  isInvalid={
                    (error.state && error.type === "password field") ||
                    error.type === "invalid" ||
                    error.type === "username and password field"
                  }
                >
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" onChange={() => setError(false)} />
                  <FormErrorMessage>
                    {error.type === "password field" || error.type === "username and password field"
                      ? error.message
                      : ""}
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing={10}>
                  <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                    <Checkbox>Remember me</Checkbox>
                    <Text color={"blue.400"}>Forgot password?</Text>
                  </Stack>

                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.600",
                    }}
                    onClick={() => handleClick()}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
              <Divider borderColor="black" />

              <Text align={"center"} fontSize={"sm"} color={"gray.600"}>
                Don't have account{" "}
                <Link to="/signup" color={"blue.400"}>
                  signup
                </Link>{" "}
                ✌️
              </Text>
            </Box>
          </Form>
        </Stack>
      </Flex>
    </>
  );
}
