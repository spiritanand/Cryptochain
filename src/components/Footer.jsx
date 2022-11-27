import {
  Avatar,
  Space,
  Typography
} from "antd";
import React from 'react';
import {Link} from "react-router-dom";
import github from "../images/github.png"

function Footer(props) {
  return (
	<>
	  <Typography.Title level = {5}
						style = {{
						  color    : 'white',
						  textAlign: 'center'
						}}
	  >Made with ♥️
	  </Typography.Title>
	  <a href = "https://github.com/spiritmonster/Cryptochain">
		<Avatar src = {github}
		>
		</Avatar>
	  </a>
	  <Space>
		<Link to = "/">Home</Link>
		<Link to = "/exchanges">Exchanges</Link>
		<Link to = "/news">News</Link>
	  </Space>
	</>
  );
}

export default Footer;