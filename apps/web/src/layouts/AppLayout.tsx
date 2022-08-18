import PrimarySidebar from "@/components/PrimarySidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "@tanstack/react-location";

const AppLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

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
