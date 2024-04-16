import { Route, Routes } from "react-router-dom";
import { MakeLoginScreen } from "@/main/factories/pages/sign-in/login-factory";


export default function SignInRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MakeLoginScreen />} />

    </Routes>
  )
}