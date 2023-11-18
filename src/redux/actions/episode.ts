import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Episode } from '../types/episode';

export const EpisodeApi = createApi({
  reducerPath: 'episodeApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_HOST }),
  tagTypes: ['Episodes'],
  endpoints: (builder) => ({
    getEpisodes: builder.query<Episode | Episode[], { episodes: string[] | undefined }>({
      query: ({ episodes }) => {
        if (!episodes) {
          return '';
        }
        const ids = episodes?.map((episode) => episode?.split('/').pop()).join(',');
        return `/episode/${ids}`;
      },
      transformResponse: (response: Episode | Episode[]) => {
        if (Array.isArray(response)) {
          return response;
        }
        return [response];
      },
      providesTags: ['Episodes'],
    }),
  }),
});

export const { useGetEpisodesQuery, useLazyGetEpisodesQuery } = EpisodeApi;
