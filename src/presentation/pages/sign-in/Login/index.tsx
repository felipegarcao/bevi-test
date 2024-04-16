import { Eye, EyeOff } from "lucide-react";
import { useLoginController } from "./useLoginController";
import { useLoginControllerDI } from "./types";
import * as Input from '../../../components/Input'

export function Login({ remoteAuthentication, remoteUserData, storage }: useLoginControllerDI) {
  const {
    visibilePassword,
    setVisiblePassword,
    onHandleLogin,
    loading,
    form: {
      register,
      handleSubmit,
    },
  } = useLoginController({
    remoteAuthentication,
    remoteUserData,
    storage,
  });

  return (
    <div className="row container-fluid min-vh-100 p-0 m-0">
      <div className="col bg-black col-lg-6 d-lg-block d-none">{/* Alguma Imagem */}</div>
      <div className="col col-lg-6 d-flex flex-column  justify-content-center  p-5">
        <h1 className="text-dark">Login</h1>
        <form
          className="d-flex flex-column gap-5 mt-5"
          onSubmit={handleSubmit(onHandleLogin)}
        >

          <Input.Root>
            <Input.Control
              type="email"
              placeholder="Usuario"
              {...register("email")}
            />
          </Input.Root>

          <Input.Root>
            <Input.Control
              type={visibilePassword ? "text" : "password"}
              placeholder="Senha"
              {...register("password")}
            />
            <Input.Prefix>
              <span
                onClick={() => setVisiblePassword(!visibilePassword)}
              >
                {visibilePassword ? <Eye /> : <EyeOff />}
              </span>

            </Input.Prefix>
          </Input.Root>


          <button className="btn btn-dark" type="submit" disabled={loading}>
            {
              loading ? (
                <div className="d-flex flex-column align-items-center justify-content-center gap-2">
                  <div className="spinner-border" role="status"></div>
                </div>
              ) : (
                <span>Efetuar Login</span>
              )
            }
          </button>
        </form>
      </div>
    </div>
  );
}
