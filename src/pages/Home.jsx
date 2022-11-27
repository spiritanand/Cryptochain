import {
  Col,
  Row,
  Statistic
} from "antd";
import Title from "antd/es/typography/Title.js";
import millify from "millify";
import React from 'react';
import {Link} from "react-router-dom";
import {useGetCryptosQuery} from "../services/cryptoApi.js";
import Cryptocurrencies from "./Cryptocurrencies.jsx";
import News from "./News.jsx";

function Home(props) {
  const {
		  data,
		  isFetching
		} = useGetCryptosQuery(1);
  const globalStats = data?.data.stats;
  
  return (
	<>
	  {!isFetching && data
	   ? (
		 <>
		   <Title level = {2}
				  className = "heading"
		   >Global Stats
		   </Title>
		   <Row>
			 <Col span = {12}>
			   <Statistic title = "Total Cryptocurrencies"
						  value = {millify(globalStats.total)}
			   ></Statistic>
			 </Col>
			 <Col span = {12}>
			   <Statistic title = "Total Exchanges"
						  value = {millify(globalStats.totalExchanges)}
			   ></Statistic>
			 </Col>
			 <Col span = {12}>
			   <Statistic title = "Total Market Cap"
						  value = {millify(globalStats.totalMarketCap)}
			   ></Statistic>
			 </Col>
			 <Col span = {12}>
			   <Statistic title = "Total 24h Volume"
						  value = {millify(globalStats.total24hVolume)}
			   ></Statistic>
			 </Col>
			 <Col span = {12}>
			   <Statistic title = "Total Markets"
						  value = {millify(globalStats.totalMarkets)}
			   ></Statistic>
			 </Col>
		   </Row>
		  
		   <div className = "home-heading-container">
			 <Title level = {2}
					className = "home-title"
			 >Top 10 Cryptocurrencies in the World</Title>
			 <Title level = {3}
					className = "show-more"
			 >
			   <Link to = "/cryptocurrencies">
				 Show more
			   </Link>
			 </Title>
		   </div>
		   <Cryptocurrencies simplified = {true}></Cryptocurrencies>
		  
		   <div className = "home-heading-container">
			 <Title level = {2}
					className = "home-title"
			 >Crypto News</Title>
			 <Title level = {3}
					className = "show-more"
			 >
			   <Link to = "/news">
				 Show more
			   </Link>
			 </Title>
		   </div>
		   <News simplified={true}></News>
		 </>
	   )
	   : (
		 <h1>Loading...</h1>
	   )}
	</>
  );
}

export default Home;