import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../interfaces/IUser"

interface UserState {
  user: IUser | null,
}

const initialState: UserState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload
    }
  }
})

export default userSlice.reducer
