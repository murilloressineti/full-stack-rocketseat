import { Routes, Route } from "react-router";

import { Home } from "../pages/Home";
import { Products } from "../pages/Products";
import { Details } from "../pages/Details";
import { Layout } from "../components/Layout";

import { NotFound } from "../pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" index element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Route>

      <Route path="/details/:id" element={<Details />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
