import { userReducerAdapter } from "@/main/adapters/user-reducer-adapter";
import SignInRoutes from "./sign-in";
import SignedInRoutes from "./signed-in";

export default function Routes() {
  const { user } = userReducerAdapter();

  return user.id !== 0 ? <SignedInRoutes /> : <SignInRoutes />;
}
