import { Route, Routes } from "react-router-dom";
import { Login } from "../../../presentation/pages/sign-in/Login";


export default function SignInRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

    </Routes>
  )
}