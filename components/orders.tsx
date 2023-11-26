import React, { useEffect } from "react";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";

interface ITypes {
  props: {
    currentItems?: //array of objects
    {
      phone: string;
      id: number;
      createdAt: string;
      totalPrice: number;
      orderStatus: string;
    }[];
  };
}

const Orders: React.FC<ITypes["props"]> = ({ currentItems }) => {
  console.log("currentItems//////", currentItems);

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
      <Box p={4} minH={"80vh"}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Orders!
        </Text>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Order purchase Date</Th>
              <Th>ِAssigned Phone Number</Th>
              <Th>Total</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems?.map((order) => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>
                  {
                    //format date
                    new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }
                </Td>
                <Td>{order.phone}</Td>
                <Td>{order.totalPrice}</Td>
                <Td>
                  {order.orderStatus === "delivered" && (
                    <Badge colorScheme="green" borderRadius={"xl"} size={"2xl"}>
                      delivered
                    </Badge>
                  )}
                  {order.orderStatus === "on deliver" && (
                    <Badge colorScheme="blue" borderRadius={"xl"} size={"2xl"}>
                      on deliver
                    </Badge>
                  )}
                  {order.orderStatus === "rejected" && (
                    <Badge colorScheme="red" borderRadius={"xl"} size={"2xl"}>
                      rejected
                    </Badge>
                  )}
                  {order.orderStatus === "pending" && (
                    <Badge colorScheme={"orange"} borderRadius={"xl"} size={"2xl"}>
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

export default Orders;
