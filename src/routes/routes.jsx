import { Route, Routes, Navigate } from "react-router-dom";
import { Home, ProductForm, ProductDetail, Login, DashBoard} from "../pages/index";
import Cart from "../pages/Cart/Cart"
import CheckOut from "../pages/CheckOut/CheckOut";
import Success from "../pages/CheckOut/Success";
import Cancel from "../pages/CheckOut/Cancel";
import { Updateuser } from "../components/moleculas";
import { Usercreate } from "../components/moleculas";
import { useUserStore } from "../Store/UserStore";


const MyRoutes = () => {
  const userInfo = useUserStore((store)=> store.userAuth)
  const isAdmin = userInfo && userInfo.user.admin === true;
 
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
      {isAdmin && (
        <>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/dashboard/updateuser/:id" element={<Updateuser />} />
          <Route path="/dashboard/usercreate" element={<Usercreate />} />
        </>
      )}
    </Routes>
  );
};

export default MyRoutes;