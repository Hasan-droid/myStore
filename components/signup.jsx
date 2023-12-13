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
import { Link, useActionData, Form, useSubmit } from "react-router-dom";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import LoadingScreen from "./LoadingScreen";
import CustomToast from "./Toast";

export default function SignupCard() {
  const fields = {
    firstname: { required: false },
    lastname: { required: false },
    username: { required: false },
    password: { required: false },
  };
  const initialError = {
    state: false,
    type: "",
    message: "",
    filed: fields,
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ ...initialError });
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = useSubmit();
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
    // return () => {
    //   setError({ state: false, type: "", message: "", filed: {} });
    // };
  }, [dataFromActions]);

  const CheckFields = () => {
    const emailRegex = import.meta.env.VITE_TOKEN_EMAIL_REGEX;
    let errorCheck = initialError;
    let error = false;
    if (!firstname) {
      error = true;
      errorCheck = {
        type: "Filed Required",
        message: "Filed Required",
        filed: { ...errorCheck.filed, firstname: { required: true } },
      };
    }
    if (!lastname) {
      error = true;
      errorCheck = {
        type: "Filed Required",
        message: "Filed Required",
        filed: { ...errorCheck.filed, lastname: { required: true } },
      };
    }
    if (!username) {
      error = true;
      errorCheck = {
        type: "Filed Required",
        message: "Filed Required",
        filed: { ...errorCheck.filed, username: { required: true } },
      };
    } else if (!username.match(emailRegex)) {
      error = true;
      errorCheck = {
        type: "Filed Required",
        message: "Filed Required",
        filed: {
          ...errorCheck.filed,
          username: { required: true, formatMessage: import.meta.env.VITE_TOKEN_EMAIL_REGEX_MESSAGE },
        },
      };
    }
    if (!password) {
      error = true;
      errorCheck = {
        type: "Filed Required",
        message: "Filed Required",
        filed: { ...errorCheck.filed, password: { required: true } },
      };
    }
    setError(errorCheck);
    return !error;
  };

  const handleSignUp = () => {
    debugger;
    if (!CheckFields()) return;
    // if (error.state) return;
    setIsLoading(true);
    submit({ username: username.toLowerCase(), password: password, firstname, lastname }, { method: "post" });
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
      <LoadingScreen isLoading={isLoading} />
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
                        value={firstname}
                        name="firstname"
                        onChange={(e) => {
                          error.filed.firstname.required = false;

                          setError({
                            type: "Filed Required",
                            message: "Filed Required",
                            filed: error.filed,
                          });
                          setFirstname(e.target.value);
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
                        value={lastname}
                        onChange={(e) => {
                          error.filed.lastname.required = false;

                          setError({
                            type: "Filed Required",
                            message: "Filed Required",
                            filed: error.filed,
                          });
                          setLastname(e.target.value);
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
                    value={username}
                    onChange={(e) => {
                      console.log("error.filed.username", error);
                      error.filed.username.required = false;
                      setError({
                        type: "Filed Required",
                        message: "Filed Required",
                        filed: error.filed,
                      });
                      setUsername(e.target.value);
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
                      value={password}
                      onChange={(e) => {
                        error.filed.password.required = false;

                        setError({
                          type: "Filed Required",
                          message: "Filed Required",
                          filed: error.filed,
                        });
                        setPassword(e.target.value);
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
