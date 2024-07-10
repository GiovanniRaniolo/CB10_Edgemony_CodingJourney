import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import style from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={style.layout}>
      <Header />
      <main className={style.mainContent}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
