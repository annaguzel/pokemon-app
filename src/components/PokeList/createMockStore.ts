import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../../services/pokemonAPI';

const createMockStore = (initialState: any) =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: (state = initialState, action) => state,
    },
  });

export default createMockStore;
