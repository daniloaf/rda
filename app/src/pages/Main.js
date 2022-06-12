import React from "react";
import { Outlet } from "react-router-dom";
import ApplicationBar from "../components/ApplicationBar";
import SideBar from "../components/SideBar";

const Main = () => {
  return (
    <React.Fragment>
      <div>
        <img src={process.env.PUBLIC_URL + "/logo.png"} height={150} />
        <ApplicationBar />
        <br />
        <SideBar />
        <Outlet />
      </div>
    </React.Fragment>
  );
};
export default Main;
