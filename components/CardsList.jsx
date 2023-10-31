import React, { useState, useRef, useEffect } from "react";
import Card from "./Cards";
import axios from "axios";
import { Grid, Progress, Box, Text, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import "../styles/CardsList.css";
import { useLoaderData, useActionData } from "react-router-dom";
import { motion } from "framer-motion";
import jwtDecode from "jwt-decode";
import CardModal from "./CardModal";

export default function CardsList() {
  const [TempItemsNumber, setTempItemsNumber] = useState(0); // this is the number of items that will be fetched from the backend// this is the number of items that will be fetched from the backend
  const [items, setItems] = useState(Array.from({ length: 0 }));
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const receiveItemMessage = useSelector((state) => state.ChartSlicer);
  const CARDS_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/gallery";
  let NumberOfCardsOffset = useRef(0);
  let NumberOfCardsLimit = useRef(4);
  const pageDocument = document.location.pathname.split("/")[1];
  console.log("data uploaded from this page");
  const dataFromActions = useActionData();
  console.log("dataFromActions??????", dataFromActions);
  const resetData = () => {
    console.log("resetData");
    setTempItemsNumber(0);
    setHasMore(true);
    //scroll to top
    window.scrollTo(0, -200);
    NumberOfCardsLimit.current = 4;
    NumberOfCardsOffset.current = 0;
  };
  //use params of of loader data and send numberOfCardsLimit and numberOfCardsOffset to backend
  const { data } = useLoaderData();
  //this useEffect will be called when the data is fetched from the data loader
  // from react router dom and only when the page is loaded for the first time
  useEffect(() => {
    console.log("dataFromActions", dataFromActions);
    if (dataFromActions?.data.state === 200 && dataFromActions?.data.type === "delete") return;
    setItems(data);
    console.log("loader Data", data);
    // if (!dataFromActions?.state === 200 && !dataFromActions?.type === "delete")
    resetData();
  }, [pageDocument, data]);

  const verifyAdmin = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const decodeToken = jwtDecode(token);
    if (decodeToken.role === "admin") return true;
    return false;
  };

  useEffect(() => {
    if (TempItemsNumber === items.length && TempItemsNumber !== 0) {
      setHasMore(false);
      return;
    }
    console.log("TempItemsNumber", TempItemsNumber);
  }, [items]);

  const fetchMoreData = () => {
    if (hasMore === false) {
      return;
    }
    setTempItemsNumber(items.length);
    NumberOfCardsOffset.current += 4;
    axios
      .get(CARDS_URL, {
        params: { limit: NumberOfCardsLimit.current, offset: NumberOfCardsOffset.current, page: pageDocument },
      })
      .then((res) => {
        console.log(res.data);
        //just add the new data to the old data
        setItems(items.concat(res.data));
      })
      .catch((err) => {
        console.log(err);
        return [err, "error in fetching data  from backend" + CARDS_URL];
      });
  };

  // get the url params
  const CardsMaps = items.map((i, index) => (
    <Card key={index} cardsType={pageDocument} item={i} verifyAdmin={verifyAdmin} />
  ));

  return (
    <>
      <InfiniteScroll
        scrollThreshold={0.4}
        dataLength={items.length}
        next={() => fetchMoreData()}
        hasMore={hasMore}
        loader={
          <>
            <div className="load">
              <h3 className="p-load">loading..</h3>
            </div>
            <Progress size="xs" isIndeterminate />
          </>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            transition="all 0.5s ease-in-out"
            gap={6}
            align="center"
            justify="center"
          >
            {verifyAdmin() && (
              <Box
                //mover the box little bit down
                mt="18%"
                bg="white.100"
                align="center"
                justify="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <CardModal />
              </Box>
            )}

            {CardsMaps}
          </Grid>
        </motion.div>
      </InfiniteScroll>
    </>
  );
}
