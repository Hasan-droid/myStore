/* eslint-disable react/prop-types */
import {
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
  Box,
  Input,
} from "@chakra-ui/react";
import "../styles/Cards.css";
import { useDispatch } from "react-redux";
import { increaseItemQuantityByOne } from "../Redux/features/CartSlicer";
import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminCardModal from "./AdminCardModal";
import UserCardModal from "./UserCardModal";

export default function Cards({ cardsType, item, verifyAdmin }) {
  console.log("[[[[item]]]]]", item);
  const dispatch = useDispatch();
  const [changeStyle, setChangeStyle] = useState({ changeStyle: false, id: null });
  const [itemImages, setItemImages] = useState([[]]);

  useEffect(() => {
    setItemImages(item?.images || []);
  }, [item]);

  const handleChangeStyle = (item) => {
    debugger;
    setChangeStyle({ changeStyle: true, id: item });
    // const getForm = document.querySelector("Form");
    // getForm.submit();
    console.log("handleChangeStyle");
  };

  return (
    //add some animation to the card
    //add some transition to the card
    <Box
      _hover={{ transform: "scale(1.05)", transition: "all 0.2s ease-in-out" }}
      transition="all 0.2s ease-in-out"
    >
      <Card
        maxW="sm"
        m={4}
        boxShadow="2xl"
        bg={changeStyle.changeStyle && changeStyle.id === item.id ? "red.100" : "white"}
        //transform translateX all the items.id that are less than the item.id
        //animate the rest of the cards
        //add some transition to the card
        //animate the rest of the cards when the card is deleted
        //add some transition to the card when the card is deleted
      >
        <CardBody>
          {verifyAdmin() && <AdminCardModal image={itemImages[0]} item={item} type={"image"} />}
          {!verifyAdmin() && <UserCardModal image={itemImages} item={item} type={"image"} />}

          <Stack mt="3" spacing="2px">
            <Heading size="md">{item.title}</Heading>
            <Text>{item.description}</Text>
            <Text color="blue.600" fontSize="2xl">
              ${item.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          {!verifyAdmin() ? (
            <ButtonGroup spacing="2">
              <Button variant="solid" colorScheme="blue">
                Buy now
              </Button>
              <Button variant="ghost" colorScheme="blue" onClick={() => increaseItemQuantityByOne(dispatch, item)}>
                Add to cart
              </Button>
            </ButtonGroup>
          ) : (
            <Form method="post">
              <Input type="hidden" name="id" value={item.id} />
              <ButtonGroup spacing="2">
                <AdminCardModal item={item} image={itemImages} type={"edit"} />
                <Button
                  variant="ghost"
                  colorScheme="red"
                  type="submit"
                  name="intent"
                  value="delete 1"
                  onClick={() => handleChangeStyle(item.id)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </CardFooter>
      </Card>
    </Box>
  );
}
