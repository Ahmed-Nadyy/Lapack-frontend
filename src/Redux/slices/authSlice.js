import { createSlice } from '@reduxjs/toolkit';
import { authService } from '../../api/services';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setLoading, setError, setUser, setToken, logout } = authSlice.actions;

// Async actions
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await authService.login(credentials);
    dispatch(setToken(response.data.token));
    dispatch(setUser(response.data.user));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Login failed'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await authService.register(userData);
    dispatch(setToken(response.data.token));
    dispatch(setUser(response.data.user));
    dispatch(setError(null));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Registration failed'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const refreshAccessToken = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    if (!token) return;

    const response = await authService.refreshToken(token);
    dispatch(setToken(response.data.token));
  } catch (error) {
    dispatch(setError('Failed to refresh token'));
    dispatch(logout());
  }
};
export default authSlice.reducer;