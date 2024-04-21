import { userReducerAdapter } from "@/main/adapters/user-reducer-adapter";
import { LogOut } from "lucide-react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import Logo from '/logo.png'

export function Header() {

  const { logout, user } = userReducerAdapter()
  const navigate = useNavigate()

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container mx-auto">
        <Button variant="ghost" className="navbar-brand btn" onClick={() => navigate('/')}>
          <img
            src={Logo}
            width="90"
            height="40"
            className="d-inline-block align-top"
            alt=""
            data-testid="logo"
          />
        </Button>
        <div className="d-flex align-items-center gap-2 justify-content-center">
          <span className="d-md-block d-none">Olá, <strong>{user.name}</strong></span>
          <Button variant="ghost" onClick={logout} data-testid="logout">
            <LogOut className="text-danger" />
          </Button>
        </div>
      </div>
    </nav>
  )
}