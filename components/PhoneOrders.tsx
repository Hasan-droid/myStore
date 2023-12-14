import React, { useEffect } from "react";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface ITypes {
  props: {
    currentItems?: //array of objects
    {
      phone?: string;
      id: number;
      createdAt: string;
      totalPrice: number;
      orderStatus: string;
    }[];
  };
}

export const headerStyle = {
  fontWeight: "bold",
  fontSize: "0.60rem",
  color: "gray",
  padding: "0",
  "padding-bottom": "12px",
};

export const dataStyle = {
  fontSize: "0.77rem",
  color: "black",
  "padding-bottom": "12px",
  "padding-top": "12px",

  "padding-left": "0px",
  "padding-right": "0px",

  //margin 10px
};

export const pagingStyle = {
  fontSize: "0.6rem",
  fontWeight: "normal",
  bg: "none",
  minW: "65px",
};

const PhoneOrders: React.FC<ITypes["props"]> = ({ currentItems }) => {
  useEffect(() => {
    window.scrollTo(0, -200);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <Box minH={"65vh"}>
        <Text fontSize="lg" fontWeight="bold" mb={7} mt={12} color={"brand.glaucous"}>
          Your Orders
        </Text>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th style={headerStyle}>ID</Th>
              <Th style={headerStyle}>purchase Date</Th>
              <Th style={headerStyle}>Phone Number</Th>
              <Th style={headerStyle}>Total</Th>
              <Th style={headerStyle}>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems?.map((order) => (
              <Tr key={order.id}>
                <Td style={dataStyle} minW={"40px"}>
                  {order.id}
                </Td>
                <Td style={dataStyle} minW={"50px"}>
                  {
                    //format date
                    new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }
                </Td>
                <Td style={dataStyle} minW={"50px"}>
                  {order.phone}
                </Td>
                <Td style={dataStyle} minW={"50px"}>
                  {order.totalPrice}
                </Td>
                <Td style={dataStyle}>
                  {order.orderStatus === "delivered" && (
                    <Badge {...pagingStyle} color={"green"}>
                      delivered
                    </Badge>
                  )}
                  {order.orderStatus === "on deliver" && (
                    <Badge {...pagingStyle} color={"blue"}>
                      on deliver
                    </Badge>
                  )}
                  {order.orderStatus === "rejected" && (
                    <Badge {...pagingStyle} color={"red"}>
                      rejected
                    </Badge>
                  )}
                  {order.orderStatus === "pending" && (
                    <Badge color={"orange"} {...pagingStyle}>
                      pending
                    </Badge>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </motion.div>
  );
};

export default PhoneOrders;
