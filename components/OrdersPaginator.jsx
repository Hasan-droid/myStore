import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import Orders from "./Orders.tsx";
import "../styles/Pagination.css";
import { useLoaderData } from "react-router-dom";

// const items = JSON.parse(localStorage.getItem("state"))?.ChartData ?? [];
// console.log("ssssssssssssssssssssssssssssssssssss", items);

// const itemsTest = [
//   { id: 1, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "delivered" },
//   //create 3 new orders with different data
//   { id: 2, purchaseData: "25/12/2022", assignedPhone: "0788784817", total: 250, status: "rejected" },
//   { id: 3, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "pending" },
//   { id: 4, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "delivered" },
//   { id: 5, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "pending" },
//   //create 30 new orders with different data
//   { id: 6, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "delivered" },
//   { id: 7, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "rejected" },
//   { id: 8, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "pending" },
//   { id: 9, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "delivered" },
//   { id: 10, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "pending" },
//   { id: 11, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "delivered" },
//   { id: 12, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "rejected" },
//   { id: 13, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "pending" },
//   { id: 14, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "delivered" },
//   { id: 15, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "pending" },
//   { id: 16, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "delivered" },
//   { id: 17, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "rejected" },
//   { id: 18, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "pending" },
//   { id: 19, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "delivered" },
//   { id: 20, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "pending" },
//   { id: 21, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "delivered" },
//   { id: 22, purchaseData: "25/12/2022", assignedPhone: "0787898006", total: 250, status: "rejected" },
// ];

function OrdersPaginator({ itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [items, setItems] = useState([]);
  const [itemsLength, setItemsLength] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const { data } = useLoaderData();
  useEffect(() => {
    console.log("orders data", data);
    setItems(data);
    //get phone property from data
    const getLength = data.map((item) => item.orders).flat();
    setItemsLength(getLength.length);

    console.log("orders data]]]]", getLength);
  }, [data]);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    console.log(`Total items:`, items);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

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
