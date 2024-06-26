import { Eye, EyeOff } from "lucide-react";
import { useLoginController } from "./useLoginController";
import { useLoginControllerDI } from "./types";
import * as Input from "@/presentation/components/Input";
import { Button } from "@/presentation/components/Button";
import "./styles.scss";
import Logo from '/logo.png'

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
          src={Logo}
          width="170"
          height="80"
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
            <label data-testid='Email Address'>
             E-mail
              <Input.Root error={errors.email?.message}>
                <Input.Control
                  type="email"
                  {...register("email")}
                />
              </Input.Root>
            </label>

            <label data-testid="Password" className="my-5">
              Senha
              <Input.Root error={errors.password?.message}>
              <Input.Control
                type={visibilePassword ? "password" : "text"}
                {...register("password")}
              />
              <Input.Prefix>
                <span onClick={() => setVisiblePassword(!visibilePassword)}>
                  {visibilePassword ? <Eye /> : <EyeOff />}
                </span>
              </Input.Prefix>
            </Input.Root>
            </label>

            

            <Button loading={isSubmitting} role="button">
              <span>Efetuar Login</span>
            </Button>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
}
