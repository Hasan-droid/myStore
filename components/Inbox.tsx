import React, { useEffect } from "react";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import PurchaseOrderModal from "./PurshaseOrderModal";

interface ITypes {
  props: {
    currentItems?: //array of objects
    {
      customerName?: string;
      id: number;
      createdAt: string;
      totalPrice: number;
      orderStatus: string;
    }[];
  };
}

const Inbox: React.FC<ITypes["props"]> = ({ currentItems }) => {
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
              <Th>Customer Name</Th>
              <Th>Purchase Date</Th>
              <Th>Total</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems?.map((order) => (
              <PurchaseOrderModal order={order} key={order.id} />
            ))}
          </Tbody>
        </Table>
      </Box>
    </motion.div>
  );
};

export default Inbox;
