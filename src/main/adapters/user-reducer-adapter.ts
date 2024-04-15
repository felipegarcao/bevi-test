import { useDispatch } from "react-redux";
import { DomainUser } from "../../domain/models/user";
import { useStoreSelector } from "../../presentation/hooks/useStoreSelector";
import { useNavigate } from "react-router-dom";
import {
  clearCurrentUser,
  setCurrentUser,
} from "../../infra/redux-store/reducers/authentication-user-reducer";
import { LocalStorageCache } from "../../infra/storage/local-storage";

export function userReducerAdapter() {
  const storage = new LocalStorageCache()
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
    storage.set('BeviToken')
    navigate("/");
  }

  return {
    setUser,
    logout,
    user,
  };
}
