import { createSlice } from '@reduxjs/toolkit';

import { FavouritesType } from '../types/types';

const initialFavouritesState: FavouritesType = {};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: initialFavouritesState,
  reducers: {
    toggleFavourites(state: FavouritesType, action) {
      const id = action.payload;
      const isFavourite = state[id];

      if (isFavourite) {
        delete state[id];
      } else {
        state[id] = true;
      }
    },

    deleteAll(state) {
      for (let key in state) {
        delete state[key];
      }
    },

    replaceAll(state, action) {
      state = action.payload;
    },
  },
});

export const favouritesActions = favouritesSlice.actions;

export default favouritesSlice.reducer;
