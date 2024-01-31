import { Route, Routes } from "react-router-dom";
import { Home, ProductForm } from "../pages/index";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productForm" element={<ProductForm />} />
    </Routes>
  );
};

export default MyRoutes;
