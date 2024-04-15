import { useState } from "react";
import { useLoginControllerDI } from "./types";
import { useNavigate } from "react-router-dom";
import { Authentication } from "../../../../domain/usecases/remote/remote-authentication";
import { DomainAuthenticationToken } from "../../../../domain/models/authentication-token";
import { userReducerAdapter } from "../../../../main/adapters/user-reducer-adapter";
import { toast } from "react-toastify";
import { UnauthorizedError } from "../../../../domain/errors/unathorizedError";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserBodySchema } from "./validation";

export function useLoginController({ service, storage }: useLoginControllerDI) {
  const [visibilePassword, setVisiblePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setUser, logout } = userReducerAdapter();

  const form = useForm<Authentication.Params>({
    resolver: zodResolver(LoginUserBodySchema),
  });

  const onHandleLogin: SubmitHandler<Authentication.Params> = async (
    params: Authentication.Params
  ) => {
    setLoading(true);

    try {
      const responseUser = await service.auth(params);
      storage.set("BeviToken", {
        token: responseUser.access_token,
      });

      // await service.auth()

      const user: DomainAuthenticationToken = responseUser;
      setUser(user);
    } catch (error: any) {
      toast.error(error.message);

      if (error instanceof UnauthorizedError) {
        toast.error(error.message);

        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    visibilePassword,
    setVisiblePassword,
    loading,
    onHandleLogin,
    navigate,
    form,
  };
}
