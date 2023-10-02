import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
} from "@chakra-ui/react";
import "../styles/Cards.css";
import { useDispatch } from "react-redux";
import { receiveItem } from "../redux/features/ChartSlicer";
import { receiveItemFromLocalStorage } from "../redux/features/ChartSlicer";

export default function Cards({ cardsType, item }) {
  const dispatch = useDispatch();

  return (
    <Card maxW="sm" m={4} boxShadow="2xl">
      <CardBody>
        {cardsType === "waterSpaces" ? (
          <>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="3" spacing="2px">
              <Heading size="md">{item.title}</Heading>
              <Text>
                This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned spaces and
                for people who love a chic design with a sprinkle of vintage design.
              </Text>
              <Text color="blue.600" fontSize="2xl">
                ${item.price}
              </Text>
            </Stack>
          </>
        ) : (
          <>
            <Image
              src="https://www.ikea.com/jo/en/images/products/lugnare-scented-candle-in-glass-jasmine-pink__1096896_pe864577_s5.jpg"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="3" spacing="2px">
              <Heading size="md">{item.title}</Heading>
              <Text>
                Urban Concepts by DECOCANDLES - Highly Scented Soy Candle - Long Lasting - Hand Poured in USA
                (Fresh Linen, 6 Oz.)
              </Text>
              <Text color="blue.600" fontSize="2xl">
                ${item.price}
              </Text>
            </Stack>
          </>
        )}
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="blue">
            Buy now
          </Button>
          <Button
            variant="ghost"
            colorScheme="blue"
            onClick={() => {
              receiveItemFromLocalStorage(dispatch, item);
            }}
          >
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
