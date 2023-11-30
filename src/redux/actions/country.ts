import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Country {
  name: {
    common: string;
    official: string;
  };
}

export const CountryApi = createApi({
  reducerPath: 'CountryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://restcountries.com/v3.1' }),
  endpoints: (builder) => ({
    getCountries: builder.query<Country[], void>({
      query: () => ({
        url: 'all',
      }),
    }),
  }),
});

export const { useGetCountriesQuery, useLazyGetCountriesQuery } = CountryApi;
