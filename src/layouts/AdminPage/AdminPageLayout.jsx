import "./AdminPageLayout";

import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { Toast } from "bootstrap";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../components/Navbar";

function AdminPageLayout() {
  const message = useSelector((state) => state.toast.message);

  const toastRef = useRef({});
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
    console.log(message)

  }, [message]);

  return (
    <>
      {message.map((messageItem) => {
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: "5" }}>
          <div
            ref={(el) => {
              toastRef.current[messageItem.id] = el;
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
              {messageItem.message}
            </div>
          </div>
        </div>;
      })}

      <NavBar navItemList={navItemList} />
      <Outlet />
    </>
  );
}
export default AdminPageLayout;
