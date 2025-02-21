import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setIsLoading } from "../../slice/loadingFullSlice";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const AdminOrderPage = () => {
  const [orderData, setOderData] = useState(null);
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      try {
        await getOrder();
      } catch (error) {
        alert(error.response.data.message);
      }
    })();
  }, []);

  const getOrder = async () => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/admin/orders`);
      setOderData(res.data.orders);
    } catch (error) {
      alert(error.response.data.message);
    }
    finally{
      dispatch(setIsLoading(false))
    }
  };

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">訂購人</th>
              <th scope="col">地址</th>
              <th scope="col">電話</th>
              <th scope="col">狀態</th>
              <th scope="col">訂單價格</th>
              <th scope="col">備註</th>
            </tr>
          </thead>
          <tbody>
            {orderData?.map((order, index) => {
              return (
                <tr key={order.id}>
                  <th scope="row">{index + 1}</th>
                  <td scope="col">{order.user.name}</td>
                  <td scope="col">{order.user.address}</td>
                  <td scope="col">{order.user.tel}</td>
                  <td scope="col">{order.is_paid ? "已付款" : "未付款"}</td>
                  <td scope="col">{order.total}</td>
                  <td scope="col">{order.message}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminOrderPage;
