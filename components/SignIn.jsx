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
import { Form, useActionData, Link, useSubmit } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomToast from "./Toast";
import { on } from "process";
export default function SignIn() {
  const dataFromActions = useActionData();
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const submit = useSubmit();
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
      setError({
        state: true,
        type: dataFromActions?.data.type,
        message: dataFromActions?.data.message,
        fields: dataFromActions?.data.fields,
      });
    }
  }, [dataFromActions?.data]);
  let fields = {
    username: {
      required: false,
    },
    password: {
      required: false,
      minLength: 8,
      maxLength: 20,
    },
  };
  const errorContent = {
    state: false,
    type: { filed: false, format: false },
    message: { filed: "", format: "" },
    fields,
  };
  const [error, setError] = useState({ ...errorContent });
  const handleClick = () => {
    let trackError = errorContent;
    let isError = false;
    //test if username mathch email regex
    //i want to inclue all charcters in the regex

    const emailRegex = new RegExp(import.meta.env.VITE_TOKEN_EMAIL_REGEX, "i");
    if (!emailRegex.test(username)) {
      trackError.fields.username.required = true;
      trackError.message.format = "Email must be in format name@example.com";
      trackError.type.format = true;
      isError = true;
    }
    //test if password is empty

    if (password === "") {
      trackError.fields.password.required = true;
      trackError.message.filed = "Filed Required";
      trackError.type.filed = true;
      isError = true;
    }
    if (username === "") {
      trackError.fields.username.required = true;
      trackError.message.filed = "Filed Required";
      trackError.type.filed = true;
      isError = true;
    }
    if (isError) {
      setError(trackError);
      return;
    }

    submit({ username: username.toLowerCase(), password: password }, { method: "post" });
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
                <FormControl id="email" isInvalid={error.fields?.username.required}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    name="username"
                    value={username}
                    onChange={(e) => {
                      error.fields.username.required = false;
                      setError(error);
                      setUserName(e.target.value);
                    }}
                  />
                  <FormErrorMessage>
                    {console.log("error.fields.username.required", error.type)}
                    {!username && error.type.filed === true && error.message.filed}
                    {username && error.type.format === true && error.message.format}
                  </FormErrorMessage>
                </FormControl>
                <FormControl id="password" isInvalid={error.fields.password.required === true}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    onChange={(e) => {
                      error.fields.password.required = false;
                      setError(error);
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                  <FormErrorMessage>
                    {console.log(
                      "password ////", //show the boolean value of the password
                      Boolean(error.fields.password.required)
                    )}
                    {!password && error.type.filed === true ? error.message.filed : ""}
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing={10}>
                  <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                    <Checkbox>Remember me</Checkbox>
                    <Text color={"blue.400"}>Forgot password?</Text>
                  </Stack>

                  <Button
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
