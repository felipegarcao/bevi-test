import { Outlet, useNavigate } from "react-router-dom";
import { userReducerAdapter } from "@/main/adapters/user-reducer-adapter";
import { LogOut } from "lucide-react";

export function AuthenticationLayout() {

  const { logout, user } = userReducerAdapter()
  const navigate = useNavigate()

  return (
    <>
      <nav className="navbar navbar-light bg-light">

        <div className="container mx-auto">
          <button className="navbar-brand btn" onClick={() => navigate('/')}>
            <img
              src="https://www.bevioficial.com.br/_next/static/media/bevi-default-m.da7ba5cc.svg"
              width="100"
              height="40"
              className="d-inline-block align-top"
              alt=""
            />
          </button>
          <div className="d-flex align-items-center gap-2">
            <span>Olá, <strong>{user.name}</strong></span>
            <button className="btn" onClick={logout}>
              <LogOut className="text-danger" />
            </button>
          </div>
        </div>
      </nav>
      <main className="container-app">
        <Outlet />
      </main>
    </>
  );
}
