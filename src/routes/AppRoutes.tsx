import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/index";
import Home from "../pages/dashboard/Home";
import { ProductsPage } from "../pages/dashboard/products";
import { Login } from "../pages/Login";
import { CreateProductPage } from "@/pages/dashboard/products/CreateProductPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/dashboard" />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
