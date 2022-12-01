import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Col,
  Row,
  Select
} from "antd";
import Title from "antd/es/typography/Title.js";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import CryptoLineChart from "../components/CryptoLineChart.jsx";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery
} from "../services/cryptoApi.js";

function CryptoDetail(props) {
  const {coinId} = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const {
		  data      : cryptoDetail,
		  isFetching: isFetchingDetails
		} = useGetCryptoDetailsQuery(coinId);
  const {
		  data      : coinHistory,
		  isFetching: isFetchingHistory
		} = useGetCryptoHistoryQuery({
	coinId,
	timePeriod
  });
  
  const coinData = cryptoDetail?.data?.coin;
  
  const time = [
	"3h",
	"24h",
	"7d",
	"30d",
	"3m",
	"1y",
	"3y",
	"5y"
  ];
  
  const stats = [
	{
	  title: "Price to USD",
	  value: `$ ${coinData?.price && millify(coinData?.price)}`,
	  icon : <DollarCircleOutlined/>
	},
	{
	  title: "Rank",
	  value: coinData?.rank,
	  icon : <NumberOutlined/>
	},
	{
	  title: "24h Volume",
	  value: `$ ${coinData?.["24hVolume"] && millify(coinData?.["24hVolume"])}`,
	  icon : <ThunderboltOutlined/>
	},
	{
	  title: "Market Cap",
	  value: `$ ${coinData?.marketCap && millify(coinData?.marketCap)}`,
	  icon : <DollarCircleOutlined/>
	},
	{
	  title: "All-time-high(daily avg.)",
	  value: `$ ${coinData?.allTimeHigh?.price && millify(
		coinData?.allTimeHigh?.price)}`,
	  icon : <TrophyOutlined/>
	},
	{
	  title: "Approved Supply",
	  value: coinData?.supply?.confirmed
			 ? <CheckOutlined/>
			 : <StopOutlined/>,
	  icon : <ExclamationCircleOutlined/>
	},
	{
	  title: "Total Supply",
	  value: `${coinData?.supply?.total && millify(coinData?.supply?.total)}`,
	  icon : <ExclamationCircleOutlined/>
	},
	{
	  title: "Circulating Supply",
	  value: `${coinData?.supply?.circulating && millify(
		coinData?.supply?.circulating)}`,
	  icon : <ExclamationCircleOutlined/>
	},
  ];
  
  return (
	<>
	  {!isFetchingDetails && !isFetchingHistory && coinData && coinHistory
	   ?
	   (
		 <>
		   <Col className = "coin-detail-container">
			 <Col className = "coin-heading-container">
			   <Title level = {2}
					  className = "coin-name"
			   >
				 <a href = {coinData.websiteUrl}
					target = "_blank"
					rel = "noreferrer"
				 >
				   <Avatar src = {coinData.iconUrl}></Avatar>
				   {coinData.name}
				 </a> Price
			   </Title>
			   <p>
				 {coinData.name} live prices in USD. View statistics, market cap and more.
			   </p>
			 </Col>
		   </Col>
		  
		   <Select value = {timePeriod}
				   className = "select-timeperiod"
				   placeholder = "Select Time Period"
				   onChange = {(value) => setTimePeriod(value)}
		   >
			 {time.map(t => (
			   <Select.Option key = {t}
							  children = {t}
			   />
			 ))}
		   </Select>
		  
		   <CryptoLineChart coinHistory = {coinHistory}
							currentPrice = {millify(coinData.price)}
							coinName = {coinData.name}
		   ></CryptoLineChart>
		  
		   <Col className = "stats-container">
			 <Col className = "coin-value-statistics">
			   <Col className = "coin-value-statistics-heading">
				 <Title level = {3}
						className = "coin-detail-heading"
				 >
				   {coinData.name} Value Statistics
				 </Title>
				 <p>An overview of stats of {coinData.name}</p>
			   </Col>
			   {stats.map(({
							 icon,
							 title,
							 value
						   }) => (
				 <Col className = "coin-stats"
					  key = {title}
				 >
				   <Col className = "coin-stats-name">
					 {icon}
					 <p>{title}</p>
				   </Col>
				   <p className = "stats">{value}</p>
				 </Col>
			   ))}
			 </Col>
			
			 <Col className = "coin-desc-link">
			   <Row className = "coin-desc">
				 <Title className = "coin-detail-heading">
				   What is <a href = {coinData.websiteUrl}>{coinData.name}</a> ?
				 </Title>
				 {HTMLReactParser(coinData.description)}
			   </Row>
			 </Col>
		   </Col>
		  
		   <Col className = "coin-links">
			 <Title level = {3}
					className = "coin-detail-heading"
			 >{coinData.name} Links</Title>
			 {coinData.links?.map((link, index) => (
			   <Row className = "coin-link"
					key = {`${link.name}${index}`}
			   >
				 <Title level = {5}
						className = "link-name"
				 >{link.type}</Title>
				 <a href = {link.url}
					target = "_blank"
					rel = "noreferrer"
				 >{link.name}</a>
			   </Row>
			 ))}
		   </Col>
		 </>
	   )
	   : (
		 <h1>Loading...</h1>
	   )}
	</>
  );
}

export default CryptoDetail;