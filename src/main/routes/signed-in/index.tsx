import { Route, Routes } from "react-router-dom";
import { ListProducts } from "../../../presentation/pages/signed-in/managaments/products/list";


export default function SignedInRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListProducts />} />

    </Routes>
  )
}