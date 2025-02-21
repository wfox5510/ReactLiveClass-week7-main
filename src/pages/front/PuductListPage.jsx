import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import LoadingFull from "../../components/LoadingFull";
import { setIsLoading } from "../../slice/loadingFullSlice";
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const ProductListPage = () => {
  const [productData, setProductData] = useState(null);
  const [paginationData, setPaginationData] = useState(null);
  
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const isLoading = useSelector(state => state.loadingFull.isLoading);
  const dispatch = useDispatch()
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async (page = 1) => {
    try {
      dispatch(setIsLoading(true))
      const res = await axios.get(
        `${API_BASE}/api/${API_PATH}/products?page=${page}`
      );
      setPaginationData(res.data.pagination);
      setProductData(res.data.products);
      dispatch(setIsLoading(false))
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      dispatch(setIsLoading(false))
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
      {isLoading && <LoadingFull />}
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
      <nav
        className="d-flex justify-content-center"
        aria-label="Page navigation"
      >
        <ul className="pagination">
          <li className="page-item">
            <a
              className={`page-link ${!paginationData?.has_pre && "disabled"}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                getProduct(paginationData.current_page - 1);
              }}
            >
              上一頁
            </a>
          </li>
          {Array.from({ length: paginationData?.total_pages }).map(
            (item, index) => {
              return (
                <li className="page-item" key={index}>
                  <a
                    className={`page-link ${
                      paginationData?.current_page === index + 1 && "active"
                    }`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      getProduct(index + 1);
                    }}
                  >
                    {index + 1}
                  </a>
                </li>
              );
            }
          )}
          <li className="page-item">
            <a
              className={`page-link ${!paginationData?.has_next && "disabled"}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                getProduct(paginationData.current_page + 1);
              }}
            >
              下一頁
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductListPage;
