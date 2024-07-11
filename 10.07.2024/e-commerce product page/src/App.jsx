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
