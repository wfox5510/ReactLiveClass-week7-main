import ProductPageLayout from "../layouts/ProductPage/ProductPageLayout";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import ProductListPage from "../pages/PuductListPage";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/LoginPage";
import AdminProductList from "../pages/AdminProductListPage";
import AdminPageLayout from "../layouts/AdminPage/AdminPageLayout";
import AdminOrderPage from "../pages/AdminOrderPage";
const router = [
  {
    path: "/",
    element: <ProductPageLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "productList",
        element: <ProductListPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPageLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "productList",
        element: <AdminProductList/>,
      },
      {
        path: "order",
        element: <AdminOrderPage/>,
      }
    ],
  },
];

export default router;
