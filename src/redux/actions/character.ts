import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, CharacterFilter } from '../types/character';
import { PaginateResponse } from '../types/common';

export const CharacterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_HOST }),
  tagTypes: ['Characters'],
  endpoints: (builder) => ({
    getCharacters: builder.query<PaginateResponse<Character[]>, CharacterFilter>({
      query: ({ name, page }) => ({
        url: `character?name=${name}&page=${page ?? 1}`,
      }),
      providesTags: ['Characters'],
    }),
    getCharacter: builder.query<Character, { id: string }>({
      query: ({ id }) => `character/${id}`,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(CharacterApi.util.resetApiState());
        }
      },
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterQuery } = CharacterApi;
