import { useState } from "react";
import { useLoginControllerDI } from "./types";
import { useNavigate } from "react-router-dom";
import { Authentication } from "@/domain/usecases/remote/remote-authentication";
import { userReducerAdapter } from "@/main/adapters/user-reducer-adapter";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserBodySchema } from "./validation";
import { DomainUser } from "@/domain/models/user";
import { toast } from "react-toastify";
import { calculateExpirationTime } from "@/presentation/helpers/verifyDate";

export function useLoginController({
  remoteAuthentication,
  remoteUserData,
  storage,
}: useLoginControllerDI) {
  const [visibilePassword, setVisiblePassword] = useState(true);

  const navigate = useNavigate();

  const { setUser } = userReducerAdapter();

  const form = useForm<Authentication.Params>({
    resolver: zodResolver(LoginUserBodySchema),
  });

  const onHandleLogin: SubmitHandler<Authentication.Params> = async (
    params: Authentication.Params
  ) => {
    try {
      const responseUser = await remoteAuthentication.requestAuth(params);

      storage.set("BeviToken", {
        access_token: responseUser.access_token
      });

      storage.set(
        "expires_token",
        calculateExpirationTime(responseUser.expires_in)
      );


      const userData = await remoteUserData.me();
      const user: DomainUser = userData;

      setUser(user);
    } catch (error) {
      toast.error(error);
    }
  };

  return {
    visibilePassword,
    setVisiblePassword,
    onHandleLogin,
    navigate,
    form,
  };
}
