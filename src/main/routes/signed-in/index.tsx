import { Route, Routes } from "react-router-dom";
import { AuthenticationLayout } from "../../../presentation/layout/authentication-layout";
import { MakeListProductScreen } from "../../factories/pages/signed-in/list-products-factory";
import { MakeCreateProductScreen } from "../../factories/pages/signed-in/create-products-factory";

export default function SignedInRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationLayout />}>
        <Route path="/" element={<MakeListProductScreen />} />
        <Route path="/cadastro" element={<MakeCreateProductScreen />} />
      </Route>
    </Routes>
  );
}
