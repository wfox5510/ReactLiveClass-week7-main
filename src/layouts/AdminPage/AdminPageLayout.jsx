import "./AdminPageLayout.css";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toast } from "bootstrap";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../components/Navbar";
import { delMessage } from "../../slice/toastSlice";

function AdminPageLayout() {
  const message = useSelector((state) => state.toast.message);
  const dispatch = useDispatch();
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
    message.forEach((messageItem) => {
      setTimeout(() => {
        dispatch(delMessage(messageItem.id))
      }, 3000);
    });
  }, [message]);

  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="position-relative">
        <div className="toast-container position-absolute top-0 end-0 p-3">
          {message.map((messageItem) => {
            return (
              <div
                className="toast show fade-in-out"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                autohide="false"
                key={messageItem.id}
              >
                <div className={`toast-header bg-${messageItem.status}`}>
                  <strong className="me-auto text-light fw-bold">
                    {messageItem.status === "error" ? "錯誤" : "成功"}
                  </strong>
                </div>
                <div className="toast-body">{messageItem.toastMessage}</div>
              </div>
            );
          })}
        </div>
      </div>
      <NavBar navItemList={navItemList} />
      <Outlet />
    </>
  );
}
export default AdminPageLayout;
