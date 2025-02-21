import FrontPageLayout from "../layouts/FrontPageLayout/FrontPageLayout";
import CartPage from "../pages/front/CartPage";
import HomePage from "../pages/front/HomePage";
import ProductListPage from "../pages/front/PuductListPage";
import ProductPage from "../pages/front/ProductPage";
import LoginPage from "../pages/front/LoginPage";
import AdminProductList from "../pages/admin/AdminProductListPage";
import AdminPageLayout from "../layouts/AdminPage/AdminPageLayout";
import AdminOrderPage from "../pages/admin/AdminOrderPage";
import PageNotFound from "../pages/PageNotFound";
const router = [
  {
    path: "/",
    element: <FrontPageLayout />,
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
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPageLayout />,
    children: [
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
  {
    path:"/*",
    element: <PageNotFound />
  }
];

export default router;
