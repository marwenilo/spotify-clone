import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set(
        'X-RapidAPI-Key',
        '0db37c431bmsh516e1fab51e46a1p1193c4jsnf956fe99e375',
      );
      return headers;
    },
  }),
  endpoints: (builders) => ({
    getTopCharts: builders.query({
      query: () => '/charts/world',
    }),
  }),
});
export const { useGetTopChartsQuery } = shazamCoreApi;
