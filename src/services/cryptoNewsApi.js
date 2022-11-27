import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

const headers = {
  'X-BingApis-SDK' : 'true',
  'X-RapidAPI-Key' : import.meta.env.VITE_RAPID_API_KEY,
  'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => (
  {
	url,
	headers,
  }
);

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery  : fetchBaseQuery({baseUrl}),
  endpoints  : (build) => (
	{
	  getCryptoNews: build.query({
		query: ({
				  newsCategory,
				  count
				}) =>
		  createRequest(
			`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
	  })
	}
  )
});


export const {
			   useGetCryptoNewsQuery,
			 } = cryptoNewsApi;