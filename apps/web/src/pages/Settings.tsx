import SecondarySidebar from "@/components/SecondarySidebar";
import { Outlet } from "@tanstack/react-location";
import React from "react";

const Settings = () => {
  return (
    <>
      <SecondarySidebar>Settings</SecondarySidebar>
      <Outlet />
    </>
  );
};

export default Settings;
