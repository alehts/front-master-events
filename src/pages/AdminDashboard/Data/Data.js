// Sidebar imports
import axios from "axios";


import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";


// Función para actualizar los arrays con la respuesta de la API
export const actualizarArraysConApi = (datosApi) => {

  // Sales
  let totalSales = sales(datosApi)

  // Calcular el 30% de gastos
  let gastosPorcentaje = 30;
  let totalBills = (gastosPorcentaje / 100) * totalSales;
  cardsData[2].value = totalBills.toLocaleString();

  // revenue
  revenue(totalSales, totalBills)




};

const sales = (datosApi) => {
  // Datos
  let totalCantidadInicial = datosApi.reduce((aq, acc) => aq + acc.quantity, 0);
  let stockActual = datosApi.reduce((aq, acc) => aq + acc.stock, 0);
  let totalSalesTickets = totalCantidadInicial - stockActual;


  // Calcular el porcentaje de ventas
  const porcentajeVentas = ((totalSalesTickets) / totalCantidadInicial) * 100;
  cardsData[0].barValue = Math.round(porcentajeVentas * 10) / 10;

  // Calcular ventas
  // const totalSales = datosApi.reduce((aq, acc) => aq + acc.quantity, 0);
  const totalSales = datosApi.reduce((acumulador, producto) => {
    let totalSaleItem = producto.price * (producto.quantity - producto.stock)
    return acumulador + totalSaleItem;
  }, 0);
  cardsData[0].value = totalSales.toLocaleString();
  return totalSales;
}


const revenue = (totalSales, totalBills) => {
  // Calcular la ganancia
  const revenue = totalSales - totalBills;
  cardsData[1].value = revenue.toLocaleString();

  // Calcular el porcentaje de ganancia
  const porcentajeRevenue = (revenue / totalSales) * 100;

  // Redondear el resultado a un decimales
  const porcentajeRedondeado = Math.round(porcentajeRevenue * 10) / 10;
  cardsData[1].barValue = porcentajeRedondeado

  return porcentajeRedondeado;
  // return totalSales;
}

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
  },
  {
    icon: UilClipboardAlt,
    heading: "Ordenes",
  },
  // {
  //   icon: UilUsersAlt,
  //   heading: "Clientes",
  // },
  {
    icon: UilPackage,
    heading: 'Productos'
  },
  // {
  //   icon: UilChart,
  //   heading: 'Analítica'
  // },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Ventas",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 0,
    value: "25,970",
    png: UilUsdSquare,
    series: [
      {
        name: "Ventas",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Ganacias",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Ganacias",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Gastos",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 30,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Gastos",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
