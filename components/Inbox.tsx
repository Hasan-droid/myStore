import React, { useEffect, useState } from "react";
import { Box, Text, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { motion } from "framer-motion";
import PurchaseOrderModal from "./PurshaseOrderModal";
import { Form, useOutletContext, useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
interface ITypes {
  props: {
    currentItems?: //array of objects
    {
      customerName?: string;
      id: number;
      createdAt: string;
      totalPrice: number;
      orderStatus: string;
      email?: string;
      address?: string;
      phoneNumber?: string;
    }[];
  };
  outLetContext: {
    isAdmin?: boolean;
  }[];
}

const Inbox: React.FC<ITypes["props"]> = ({ currentItems }) => {
  console.log("currentItems//////", currentItems);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //define the type of useOutletContext from Itypes interface
  const [, , isAdmin] = useOutletContext() as ITypes["outLetContext"];
  console.log("isAdmin from inbox", isAdmin);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/waterSpaces");
    }
  }, [isAdmin]);

  useEffect(() => {
    window.scrollTo(0, -200);
  }, []);
  return (
    <>
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
          <Form method="post">
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
                <LoadingScreen isLoading={loading} height={50} />
                {currentItems?.map((order) => (
                  <PurchaseOrderModal order={order} key={order.id} setLoading={setLoading} isLoading={loading} />
                ))}
              </Tbody>
            </Table>
          </Form>
        </Box>
      </motion.div>
    </>
  );
};

export default Inbox;
