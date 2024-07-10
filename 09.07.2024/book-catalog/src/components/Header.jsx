// Header.jsx
import React from "react";
import style from "./Header.module.css";
import bookGif from "../assets/books.gif";

const Header = () => {
  return (
    <header className={style.header}>
      <img src={bookGif} alt="book-gif" width="30px" />
      <h1>MyBooks</h1>
    </header>
  );
};

export default Header;
