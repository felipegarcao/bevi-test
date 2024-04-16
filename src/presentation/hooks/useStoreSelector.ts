import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/infra/redux-store/store";

export const useStoreSelector : TypedUseSelectorHook<RootState> = useSelector