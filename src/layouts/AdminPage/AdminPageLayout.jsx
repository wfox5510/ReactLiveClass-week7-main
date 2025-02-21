import "./AdminPageLayout.css";

import { useEffect, useLayoutEffect } from "react";
import { Outlet ,useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../components/Navbar";
import LoadingFull from "../../components/LoadingFull";
import { delMessage } from "../../slice/toastSlice";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function AdminPageLayout() {
  const message = useSelector((state) => state.toast.message);
  const isLoading = useSelector((state) => state.loadingFull.isLoading)
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  
  useLayoutEffect(() => {
    (async () => {
      try {
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)hexTokenWeek2\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        );
        axios.defaults.headers.common["Authorization"] = token;
        await axios.post(`${API_BASE}/api/user/check`, {});
      } catch (error) {
        console.log(error); 
        alert(error.response.data.message);
        navigate("/login");
      }
    })();
  });
  useEffect(() => {
    message.forEach((messageItem) => {
      setTimeout(() => {
        dispatch(delMessage(messageItem.id));
      }, 3000);
    });
  }, [message]);

  return (
    <>
      {isLoading && <LoadingFull />}
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
