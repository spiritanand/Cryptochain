import {
  Col,
  Row
} from "antd";
import Title from "antd/es/typography/Title.js";
import React from 'react';
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis
} from "recharts";

function CryptoLineChart({
						   coinHistory,
						   currentPrice,
						   coinName
						 }) {
  const coinPriceData = [];
  
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
	coinPriceData.push({
	  ["Coin Price"]: Number(coinHistory?.data?.history[i].price),
	  // label         : new Date(coinHistory?.data?.history[i].timestamp),
	})
  }
  
  return (
	<>
	  <Row className = "chart-header">
		<Title level = {2}
			   className = "chart-title"
		>{coinName} Price Chart (in $) </Title>
		<Col className = "price-container">
		  <Title level = {5}
				 className = "price-change"
		  >Change: {coinHistory?.data?.change}%</Title>
		  <Title level = {5}
				 className = "current-price"
		  >Current {coinName} Price: $ {currentPrice}</Title>
		</Col>
	  </Row>
	  
	  <ResponsiveContainer width = "100%"
						   height = {350}
	  >
		<LineChart width = "100%"
				   height = {350}
				   data = {coinPriceData}
		>
		  <YAxis type = "number"
				 dataKey = "Coin Price"
		  />
		  <Tooltip/>
		  <Legend/>
		  <Line type = "monotone"
				dataKey = "Coin Price"
				stroke = "#0071bd"
				isAnimationActive = {true}
				connectNulls = {true}
				dot = {{strokeWidth: 2}}
		  />
		</LineChart>
	  </ResponsiveContainer>
	</>
  )
}

export default CryptoLineChart;
