import { Eye, EyeOff } from "lucide-react"
import { useLoginController } from "./useLoginController"

export function Login() {
  const { visibilePassword, setVisiblePassword } = useLoginController()

  return (
    <div className="row container-fluid min-vh-100 p-0 m-0">
      <div className="col bg-black col-lg-6">
        {/* Alguma Imagem */}  
      </div>
      <div className="col col-lg-6 d-flex flex-column  justify-content-center  p-5">
        <h1 className="text-dark">Login</h1>
        <form className="d-flex flex-column gap-5 mt-5">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Usuario" />
          </div>
          <div className="input-group">
            <input type={visibilePassword ? 'text' : 'password'} className="form-control" placeholder="Senha" />
            <div className="input-group-append">
              <button className="input-group-text" onClick={() => setVisiblePassword(!visibilePassword)} type="button">
                {
                  visibilePassword ? <Eye /> : <EyeOff />
                }
              </button>
            </div>
          </div>
          <button className="btn btn-dark">Efetuar Login</button>
        </form>
      </div>
    </div>
  )
}