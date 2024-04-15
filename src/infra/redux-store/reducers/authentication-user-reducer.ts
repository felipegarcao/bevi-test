import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DomainUser } from "../../../domain/models/user";

const initialState: DomainUser = {
  id: 0,
  name: '',
  email: '',
  email_verified_at: false,
  updated_at: '',
  created_at: ''
}

const userSlice = createSlice({
  name: 'authentication-user',
  initialState,
  reducers: {
    setCurrentUser: (_, action: PayloadAction<DomainUser>) => {
      return action.payload
    },
    clearCurrentUser: () => {
      return initialState;
    }
  }
})

export const {clearCurrentUser, setCurrentUser} = userSlice.actions;

export default userSlice.reducer;