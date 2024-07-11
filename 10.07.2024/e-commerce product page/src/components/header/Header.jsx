import React from "react";
import style from "./Header.module.css";
import logo from "../../assets/images/logo.svg";
import IconCart from "../../assets/images/icon-cart.svg";
import avatar from "../../assets/images/image-avatar.png";

function Header() {
  return (
    <header>
      <div className={style.logomenu}>
        <img src={logo} alt="logo" />
        <ul>
          <li>Collections</li>
          <li>Men</li>
          <li>Women</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className={style.cartuser}>
        <img src={IconCart} alt="cart icon" width="20px" height="20px" />
        <img className={style.avatar} src={avatar} alt="avatar" />
      </div>
    </header>
  );
}

export default Header;
