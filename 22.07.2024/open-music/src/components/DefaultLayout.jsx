import { Outlet } from "react-router-dom";
import Header from "./Header";

function DefaultLayout() {
  return (
    <div>
      <Header />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
