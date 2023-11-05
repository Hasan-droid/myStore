"use client";
import axios from "axios";
import "../styles/Spinner.css";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { Link, useActionData, Form } from "react-router-dom";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import CustomToast from "./Toast";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ state: false, type: "", message: "", filed: {} });
  const dataFromActions = useActionData();
  useEffect(() => {
    console.log("dataFromActions", dataFromActions);
    if (dataFromActions?.data?.state && dataFromActions?.data?.type === "invalid") {
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
      return;
    }
    if (dataFromActions?.data?.state && dataFromActions?.data?.type === "Filed Required") {
      const data = dataFromActions.data;
      setError({ state: data.state, type: data?.type, message: data?.message, filed: data?.filed });
    }
    setIsLoading(false);
    return () => {
      setError({ state: false, type: "", message: "", filed: {} });
    };
  }, [dataFromActions]);

  const handleSignUp = () => {
    if (error.state) return;
    setIsLoading(true);
  };

  useEffect(() => {
    // debugger;
    console.log("error", error);
  }, [error]);

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
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <Form method="post">
                <HStack>
                  <Box>
                    <FormControl id="firstname" isInvalid={error.filed?.firstname?.required === true}>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        name="firstname"
                        onChange={() => {
                          error.filed.firstname.required = false;

                          setError({
                            type: "Filed Required",
                            message: "Filed Required",
                            filed: error.filed,
                          });
                          // setError();
                        }}
                      />
                      <FormErrorMessage>
                        {error.filed.firstname?.required === true ? error.message : ""}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastname" isInvalid={error.filed.lastname?.required === true}>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        name="lastname"
                        onChange={() => {
                          error.filed.lastname.required = false;

                          setError({
                            type: "Filed Required",
                            message: "Filed Required",
                            filed: error.filed,
                          });
                          // setError();
                        }}
                      />
                      <FormErrorMessage>
                        {error.filed.lastname?.required === true ? error.message : ""}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="username" isInvalid={error.filed.username?.required === true}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="text"
                    name="username"
                    onChange={() => {
                      error.filed.username.required = false;

                      setError({
                        type: "Filed Required",
                        message: "Filed Required",
                        filed: error.filed,
                      });
                      // setError();
                    }}
                  />
                  <FormErrorMessage>
                    {error.filed.username?.required === true
                      ? error.filed.username?.formatMessage
                        ? error.filed.username.formatMessage
                        : error.message
                      : ""}
                  </FormErrorMessage>
                </FormControl>
                <FormControl id="password" isInvalid={error.filed.password?.required === true}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={() => {
                        error.filed.password.required = false;

                        setError({
                          type: "Filed Required",
                          message: "Filed Required",
                          filed: error.filed,
                        });
                        // setError();
                      }}
                    />
                    <InputRightElement h={"full"}>
                      <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {error.filed.password?.required === true ? error.message : ""}
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                    onClick={() => handleSignUp()}
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    <Link to="/signin" color={"blue.400"}>
                      Sign in
                    </Link>
                  </Text>
                </Stack>
              </Form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
