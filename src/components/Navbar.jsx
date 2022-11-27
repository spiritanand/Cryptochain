import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MenuOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Menu,
  Typography
} from "antd";
import React, {
  useEffect,
  useState
} from 'react';
import {Link} from "react-router-dom";
import icon from "../images/blockchain.png"

function Navbar(props) {
  const [activeMenu, setActiveMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(null);
  const MOBILE_WIDTH = 768;
  
  useEffect(() => {
	const handleResize = () => {
	  setScreenSize(window.innerWidth);
	}
	
	window.addEventListener("resize", handleResize);
	
	handleResize();
	return () => {
	  window.removeEventListener("resize", handleResize);
	};
  }, []);
  
  useEffect(() => {
	if (screenSize < MOBILE_WIDTH)
	  setActiveMenu(false)
	else
	  setActiveMenu(true);
  }, [screenSize]);
  
  
  const menuItems = [
	{
	  label: (
		<Link to = {"/"}>Home</Link>
	  ),
	  key  : 'home',
	  icon : <HomeOutlined/>,
	},
	{
	  label: (
		<Link to = {"/cryptocurrencies"}>Cryptocurrencies</Link>
	  ),
	  key  : 'cryptocurrencies',
	  icon : <FundOutlined/>,
	},
	{
	  label: (
		<Link to = {"/news"}>News</Link>
	  ),
	  key  : 'news',
	  icon : <BulbOutlined/>,
	},
  ]
  
  function handleMenuClick() {
	if (screenSize < MOBILE_WIDTH)
	  setActiveMenu(false);
  }
  
  return (
	<nav className = "nav-container">
	  <div className = "logo-container">
		<Avatar src = {icon}></Avatar>
		<Typography.Title level = {2}
						  className = "logo"
						  style = {{
							margin: 0,
						  }}
		>
		  <Link to = "/">Cryptochain</Link>
		</Typography.Title>
		<Button className = "menu-control-container"
				onClick = {() => setActiveMenu(prevState => !prevState)}
		>
		  <MenuOutlined></MenuOutlined>
		</Button>
	  </div>
	  
	  {activeMenu &&
	   <Menu theme = {"dark"}
			 items = {menuItems}
			 onClick = {handleMenuClick}
	   >
	   </Menu>
	  }
	</nav>
  );
}

export default Navbar;