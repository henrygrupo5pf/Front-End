import { Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import { Home, ProductForm, ProductDetail, Login} from "../pages/index";
=======
import { Home, ProductForm, ProductDetail} from "../pages/index";
import Cart from "../pages/Cart/Cart"
// /src/pages/index.js

>>>>>>> 8c61d35bb1d929d3d427a634bad9df12f50aaa9f

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productForm" element={<ProductForm />} />
      <Route path="/productDetail/:id" element={<ProductDetail/>} />
<<<<<<< HEAD
      <Route path="/login" element={<Login />} />
=======
      <Route path="/cart" element={<Cart/>} />
>>>>>>> 8c61d35bb1d929d3d427a634bad9df12f50aaa9f
    </Routes>
  );
};

export default MyRoutes;