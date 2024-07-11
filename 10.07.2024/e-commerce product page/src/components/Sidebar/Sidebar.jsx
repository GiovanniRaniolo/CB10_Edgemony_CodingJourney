import React, { useState } from "react";
import style from "./Sidebar.module.css";
import Button from "../button/Button";
import Counter from "../counter/Counter";
import IconCart from "../icons/IconCart";

function Sidebar() {
  const [count, setCount] = useState(0);

  const handleCountChange = (newCount) => {
    setCount(newCount);
  };

  const handleSendToCart = () => {
    console.log(`Inviato al carrello: ${count}`);
  };

  return (
    <div className={style.sidebar}>
      <h3>SNEAKER COMPANY</h3>
      <h1>Fall Limited Edition Sneakers</h1>
      <p>
        These low-profile sneakers are your perfect casual wear companion.
        Featuring a durable outer rubber sole, they'll withstand everything the
        weather can offer.
      </p>
      <h2>
        $125,00<span>50%</span>
      </h2>
      <p className={style.fullPrice}>$250.00</p>
      <div className={style.actions}>
        <Counter onCountChange={handleCountChange} />
        <Button onClick={handleSendToCart} text={`Add to cart`}>
          <IconCart fill="#000" />
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
