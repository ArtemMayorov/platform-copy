import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { userRegistration, userAuthorization, getCurrentUser, updateUser } from 'Services/ServicesUser';
// import { getArticlesList, getArticle } from 'Services/ServiceArticles';

// регистрация пользователя
export const fetchUserRegistration = createAsyncThunk(
  'user/fetchUserRegistration',
  async (newUserData, { rejectWithValue }) => {
    try {
      const res = await userRegistration(newUserData);
      return res;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// авторизация пользователя
export const fetchUserAuthorization = createAsyncThunk(
  'user/fetchUserAuthorization',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await userAuthorization(userData);
      return res;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// получаем авторизованого пользователя
export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const res = await getCurrentUser();
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});
// обновляем пользователя
export const fetchUpdateUser = createAsyncThunk(
  'user/fetchUpdateUser',
  async ({ newUserData }, { rejectWithValue }) => {
    try {
      const res = await updateUser({ newUserData });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
// export const fetchUpdateUser = createAsyncThunk(
//   'user/fetchUpdateUser',
//   async ({ token, newUserData }, { rejectWithValue }) => {
//     try {
//       const res = await updateUser({ token, newUserData });
//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response);
//     }
//   }
// );

const initialState = {
  loading: false,
  error: false,
  userRegistrationData: [],
  userAuthorizationData: [],
  userAuthorizationStatus: false,
  token: null,
  requestStatus: null,
  formErrors: {
    emailError: null,
    usernameError: null,
    passwordError: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.userAuthorizationStatus = false;
      state.token = null;
    },
    deleteRequestStatus: (state) => {
      state.requestStatus = null;
      state.formErrors.emailError = null;
      state.formErrors.usernameError = null;
      state.formErrors.passwordError = null;
    },
  },
  extraReducers: {
    [fetchUserRegistration.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.formErrors.emailError = null;
      state.formErrors.usernameError = null;
    },
    [fetchUserRegistration.fulfilled]: (state, action) => {
      state.loading = false;
      state.userRegistrationData = action.payload;
      state.requestStatus = 'successfully';
    },
    [fetchUserRegistration.rejected]: (state, action) => {
      if (action.payload.status === 422) {
        if (action.payload.data?.errors?.email) {
          state.formErrors.emailError = true;
        }
        if (action.payload.data?.errors?.username) {
          state.formErrors.usernameError = true;
        }

        state.requestStatus = 'unauthorized';
      }
      state.error = true;
      state.loading = false;
    },
    [fetchUserAuthorization.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.formErrors.emailError = null;
      state.formErrors.usernameError = null;
    },
    [fetchUserAuthorization.fulfilled]: (state, action) => {
      state.loading = false;
      state.userAuthorizationStatus = true;
      state.userAuthorizationData = action.payload.user;
      state.token = action.payload.user.token;
      state.requestStatus = 'successfully';
      state.formErrors.emailError = null;
      state.formErrors.usernameError = null;
    },
    [fetchUserAuthorization.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      if (action.payload.status === 422) {
        if (action.payload.data?.errors?.['email or password']) {
          state.formErrors.emailError = true;
          state.formErrors.passwordError = true;
        }
        state.requestStatus = 'unauthorized';
      }
    },
    [fetchCurrentUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userAuthorizationStatus = true;
      state.userAuthorizationData = action.payload.user;
      state.token = action.payload.user.token;
    },
    [fetchCurrentUser.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
    [fetchUpdateUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.formErrors.emailError = null;
      state.formErrors.usernameError = null;
    },
    [fetchUpdateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.userAuthorizationData = action.payload.user;
      state.requestStatus = 'successfully';
      state.formErrors.usernameError = null;
      state.formErrors.emailError = null;
    },
    [fetchUpdateUser.rejected]: (state, action) => {
      state.error = true;
      state.loading = false;
      if (action.payload.status === 422) {
        if (action.payload.data?.errors?.email) {
          state.formErrors.emailError = true;
        }
        if (action.payload.data?.errors?.username) {
          state.formErrors.usernameError = true;
        }
        state.requestStatus = 'unauthorized';
      }
    },
  },
});
export const { logOut, deleteRequestStatus } = userSlice.actions;
export default userSlice.reducer;
