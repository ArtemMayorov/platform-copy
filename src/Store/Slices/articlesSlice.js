import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getArticlesList, getArticle, createArticle, updateArticle, deleteArticle } from 'Services/ServiceArticles';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (offset, { rejectWithValue }) => {
  try {
    const res = await getArticlesList(offset);
    return res;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchArticle = createAsyncThunk('articles/fetchArticle', async (slug, { rejectWithValue }) => {
  try {
    const res = await getArticle(slug);
    return res.article;
  } catch (err) {
    return rejectWithValue(err);
  }
});
export const fetchCreateArticle = createAsyncThunk(
  'articles/fetchCreateArticle',
  async ({ articleData }, { rejectWithValue }) => {
    try {
      const res = await createArticle(articleData);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchUpdateArticle = createAsyncThunk(
  'articles/fetchUpdateArticle',
  async ({ slug, articleData }, { rejectWithValue }) => {
    try {
      const res = await updateArticle(slug, articleData);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchDeleteArticle = createAsyncThunk(
  'articles/fetchDeleteArticle',
  async ({ slug }, { rejectWithValue }) => {
    try {
      const res = await deleteArticle(slug);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  articlesData: [],
  loading: null,
  error: null,
  currentPage: 1,
  offset: 0,
  currentArticle: null,
  requestStatusNewArticle: null,
  slugArticle: null,
};

export const articlesSlice = createSlice({
  name: 'aticles',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    deleteRequestStatus: (state) => {
      state.requestStatusNewArticle = null;
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.loading = false;
      state.articlesData = action.payload;
    },
    [fetchArticles.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
    [fetchArticle.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentArticle = action.payload;
    },
    [fetchArticle.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
    [fetchCreateArticle.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchCreateArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.slugArticle = action.payload.article.slug;
      state.requestStatusNewArticle = 'successfully';
    },
    [fetchCreateArticle.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
    [fetchUpdateArticle.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUpdateArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.slugArticle = action.payload.article.slug;
      state.requestStatusNewArticle = 'successfully';
    },
    [fetchUpdateArticle.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
    [fetchUpdateArticle.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchUpdateArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.slugArticle = action.payload.article.slug;
      state.requestStatusNewArticle = 'successfully';
    },
    [fetchUpdateArticle.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const { setPage, setOffset, deleteRequestStatus } = articlesSlice.actions;
export default articlesSlice.reducer;
