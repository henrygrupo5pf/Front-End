import { Route, Routes } from "react-router-dom";
import { Home, ProductForm, ProductDetail} from "../pages/index";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productForm" element={<ProductForm />} />
      <Route path="/productDetail/:id" element={<ProductDetail/>} />
    </Routes>
  );
};

export default MyRoutes;
