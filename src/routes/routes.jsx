import { Route, Routes } from "react-router-dom";
import { Home, ProductDetail, Login, DashBoard, ProductForm } from "../pages/index";
import Cart from "../pages/Cart/Cart"
import CheckOut from "../pages/CheckOut/CheckOut";
import Success from "../pages/CheckOut/Success";
import Cancel from "../pages/CheckOut/Cancel";
import { useUserStore } from "../Store/UserStore";
import { Updateuser } from "../components/moleculas";
import { Usercreate } from "../components/moleculas";
import { UpdateProduct } from "../components/moleculas/ProductInfo/UpdateProduct";


const MyRoutes = () => {
  const {userAuth} = useUserStore()
  const isAdmin = userAuth && userAuth.admin === true;
 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productDetail/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkout" element={<CheckOut />} />
      <Route path="/checkout/success" element={<Success />} />
      <Route path="/checkout/cancel" element={<Cancel />} />
      {isAdmin && (
        <>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/dashboard/updateuser/:id" element={<Updateuser />} />
          <Route path="/dashboard/usercreate" element={<Usercreate />} />
          <Route path="/dashboard/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/dashboard/productForm" element={<ProductForm />} />
        </>
      )}
    </Routes>
  );
};

export default MyRoutes;



