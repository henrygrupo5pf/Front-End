import { Route, Routes } from "react-router-dom";
import { Home, ProductForm, ProductDetail, Login} from "../pages/index";
import Cart from "../pages/Cart/Cart"
// /src/pages/index.js

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productForm" element={<ProductForm />} />
      <Route path="/productDetail/:id" element={<ProductDetail/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default MyRoutes;