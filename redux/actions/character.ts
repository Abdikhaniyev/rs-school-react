import { HYDRATE } from 'next-redux-wrapper';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Character, CharacterFilter } from '../types/character';
import { PaginateResponse } from '../types/common';

export const CharacterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  tagTypes: ['Characters'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCharacters: builder.query<PaginateResponse<Character[]>, CharacterFilter>({
      query: ({ name, page }) => ({
        url: `character?name=${name}&page=${page ?? 1}`,
      }),
      providesTags: ['Characters'],
    }),
    getCharacter: builder.query<Character, { id: string }>({
      query: ({ id }) => `character/${id}`,
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
  useLazyGetCharacterQuery,
  util: { getRunningQueriesThunk },
} = CharacterApi;

export const { getCharacters, getCharacter } = CharacterApi.endpoints;
