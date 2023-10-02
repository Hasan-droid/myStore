// import "./App.css";
import Header from "../components/Header";
import CardsList from "../components/CardsList";
import { Flex } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";

function App() {
  const [cardsType, setCardsType] = useState(document.location.pathname.split("/")[1]);

  return (
    <>
      <Flex direction="column" align="center" justify="center" minH="80vh">
        <CardsList />
      </Flex>
    </>
  );
}

export default App;
