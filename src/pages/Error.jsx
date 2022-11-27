import {Button} from "antd";
import React from 'react';
import {Link} from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import img404 from "../images/404.webp"

function Error(props) {
  return (
	<>
	  <div className = "navbar">
		<Navbar></Navbar>
	  </div>
	  <div className = "main">
		<div className = "error">
		  <h1>
			<span>Oops!</span> This is awkward... You are looking for something that does
							   not actually exist.
		  </h1>
		  <img src = {img404}
			   alt = "404 error image"
		  />
		  <Button>
			<Link to = "/">
			  Take me home
			</Link>
		  </Button>
		</div>
		<div className = "footer">
		  <Footer></Footer>
		</div>
	  </div>
	</>
  );
}

export default Error;