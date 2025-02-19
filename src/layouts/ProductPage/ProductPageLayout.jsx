import "./ProductPageLayout.css";

import { Outlet } from "react-router-dom";


import NavBar from "../../components/Navbar";

function ProductPageLayout() {
  const navItemList = [
    {
      name: "首頁",
      path: "/",
    },
    {
      name: "產品頁",
      path: "/productList",
    },
    {
      name: "購物車",
      path: "/cart",
    },
    {
      name: "登入",
      path: "/admin/login",
    },
  ];
  return (
    <>
      <NavBar navItemList={navItemList} />
      
      <Outlet />
    </>
  );
}
export default ProductPageLayout;
