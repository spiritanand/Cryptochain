import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

const headers = {
  'X-RapidAPI-Key' : import.meta.env.VITE_RAPID_API_KEY,
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => (
  {
	url,
	headers,
  }
);

export const cryptoApi = createApi({
  reducerPath: "cryptoApi", // the name of the api
  baseQuery  : fetchBaseQuery({baseUrl}),
  endpoints  : build => (
	{
	  getCryptos      : build.query({
		query: (count) =>
		  createRequest(`/coins?limit=${count}`),
	  }),
	  getCryptoDetails: build.query({
		query: (uuid) =>
		  createRequest(`/coin/${uuid}`),
	  }),
	  getCryptoHistory: build.query({
		query: ({
				  coinId,
				  timePeriod
				}) =>
		  createRequest(
			`/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`),
	  }),
	}
  )
});

export const {
			   useGetCryptosQuery,
			   useGetCryptoDetailsQuery,
			   useGetCryptoHistoryQuery,
			 } = cryptoApi;