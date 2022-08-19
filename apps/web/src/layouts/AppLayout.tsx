import PrimarySidebar from "@/components/sdiebar/primary-sidebar/PrimarySidebar";
import { useAppSelector } from "@mdotion/store";
import { Navigate, Outlet } from "@tanstack/react-location";

const AppLayout = () => {
  const user = useAppSelector((state) => state.user.data);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <div className="flex h-full w-full flex-1 flex-row">
        <PrimarySidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
