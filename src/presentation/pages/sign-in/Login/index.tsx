import { Eye, EyeOff } from "lucide-react";
import { useLoginController } from "./useLoginController";
import { useLoginControllerDI } from "./types";

export function Login({ service, storage }: useLoginControllerDI) {
  const {
    visibilePassword,
    setVisiblePassword,
    onHandleLogin,
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
  } = useLoginController({
    service,
    storage,
  });

  return (
    <div className="row container-fluid min-vh-100 p-0 m-0">
      <div className="col bg-black col-lg-6">{/* Alguma Imagem */}</div>
      <div className="col col-lg-6 d-flex flex-column  justify-content-center  p-5">
        <h1 className="text-dark">Login</h1>
        <form
          className="d-flex flex-column gap-5 mt-5"
          onSubmit={handleSubmit(onHandleLogin)}
        >
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              placeholder="Usuario"
              {...register("email")}
            />
          </div>
          <div className="input-group">
            <input
              type={visibilePassword ? "text" : "password"}
              className="form-control"
              placeholder="Senha"
              {...register("password")}
            />
            <div className="input-group-append">
              <button
                className="input-group-text"
                onClick={() => setVisiblePassword(!visibilePassword)}
                type="button"
              >
                {visibilePassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>
          <button className="btn btn-dark" type="submit">
            Efetuar Login
          </button>
        </form>
      </div>
    </div>
  );
}
