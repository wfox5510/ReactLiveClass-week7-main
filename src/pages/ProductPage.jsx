import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const ProductPage = () => {
  const [qtySelect,setQtySelect] = useState(null);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const param = useParams();
  const navigate= useNavigate();
  useEffect(() => {
    getProduct(param.id);
  }, []);

  const getProduct = async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/product/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const addCart = async (id, qty = 1) => {
    try {
      setIsLoading(true);
      await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data: {
          product_id: id,
          qty: Number(qty),
        },
      });
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="container">
        <div className=" d-flex flex-column align-items-center mt-4">
          <h2 className="fs-5">產品名稱：{product?.title}</h2>
          <div>
            <img
              src={product?.imageUrl}
              alt={product?.title}
              className="img-fluid"
              width={"400px"}
            />
            <p>內容：{product?.content}</p>
            <p>描述：{product?.description}</p>
            <p>
              價錢：{product?.price} <del>{product?.origin_price}</del> 元
            </p>
            <div className="input-group align-items-center mb-4">
              <label htmlFor="qtySelect">數量：</label>
              <select
                onChange={(e) => setQtySelect(e.target.value)}
                id="qtySelect"
                className="form-select"
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={async () => {
                await addCart(param.id,qtySelect);
                navigate('/cart');
              }}
              // disabled={isLoading}
            >
              加入購物車
              {isLoading && <i className="fas fa-spinner fa-pulse ms-1"></i>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductPage;
