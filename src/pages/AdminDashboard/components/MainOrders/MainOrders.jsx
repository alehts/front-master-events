import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
const MainOrders = () => {
  return (
    <div className="MainDash">
      <h1>Ordenes</h1>
      <Table />
    </div>
  );
};

export default MainOrders;
