# E-Commerce Product Page

This technical documentation details the implementation of an e-commerce web application developed as a challenge from [Frontend Mentor](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6/hub). The application utilizes **Vite** as Environment and **React** for its frontend, **CSS Modules** for styling, and **JavaScript** for logic implementation. It features components such as product displays, a shopping cart interface, and interactive UI elements.

![image](./public/screenshoot.png)

## Components

- [App.jsx](#appjsx)
- [Button.jsx](#buttonjsx)
- [Counter.jsx](#counterjsx)
- [Header.jsx](#headerjsx)
- [ProductLightBox.jsx](#productlightboxjsx)
- [ShowBox.jsx](#showboxjsx)
- [Sidebar.jsx](#sidebarjsx)
- [ThumbNail](#thumbnailjsx)
- [Overall](#overall)

### 1. App.jsx

The `App.jsx` component serves as the main container for the application, incorporating the `Header`, `ProductLightBox`, and `Sidebar` components.

This component establishes the overall layout of the application, integrating essential UI elements and facilitating seamless navigation and product interaction.

Inside the App function, it returns a JSX structure that renders the `Header` component, a horizontal rule (`<hr />`), and a `div` with the class name defined in the imported `style` module. Inside this `div`, it renders the `ProductLightBox` and `Sidebar` components. Finally, the `App` component is exported as the default export, allowing it to be imported and used in `main.jsx`.

#### Implementation

```jsx
import React from "react";
import style from "./App.module.css";
import ProductLightBox from "./components/product-lightbox/ProductLightBox";
import Header from "./components/header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Header />
      <hr />
      <div className={style.mainContainer}>
        <ProductLightBox />
        <Sidebar />
      </div>
    </>
  );
}

export default App;
```

### 2. Button.jsx

The `Button.jsx` component provides a reusable button element with customizable text and child components.

This component accepts two props: `children` and `text`. The `children` prop is used to render any additional elements passed to the `Button` component, while the `text` prop allows you to customize the button's text.

Inside the `Button` component, the `classNames` library is used to dynamically apply CSS classes to the button element. The `styles.button` class is imported from the corresponding CSS module file (`Button.module.css`).

The component returns a `<button>` element with the dynamically generated class name and the rendered `children` and `text` props. If no `children` are provided, the `text` prop will be displayed as the button's text. This `Button` component can be used in other parts of your React application to create reusable and customizable button elements.

#### Implementation

```jsx
import classNames from "classnames";
import styles from "./Button.module.css";

function Button({ children, text = "Add to cart" }) {
  return (
    <button className={classNames(styles.button)}>
      {children}
      {text}
    </button>
  );
}

export default Button;
```

### 3. Counter.jsx

The `Counter.jsx` component manages a quantity selector with increment and decrement functionality. It communicates the updated count to its parent component through the `onCountChange` prop.

#### Import statements

- React and `useState` from the React library.
- `styles` from the CSS module file `"./Counter.module.css"`.
- `classNames` from the `"classnames"` library.
- `IconMinus` and `IconPlus` components from their respective files.

#### Counter function component

- Accepts `onCountChange` as a prop.
- Uses the `useState` hook to initialize the `count` state with a value of 0.

#### incrementCount function

- Called when the increment button is clicked.
- Updates the `count` state by incrementing it by 1.
- Calls the `onCountChange` prop with the new count.

#### decrementCount function

- Called when the decrement button is clicked.
- Checks if the count is greater than 0 before decrementing it.
- Updates the `count` state by decrementing it by 1.
- Calls the `onCountChange` prop with the new count.

#### JSX return statement

- Renders a `div` with the class name derived from the `styles.counter` CSS module.
- Contains two buttons and a `div` displaying the current count.
- The decrement button calls the `decrementCount` function when clicked.
- The increment button calls the `incrementCount` function when clicked.

#### Implementation

```jsx
import React, { useState } from "react";
import styles from "./Counter.module.css";
import classNames from "classnames";
import IconMinus from "../icons/IconMinus";
import IconPlus from "../icons/IconPlus";

function Counter({ onCountChange }) {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      onCountChange(newCount);
      return newCount;
    });
  };

  const decrementCount = () => {
    setCount((prevCount) => {
      if (prevCount > 0) {
        const newCount = prevCount - 1;
        onCountChange(newCount);
        return newCount;
      }
      return prevCount;
    });
  };

  return (
    <div className={classNames(styles.counter)}>
      <button onClick={decrementCount}>
        <IconMinus />
      </button>
      <div>{count}</div>
      <button onClick={incrementCount}>
        <IconPlus />
      </button>
    </div>
  );
}

export default Counter;
```

### 4. Header.jsx

The `Header.jsx` component represents the application header with branding, navigation menu, and user information.

Here's a breakdown of the code:

#### Import statements

- **React**: The main React library.
- **style**: CSS module specific to the header component, containing its styles.
- **logo**, **IconCart**, and **avatar**: Imported images for the logo, cart icon, and user avatar, respectively.

#### Function component

- **Header function**: Defined to return the JSX code for the header.

#### JSX code

- The JSX code inside the return statement renders the header:
- `<header>` element wraps the entire header section.
- `<div className={style.logomenu}>` contains the logo and navigation menu.
- `<img src={logo} alt="logo" />` renders the logo image.
- `<ul>` contains the navigation menu items, each `<li>` representing a menu item.
- `<div className={style.cartuser}>` contains the cart icon and user avatar.
- `<img src={IconCart} alt="cart icon" width="20px" height="20px" />` renders the cart icon image.
- `<img className={style.avatar} src={avatar} alt="avatar" />` renders the user avatar image.

#### Implementation

```jsx
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
```

### 5. ProductLightBox.jsx

The `ProductLightBox.jsx` component displays a lightbox with product images and thumbnails for selection.

This component is responsible for displaying a lightbox with a main image (ShowBox) and a list of thumbnail images (ThumbNail). The main image and the selected thumbnail image are synchronized.

Here's a breakdown of the code:

#### Import statements

- The component imports necessary modules, including `classNames` for CSS class manipulation, `ShowBox` and `ThumbNail` components for displaying images, `useState` from React for state management, and the CSS module styles.

#### products constant

- An array of objects representing the products. Each object contains an `id` (generated using `self.crypto.randomUUID()`), the URL of the product image, and the URL of the thumbnail image.

#### ProductLightBox function

- This is the main component function. It initializes the `selectedProduct` state with the first product from the `products` array.

#### handleClick function

- This function is called when a thumbnail image is clicked. It finds the corresponding product in the `products` array based on the clicked image's `id` and updates the `selectedProduct` state.

#### JSX return statement

- The component returns a `div` element with the CSS class `product-lightbox`.
- Inside the `div`, there is a `ShowBox` component displaying the main image.
- A `ul` element with the CSS class `thumbnail-list` contains `li` elements for each product.
- Each `li` has an `id` attribute set to the product's `id`, and an `onClick` event calling the `handleClick` function.
- Inside each `li`, a `ThumbNail` component displays the thumbnail image. The `isSelected` prop is set to true if the product's `id` matches the `selectedProduct`'s `id`.

#### Implementation

```jsx
import classNames from "classnames";
import ShowBox from "../showbox/ShowBox";
import ThumbNail from "../thumbnail/ThumbNail";

import { useState } from "react";

import styles from "./ProductLightBox.module.css";

const products = [
  {
    id: self.crypto.randomUUID(),
    product: "./src/assets/images/image-product-1.jpg",
    thumbNail: "./src/assets/images/image-product-1-thumbnail.jpg",
  },
  {
    id: self.crypto.randomUUID(),
    product: "./src/assets/images/image-product-2.jpg",
    thumbNail: "./src/assets/images/image-product-2-thumbnail.jpg",
  },
  {
    id: self.crypto.randomUUID(),
    product: "./src/assets/images/image-product-3.jpg",
    thumbNail: "./src/assets/images/image-product-3-thumbnail.jpg",
  },
  {
    id: self.crypto.randomUUID(),
    product: "./src/assets/images/image-product-4.jpg",
    thumbNail: "./src/assets/images/image-product-4-thumbnail.jpg",
  },
];

function ProductLightBox() {
  const initialValue = products[0];
  const [selectedProduct, setSelectedProduct] = useState(initialValue);

  const handleClick = (e) => {
    const product = products.find(
      (product) => product.id === e.currentTarget.id
    );
    setSelectedProduct(product);
  };

  return (
    <div className={classNames(styles["product-lightbox"])}>
      <ShowBox imgUrl={selectedProduct.product} />
      <ul className={classNames(styles["thumbnail-list"])}>
        {products.map((product) => {
          return (
            <li key={product.id} id={product.id} onClick={handleClick}>
              <ThumbNail
                isSelected={product.id == selectedProduct.id}
                thumbNail={product.thumbNail}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductLightBox;
```

### 6. ShowBox.jsx

This component takes an `imgUrl` prop, which represents the URL of an image to be displayed. The component uses the `classNames` library to apply CSS classes from the `ShowBox.module.css` file to the outer `div` element. Inside the `div`, there is an `img` element that displays the image specified by the `imgUrl` prop.

Here's a breakdown of the code:

#### Import statements

- `import classNames from "classnames";`: Imports the `classNames` function from the `classnames` library.
- `import styles from "./ShowBox.module.css";`: Imports the CSS styles defined in the `ShowBox.module.css` file.

#### Component definition

- `export default function ShowBox({ imgUrl }) {...}`: Defines a React functional component named `ShowBox` that takes an `imgUrl` prop.

#### Component return

- `<div className={classNames(styles.showBox)}>...</div>`: Creates a `div` element with the CSS classes defined in the `showBox` class from the `ShowBox.module.css` file.
- `<img src={imgUrl} />`: Creates an `img` element that displays the image specified by the `imgUrl` prop.

#### Implementation

```jsx
export default function ShowBox({ imgUrl }) {
  return (
    <div className={classNames(styles.showBox)}>
      <img src={imgUrl} />
    </div>
  );
}
```

### 7. Sidebar.jsx

This component is responsible for rendering the product page sidebar section. It includes various elements such as a title, description, price, counter, and a button.

#### Import statements:

The component imports necessary modules from React, CSS styles, and other components.

#### Function declaration:

The `Sidebar` function is defined as a React functional component.

#### State initialization:

The component uses the `useState` hook to initialize a state variable `count` with a default value of 0.

#### Event handlers:

Two event handlers are defined: `handleCountChange` and `handleSendToCart`. The `handleCountChange` function updates the `count` state with the new value passed as an argument. The `handleSendToCart` function logs a message to the console with the current count value.

#### JSX return:

The component returns a JSX expression that represents the HTML structure of the sidebar. It includes elements such as headers, paragraphs, a counter component, a button component with an icon, and CSS classes for styling.

#### Export statement:

The `Sidebar` component is exported as the default export for use in other files.

#### Implementation

```jsx
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
```

### 8. ThumbNail.jsx

This component takes two props: `isSelected` (defaulting to false) and `thumbNail` (defaulting to an empty string).

#### Component Structure and Behavior:

The component renders a div with a dynamic class name determined by the classNames function, which combines:

- `styles.thumbNail`: A CSS module class for basic styling.
- `styles.selected`: Added if isSelected is true, providing additional styling for a selected state.

Inside this div:

- An `<img>` tag displays the image specified by the thumbNail prop.
- Another `<div>` is conditionally rendered with a class name determined by classNames:
  - `styles.over`: Added if isSelected is true, applying overlay styling.

#### Export:

The ThumbNail component is exported as the default export for use in other modules.

#### Implementation

```jsx
function ThumbNail({ isSelected = false, thumbNail = "" }) {
  return (
    <div
      className={classNames(styles.thumbNail, isSelected && styles.selected)}
    >
      <img src={thumbNail} />
      <div className={classNames(isSelected && styles.over)}></div>
    </div>
  );
}

export default ThumbNail;
```

### Overall

These components collectively illustrate best practices in React development, including modularization, state management, event handling, and CSS styling integration. By following these breakdowns, developers can effectively implement and customize these components to suit diverse frontend requirements.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.
