import React from "react";
import Logo from "../img/logo.png";
import blogFooter from "../img/blogFooter.png";

const Footer = () => {
  return (
    <footer>
      <img src={blogFooter} alt="" />
      <span style={{color:"white"}}>
        Created By ➡️(BSH-GROUP)
      </span>
    </footer>
  );
};

export default Footer;
