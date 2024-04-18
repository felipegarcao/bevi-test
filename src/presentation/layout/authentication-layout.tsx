import { Outlet, useNavigate } from "react-router-dom";
import { userReducerAdapter } from "@/main/adapters/user-reducer-adapter";
import { LogOut } from "lucide-react";
import { Button } from "../components/Button";

export function AuthenticationLayout() {

  const { logout, user } = userReducerAdapter()
  const navigate = useNavigate()

  return (
    <>
      <nav className="navbar navbar-light bg-light">

        <div className="container mx-auto">
          <Button variant="ghost" className="navbar-brand btn" onClick={() => navigate('/')}>
            <img
              src="https://www.bevioficial.com.br/_next/static/media/bevi-default-m.da7ba5cc.svg"
              width="70"
              height="40"
              className="d-inline-block align-top"
              alt=""
            />
          </Button>
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <span className="d-md-block d-none">Olá, <strong>{user.name}</strong></span>
            <Button variant="ghost" onClick={logout}>
              <LogOut className="text-danger" />
            </Button>
          </div>
        </div>
      </nav>
      <main className="container-app">
        <Outlet />
      </main>
    </>
  );
}
