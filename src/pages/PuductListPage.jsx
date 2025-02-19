import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "bootstrap";

import ReactLoading from "react-loading";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const ProductListPage = () => {
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const productModalRef = useRef(null);

  useEffect(() => {
    getProduct();
  }, []);
  useEffect(() => {
    //console.log(productData);
  }, [productData]);

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
      setProductData(res.data.products);
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addCart = async (id, qty = 1) => {
    try {
      setIsComponentLoading(true);
      await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data: {
          product_id: id,
          qty: Number(qty),
        },
      });
      setIsComponentLoading(false);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsComponentLoading(false);
    }
  };
  return (
    <div className="container">
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.3)",
            zIndex: 1000,
          }}
        >
          <ReactLoading
            type="spinningBubbles"
            color="black"
            height={"100px"}
            width={"100px"}
          />
        </div>
      )}
      <table className="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productData?.map((productItem) => {
            return (
              <tr key={productItem.id}>
                <td style={{ width: "200px" }}>
                  <div
                    style={{
                      height: "100px",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: `url(${productItem.imageUrl})`,
                    }}
                  ></div>
                </td>
                <td>{productItem.title}</td>
                <td>
                  <div className="h5"></div>
                  <del className="h6">原價 {productItem.origin_price}</del>
                  <div className="h5">特價 {productItem.price}</div>
                </td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <NavLink
                      className={`btn btn-outline-secondary ${
                        isComponentLoading && "disabled"
                      }`}
                      to={`/product/${productItem.id}`}
                      aria-disabled={isComponentLoading && "true"}
                    >
                      查看更多
                      {isComponentLoading && (
                        <i className="fas fa-spinner fa-pulse ms-1"></i>
                      )}
                    </NavLink>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      disabled={isComponentLoading}
                      onClick={() => {
                        addCart(productItem.id);
                      }}
                    >
                      加到購物車
                      {isComponentLoading && (
                        <i className="fas fa-spinner fa-pulse ms-1"></i>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListPage;
