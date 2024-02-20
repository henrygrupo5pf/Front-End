import { Route, Routes, Navigate } from "react-router-dom";
import { Home, ProductDetail, Login, DashBoard, ProductForm } from "../pages/index";
import Cart from "../pages/Cart/Cart";
import CheckOut from "../pages/CheckOut/CheckOut";
import Success from "../pages/CheckOut/Success";
import Cancel from "../pages/CheckOut/Cancel";
import { useUserStore } from "../Store/UserStore";
import { Updateuser } from "../components/moleculas";
import { Usercreate } from "../components/moleculas";
import { UpdateProduct } from "../components/moleculas/ProductInfo/UpdateProduct";

const MyRoutes = () => {
  const userInfo = useUserStore((store) => store.userAuth);
  const isAdmin = userInfo ? userInfo.admin === true : false;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productDetail/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/checkout/success" element={<Success />} />
      <Route path="/checkout/cancel" element={<Cancel />} />

      <Route
        path="/dashboard"
        element={isAdmin ? <DashBoard /> : <Navigate to="/" />}
      />
      <Route
        path="/dashboard/updateuser/:id"
        element={isAdmin ? <Updateuser /> : <Navigate to="/" />}
      />
      <Route
        path="/dashboard/usercreate"
        element={isAdmin ? <Usercreate /> : <Navigate to="/" />}
      />
      <Route
        path="/dashboard/updateproduct/:id"
        element={isAdmin ? <UpdateProduct /> : <Navigate to="/" />}
      />
      <Route
        path="/dashboard/productForm"
        element={isAdmin ? <ProductForm /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default MyRoutes;


