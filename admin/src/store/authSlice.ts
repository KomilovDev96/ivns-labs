import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  email: string | null;
  role: string | null;
}

const token = localStorage.getItem('token');
const email = localStorage.getItem('email');
const role = localStorage.getItem('role');

const initialState: AuthState = { token, email, role };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string; email: string; role: string }>) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.role = action.payload.role;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('role', action.payload.role);
    },
    logout(state) {
      state.token = null;
      state.email = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('role');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
