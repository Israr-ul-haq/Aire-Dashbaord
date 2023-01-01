import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
function WebLayout() {
  return (
    <>
      <Header />
      <SideBar />
      <div className="main_section">
        <Outlet />
      </div>
    </>
  );
}

export default WebLayout;
