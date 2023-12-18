import React, { useEffect, useState } from "react";
import { Box, Text, Table, Thead, Tbody, Tr, Th, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Form, useOutletContext, useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { headerStyle } from "./PhoneOrders";
import PhonePurchaseOrderModal from "./PhonePurshaseOrderModal";
import { useSelector } from "react-redux";
import { IState } from "./Inbox";
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

const PhoneInbox: React.FC<ITypes["props"]> = ({ currentItems }) => {
  // const windowSize = localStorage.getItem("windowSize");
  const windowSize = useSelector((state: IState) => {
    return state.LoginInSlicer.windowSize;
  });
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

  useEffect(() => {
    console.log("it's detecting change", windowSize);

    if (windowSize === "md" || windowSize === "lg") {
      navigate("/inbox");
    }
  }, [windowSize]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <Box minH={"65vh"}>
          <Text fontSize="xl" fontWeight="bold" mb={4} mt={10}>
            Inbox
          </Text>
          <Form method="post">
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th style={headerStyle}>Order ID</Th>
                  <Th style={headerStyle}>Customer Name</Th>
                  <Th style={headerStyle}>Purchase Date</Th>
                  <Th style={headerStyle}>Total</Th>
                  <Th style={headerStyle}>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                <LoadingScreen isLoading={loading} height={80} width={195} />
                {currentItems?.map((order) => (
                  <PhonePurchaseOrderModal
                    order={order}
                    key={order.id}
                    setLoading={setLoading}
                    isLoading={loading}
                  />
                ))}
              </Tbody>
            </Table>
          </Form>
        </Box>
      </motion.div>
    </>
  );
};

export default PhoneInbox;
