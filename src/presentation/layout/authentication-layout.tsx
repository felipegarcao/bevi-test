import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";


export function AuthenticationLayout() {

  return (
    <>
      <Header />

      <main className="container-app">
        <Outlet />
      </main>
    </>
  );
}
