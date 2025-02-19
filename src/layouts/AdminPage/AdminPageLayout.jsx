import "./AdminPageLayout";

import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Toast } from "bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { setMessage } from "../../slice/toastSlice";
import NavBar from "../../components/Navbar";

function AdminPageLayout() {

  const toastRef = useRef({})
  const navItemList = [
    {
      name: "首頁",
      path: "/",
    },
    {
      name: "後台產品頁面",
      path: "/admin/productList",
    },
    {
      name: "訂單頁面",
      path: "/admin/order",
    },
  ];
  useEffect(() => {
    var toastElList = [].slice.call(document.querySelectorAll(".toast"));
    var toastList = new Toast(toastRef.current[0]);
    toastList.show();
    setInterval(() => {
      toastList.hide();
    }, 500);
    console.log(toastElList);
    console.log(toastRef.current);
  }, []);
  return (
    <>
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: "5" }}>
        <div
          ref={(el) => {
            toastRef.current[0] = el;
          }}
          id="liveToast"
          className="toast hide"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header bg-success">
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </div>
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>
      </div>
      <NavBar navItemList={navItemList} />
      <Outlet />
    </>
  );
}
export default AdminPageLayout;
