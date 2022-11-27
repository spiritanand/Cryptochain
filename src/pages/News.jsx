import {
  Avatar,
  Card,
  Col,
  Row,
  Select
} from "antd";
import Title from "antd/es/typography/Title.js";
import moment from "moment";
import React, {useState} from 'react';
import {useGetCryptosQuery} from "../services/cryptoApi.js";
import {useGetCryptoNewsQuery} from "../services/cryptoNewsApi.js";

function News({simplified}) {
  const [newsCategory, setNewsCategory] = useState("cryptocurrency");
  const {
		  data: cryptoNews,
		  isFetching
		} = useGetCryptoNewsQuery({
	newsCategory,
	count: simplified
		   ? 6
		   : 20,
  });
  const {data: cryptos} = useGetCryptosQuery(100);
  
  const stockCryptoUrl = "https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&w=100";
  const stockNewsUrl = "https://images.unsplash.com/photo-1529362487499-b149087a4f62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&q=80"
  
  return (
	<>{!isFetching && cryptoNews
	   ?
	   (
		 <>
		   {!simplified && (
			 <Col span = {24}>
			   <Select showSearch
					   className = "select-news"
					   placeholder = "Select a Cryptocurrency"
					   optionFilterProp = "children"
					   onChange = {value => setNewsCategory(value)}
			   >
				 <Select.Option value = "Cryptocurrency">
				   <Avatar src = {stockCryptoUrl}
						   alt = "crypto-img"
						   style = {{
							 marginRight: "0.4rem",
						   }}
				   ></Avatar>
				   Cryptocurrency
				 </Select.Option>
				 {cryptos?.data?.coins.map(coin => (
				   <Select.Option value = {coin.name}
								  key = {coin.name}
				   >
					 <Avatar src = {coin.iconUrl}
							 alt = "crypto-img"
							 style = {{
							   marginRight: "0.4rem",
							 }}
					 ></Avatar>
					 {coin.name}
				   </Select.Option>
				 ))}
			   </Select>
		  
			 </Col>
		   )}
		   <Row gutter = {[
			 24,
			 24
		   ]}
		   >
			 {cryptoNews.value.map(news => (
			   <Col xs = {24}
					sm = {12}
					lg = {6}
					key = {news.name}
			   >
				 <Card hoverable
					   className = "news-card"
				 >
				   <a href = {news.url}
					  target = "_blank"
					  rel = "noreferrer"
				   >
					 <div className = "news-image-container">
					   <Title className = "news-title"
							  level = {4}
					   >
						 {news.name}
					   </Title>
					   <img src = {news?.image?.thumbnail?.contentUrl || stockCryptoUrl}
							alt = ""
					   />
					   <p>
						 {`${news.description.slice(0, 100)}...`}
					   </p>
					 </div>
					 <div className = "provider-container">
					   <div className = "provider-details">
						 <Avatar src = {news.provider[0]?.image?.thumbnail.contentUrl
										|| stockNewsUrl}
								 alt = "news"
						 ></Avatar>
						 <p className = "provider-name">{news.provider[0]?.name}</p>
					   </div>
					   <div className = "provider-time">
						 <p>{moment(news.datePublished)
						   .startOf("ss")
						   .fromNow()}</p>
					   </div>
					 </div>
				   </a>
				 </Card>
			   </Col>
			 ))}
		   </Row>
		 </>
	   )
	   : (
		 <h1>Loading...</h1>
	   )
	}
	</>
  );
}

export default News;