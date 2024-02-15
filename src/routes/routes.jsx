import { Route, Routes } from "react-router-dom";
import { Home, ProductForm, ProductDetail, Login, DashBoard} from "../pages/index";
import Cart from "../pages/Cart/Cart"
import CheckOut from "../pages/CheckOut/CheckOut";
import Success from "../pages/CheckOut/Success";
import Cancel from "../pages/CheckOut/Cancel";

// /src/pages/index.js

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productForm" element={<ProductForm />} />
      <Route path="/productDetail/:id" element={<ProductDetail/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/login" element={<Login />}/>
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/checkout/success" element={<Success />} />
      <Route path="/checkout/cancel" element={<Cancel />} />
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  );
};

export default MyRoutes;