import { PropsWithChildren } from "react";
import { verifyExpiresToken } from "@/presentation/helpers/verifyDate";
import { userReducerAdapter } from "@/main/adapters/user-reducer-adapter";
import { LocalStorageCache } from "@/infra/storage/local-storage";
import { toast } from "react-toastify";

export function WatchVerifyExpiresToken({ children }: PropsWithChildren) {

  const storage = new LocalStorageCache()

  const expires_token = storage.get("expires_token");
  const token = storage.get("BeviToken");

  const { logout } = userReducerAdapter();

  if (token) {
    if (verifyExpiresToken(new Date(expires_token))) {
      logout();
      toast.error('o seu Token foi expirado ! realize o login novamente.')
    }
  }

  return children;
}
