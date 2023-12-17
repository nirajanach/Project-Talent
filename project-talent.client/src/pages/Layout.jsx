import { Outlet, Link } from "react-router-dom";
import NavBar from "../Components/utils/NavBar";

function Layout() {
  return (
    <>      
      <NavBar/>

      <Outlet />
    </>
  );
}

export default Layout;
