import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import Orders from "./Orders.tsx";
import "../styles/Pagination.css";
import { useLoaderData, useSubmit } from "react-router-dom";
import { verifyAdmin } from "./Header.jsx";
import Inbox from "./Inbox.tsx";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
interface ITypes {
  loaderData: {
    data: {
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
}

function OrdersPaginator({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState<ITypes["loaderData"]["data"]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [items, setItems] = useState<ITypes["loaderData"]["data"]>([]);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const { data } = useLoaderData() as ITypes["loaderData"];
  useEffect(() => {
    console.log("orders data", data);
    setItems(data);
    //get phone property from data
  }, [data]);

  useEffect(() => {
    // debugger;
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    console.log(`Total items:`, items);

    //do api call when reach the end of items array
    const itemsLength = items.length;
    const itemOffsets = itemOffset;
    const itemPerPage = itemsPerPage;
    const itemsSlice = items.slice(itemOffset, endOffset);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  useEffect(() => {
    debugger;
    const endOffset = itemOffset + itemsPerPage;
    if (endOffset >= items.length) {
      debugger;
      const INBOX_URL = import.meta.env.VITE_BACKEND_URL_CARDS + "/inbox";
      axios.get(INBOX_URL, { params: { limit: 12, offset: items.length } }).then((res) => {
        console.log("res of more data", res);
        const newItems = res.data;
        setItems([...items, ...newItems]);
      });
    }
  }, [itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      {!verifyAdmin() && <Orders currentItems={currentItems} />}
      {verifyAdmin() && <Inbox currentItems={currentItems} />}
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default OrdersPaginator;
