import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/dashboard/index";
import Home from "../pages/dashboard/Home";
import { Products } from "../pages/dashboard/Products";
import { RequireAuth } from "../components/RequireAuth";
import { Login } from "../pages/Login";
import { NewProduct } from "@/pages/dashboard/NewProduct";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/dashboard" />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="create" element={<NewProduct />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
