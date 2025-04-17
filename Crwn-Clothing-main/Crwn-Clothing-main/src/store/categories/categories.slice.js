import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utility';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const categoriesArray = await getCategoriesAndDocuments('categories');
    return categoriesArray;
  } catch (error) {
    console.log('Error fetching categories.', error);
  }
});

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: CATEGORIES_INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

const { reducer } = categoriesSlice;

export const categoriesReducer = reducer;
