import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import Orders from "./Orders.tsx";
import "../styles/Pagination.css";

// const items = JSON.parse(localStorage.getItem("state"))?.ChartData ?? [];
// console.log("ssssssssssssssssssssssssssssssssssss", items);

const items = [
  { id: 1, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "delivered" },
  //create 3 new orders with different data
  { id: 2, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "rejected" },
  { id: 3, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "on deliver" },
  { id: 4, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "delivered" },
  { id: 5, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "pending" },
  { id: 6, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "on deliver" },
  { id: 7, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "delivered" },
  { id: 8, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "pending" },
  { id: 10, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "rejected" },
  { id: 11, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "pending" },
  { id: 12, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "on deliver" },
  { id: 13, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "delivered" },
  { id: 14, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "rejected" },
  { id: 15, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "on deliver" },
  { id: 16, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "delivered" },
  { id: 17, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "pending" },
  { id: 18, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "on deliver" },
  { id: 19, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "delivered" },
  { id: 20, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "pending" },
  { id: 21, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "on deliver" },
  { id: 22, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "delivered" },
  { id: 23, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "rejected" },
  { id: 24, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "on deliver" },
  { id: 25, purchaseData: "25/12/2022", orderDeliveryDate: "27/12/2022", total: 250, status: "delivered" },
];

function OrdersPaginator({ itemsPerPage }) {
  debugger;
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    console.log(`Total items: ${items.length}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <Orders currentItems={currentItems} />
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

// Add a <div id="container"> to your HTML to see the componend rendered.
export default OrdersPaginator;
