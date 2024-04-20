import { useDispatch } from "react-redux";
import { DomainUser } from "@/domain/models/user";
import { useStoreSelector } from "@/presentation/hooks/useStoreSelector";
import { useNavigate } from "react-router-dom";
import {
  clearCurrentUser,
  setCurrentUser,
} from "@/infra/redux-store/reducers/authentication-user-reducer";

export function userReducerAdapter() {
  const dispatch = useDispatch();
  const user: DomainUser = useStoreSelector(
    (state) => state.persistedReducers.user
  );
  const navigate = useNavigate();

  function setUser(userData: DomainUser) {
    dispatch(setCurrentUser(userData));
  }

  function logout() {
    dispatch(clearCurrentUser());
    localStorage.clear()
    navigate("/");
  }

  return {
    setUser,
    logout,
    user,
  };
}
