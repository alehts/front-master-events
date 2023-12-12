import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/TableProducts";
import "./MainDash.css";
const MainListProducts = ({ products }) => {
  return (
    <div className="MainDash">
      <h1>Mis Productos</h1>
      <Table productList={products} />
    </div>
  );
};

export default MainListProducts;
