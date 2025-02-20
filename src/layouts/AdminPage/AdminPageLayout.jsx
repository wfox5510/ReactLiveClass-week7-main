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
    var toastElList = [].slice.call(document.querySelectorAll(".toast"));
    var toastList = toastElList.map(function (toastEl) {
      return new Toast(toastEl);
    });
    const toastList2 = message.map((messageItem) => {
      return new Toast(toastRef.current[messageItem.id]);
    });

    toastList.length !== 0 && toastList[0].show();
  }, [message]);

  return (
    <>
      <div aria-live="polite" aria-atomic="true" class="position-relative">
        <div class="toast-container position-absolute top-0 end-0 p-3">
          {message.map((messageItem) => {
            return (
              <div
                ref={(el) => {
                  toastRef.current[messageItem.id] = el;
                }}
                className="toast hide"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="toast-header bg-success">
                  <strong className="me-auto">Bootstrap</strong>
                  <small>11 mins ago</small>
                </div>
                <div className="toast-body">{messageItem.message}</div>
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
