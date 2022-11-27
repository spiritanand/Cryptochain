import React from 'react';
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

function RootLayout(props) {
  return (
	<>
	  <div className = "navbar">
		<Navbar></Navbar>
	  </div>
	  <div className = "main">
		<div className = "outlet">
		  <Outlet></Outlet>
		</div>
		<div className = "footer">
		  <Footer></Footer>
		</div>
	  </div>
	</>
  );
}

export default RootLayout;