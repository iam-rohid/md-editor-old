import SecondarySidebar from "@/components/SecondarySidebar";
import { Outlet } from "@tanstack/react-location";

const Tag = () => {
  return (
    <>
      <SecondarySidebar>tags</SecondarySidebar>
      <Outlet />
    </>
  );
};

export default Tag;
