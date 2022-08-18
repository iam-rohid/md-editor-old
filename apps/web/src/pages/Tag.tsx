import NotebookColumn from "@/components/NotebookColumn";
import SecondarySidebar from "@/components/SecondarySidebar";
import { Outlet } from "@tanstack/react-location";

const Tag = () => {
  return (
    <>
      <SecondarySidebar>
        <NotebookColumn />
      </SecondarySidebar>
      <Outlet />
    </>
  );
};

export default Tag;
