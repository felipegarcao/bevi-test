import { Route, Routes } from "react-router-dom";
import { AuthenticationLayout } from "../../../presentation/layout/authentication-layout";
import { MakeListProductScreen } from "../../factories/pages/signed-in/list-products-factory";

export default function SignedInRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthenticationLayout />}>
        <Route path="/" element={<MakeListProductScreen />} />
      </Route>
    </Routes>
  );
}
