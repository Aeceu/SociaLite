import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import UsersTab from "./components/UsersTab";
import { useEffect } from "react";
import { UserStore } from "./state/UserStore";

export default function Layout() {
  const getUserData = UserStore((state) => state.getUserData);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <div className="h-screen flex flex-col bg-slate-100 ">
      <NavBar />
      <div className="w-full h-full flex  gap-4">
        <SideBar />
        <Outlet />
        <UsersTab />
      </div>
    </div>
  );
}
