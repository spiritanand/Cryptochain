import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import './App.css'
import Cryptocurrencies from "./pages/Cryptocurrencies.jsx";
import CryptoDetail from "./pages/CryptoDetail.jsx";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import News from "./pages/News.jsx";
import RootLayout from "./pages/RootLayout.jsx";

const router = createBrowserRouter(createRoutesFromElements(
  <Route element = {<RootLayout></RootLayout>}
		 errorElement = {<Error></Error>}
  >
	<Route index
		   element = {<Home></Home>}
	></Route>
	<Route path = {"/cryptocurrencies"}
		   element = {<Cryptocurrencies></Cryptocurrencies>}
	></Route>
	<Route path = {"/crypto/:coinId"}
		   element = {<CryptoDetail></CryptoDetail>}
	></Route>
	<Route path = {"/news"}
		   element = {<News></News>}
	></Route>
  </Route>
))

function App(props) {
  return (
	<div className = "app">
	  <RouterProvider router = {router}></RouterProvider>
	</div>
  );
}

export default App;