import { Eye, EyeOff } from "lucide-react";
import { useLoginController } from "./useLoginController";
import { useLoginControllerDI } from "./types";
import * as Input from "@/presentation/components/Input";
import { Button } from "@/presentation/components/Button";
import "./styles.scss";

export function Login({
  remoteAuthentication,
  remoteUserData,
  storage,
}: useLoginControllerDI) {
  const {
    visibilePassword,
    setVisiblePassword,
    onHandleLogin,
    form: {
      register,
      handleSubmit,
      formState: { isSubmitting, errors },
    },
  } = useLoginController({
    remoteAuthentication,
    remoteUserData,
    storage,
  });

  return (
    <div className="row container-fluid min-vh-100 p-0 m-0 overflow-hidden ">
      <div className="col col-lg-6 d-lg-flex align-items-end justify-content-center  d-none left-container">
        <img
          src="https://www.bevioficial.com.br/image/organisms/sec-product/image-02.png"
          className="d-inline-block align-top"
        />
      </div>
      <div className="col col-lg-6 d-flex flex-column  justify-content-between  p-5">
        <img
          src="https://www.bevioficial.com.br/_next/static/media/bevi-default-m.da7ba5cc.svg"
          width="130"
          height="70"
          className="d-inline-block align-top"
          alt=""
        />

        <div>
          <h1 className="text-dark">Credenciais de acesso</h1>
          <span>Bem-vindo(a) ao Portal de Produtos da Bevi.</span>

          <form
            className="d-flex flex-column mt-5"
            onSubmit={handleSubmit(onHandleLogin)}
          >
            <Input.Root error={errors.email?.message}>
              <Input.Control
                type="email"
                placeholder="Usuario"
                {...register("email")}
              />
            </Input.Root>

            <Input.Root error={errors.password?.message} className="mt-5">
              <Input.Control
                type={visibilePassword ? "password" : "text"}
                placeholder="Senha"
                {...register("password")}
              />
              <Input.Prefix>
                <span onClick={() => setVisiblePassword(!visibilePassword)}>
                  {visibilePassword ? <Eye /> : <EyeOff />}
                </span>
              </Input.Prefix>
            </Input.Root>

            <Button loading={isSubmitting} className="mt-5">
              <span>Efetuar Login</span>
            </Button>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
}
