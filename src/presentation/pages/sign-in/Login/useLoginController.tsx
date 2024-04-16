import { useState } from "react";
import { useLoginControllerDI } from "./types";
import { useNavigate } from "react-router-dom";
import { Authentication } from "../../../../domain/usecases/remote/remote-authentication";
import { userReducerAdapter } from "../../../../main/adapters/user-reducer-adapter";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserBodySchema } from "./validation";
import { DomainUser } from "../../../../domain/models/user";

export function useLoginController({ remoteAuthentication, remoteUserData, storage }: useLoginControllerDI) {
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
      const responseUser = await remoteAuthentication.auth(params);
      storage.set("BeviToken", {
        access_token: responseUser.access_token,
      });

      const userData = await remoteUserData.me();

      const user: DomainUser = userData;
      setUser(user);
    } catch (error: any) {
      toast.error(error.error);
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
