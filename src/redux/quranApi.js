import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quranApi = createApi({
  reducerPath: "HolyQuran",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.alquran.cloud/v1/",
  }),
  endpoints: (build) => ({
    getCompleteQuran: build.query({
      query: (JuzNo) => `juz/${JuzNo}/quran-uthmani`,
    }),
  }),
});

export const { useGetCompleteQuranQuery } = quranApi;
