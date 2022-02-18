import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/dashboard/index";
import Home from "../pages/Home";
import Products from "../pages/Products";
import { RequireAuth } from "../components/RequireAuth";
import { Login } from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />

      <Route path="products" element={<Products />} />
    </Routes>
  );
};

export default AppRoutes;
