import { PropsWithChildren } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/infra/redux-store/store";

export function PersistStore({ children }: PropsWithChildren) {
  return (
    <PersistGate persistor={persistor} loading={null}>
      {children}
    </PersistGate>
  );
}
