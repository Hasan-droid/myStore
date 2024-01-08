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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Form, useActionData, Link, useSubmit, useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomToast from "./Toast";
import LoadingScreen from "./LoadingScreen";
export default function SignIn() {
  const dataFromActions = useActionData();
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [AlertDescriptionText, setAlertDescriptionText] = useState("");
  const [AlertTitleText, setAlertTitleText] = useState("");
  const [userVerified, setUserVerified] = useState(""); //dataFromActions?.data?.verified
  const submit = useSubmit();
  const { data } = useLoaderData();
  console.log("data from loader", data);
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
    if (dataFromActions?.data.state && dataFromActions?.data.type === "invalid") {
      setIsLoading(false);
      setError({
        state: true,
        type: dataFromActions?.data.type,
        message: dataFromActions?.data.message,
        fields: dataFromActions?.data.fields,
      });
    }
    if (dataFromActions?.data.state && dataFromActions?.data.type === "email-verification") {
      setIsLoading(false);
      setAlertDescriptionText(dataFromActions?.data.message.description);
      setAlertTitleText(dataFromActions?.data.message.title);
      //this line of code just for remove the success alert if the user clicks and receives verification email message
      if (userVerified) setUserVerified(false);
    }
  }, [dataFromActions?.data]);

  useEffect(() => {
    console.log("data.verified", data.verified);
    if (data.verified === true || data.verified === false) {
      setAlertDescriptionText(data.message.description);
      setAlertTitleText(data.message.title);
      setUserVerified(data.verified);
    }
  }, []);
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
    const emailRegex = new RegExp(import.meta.env.VITE_TOKEN_EMAIL_REGEX, "i");
    if (!emailRegex.test(username)) {
      trackError.fields.username.required = true;
      trackError.message.format = import.meta.env.VITE_TOKEN_EMAIL_REGEX_MESSAGE;
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

      <LoadingScreen isLoading={isLoading} height={"48%"} width={"48%"} />
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            {userVerified === true && (
              <Alert status="success">
                <AlertIcon />
                <AlertTitle mr={2}>{AlertTitleText}</AlertTitle>
                <AlertDescription>{AlertDescriptionText}</AlertDescription>
              </Alert>
            )}
            {(userVerified === false || dataFromActions?.data.type === "email-verification") && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>{AlertTitleText}</AlertTitle>
                <AlertDescription>{AlertDescriptionText}</AlertDescription>
              </Alert>
            )}
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
