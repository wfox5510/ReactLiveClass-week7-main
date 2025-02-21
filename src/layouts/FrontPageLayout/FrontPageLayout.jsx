import "./FrontPageLayout.css";

import { Outlet } from "react-router-dom";


import NavBar from "../../components/Navbar";

function FrontPageLayout() {
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
      path: "/login",
    },
  ];
  return (
    <>
      <NavBar navItemList={navItemList} />
      <Outlet />
    </>
  );
}
export default FrontPageLayout;
