import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonListResponse, PokemonDetail } from '../types/pokemon';
import config from '../config';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: config.apiBaseUrl }),
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, void>({
      query: () => 'pokemon?limit=10',
    }),
    getPokemonDetails: builder.query<PokemonDetail, string>({
      query: (url) => url,
    }),
    getAllPokemonDetails: builder.query<PokemonDetail[], void>({
      async queryFn(_, __, ___, baseQuery) {
        const listResult = await baseQuery('pokemon?limit=10');

        if ('error' in listResult) return { error: listResult.error as any };

        const { data } = listResult as { data: PokemonListResponse };

        const detailResults = await Promise.all(
          data.results.map((pokemon) =>
            baseQuery(pokemon.url) as Promise<{ data: PokemonDetail }>
          )
        );

        const detailData = detailResults.map((result) => result.data);
        return { data: detailData };
      },
    }),
    getPokemonById: builder.query<PokemonDetail, number>({
      query: (id) => `pokemon/${id}`,
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetAllPokemonDetailsQuery,
  useGetPokemonByIdQuery,
} = pokemonApi;
