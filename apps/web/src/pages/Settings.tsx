import SecondarySidebar from "@/components/SecondarySidebar";
import SidebarButton from "@/components/SidebarButton";
import SidebarItemGroup from "@/components/SidebarItemGroup";
import { Link, Outlet, useRouter } from "@tanstack/react-location";
import { MdPalette, MdPerson } from "react-icons/md";

const Settings = () => {
  const router = useRouter();
  return (
    <>
      <SecondarySidebar>
        <div className="flex h-12 items-center border-b border-gray-100 px-2 dark:border-gray-800">
          <p className="flex-1 px-2 text-lg font-bold">Settings</p>
        </div>
        <div className="h-full w-full flex-1 overflow-y-auto p-2">
          <SidebarItemGroup>
            <Link to="account">
              <SidebarButton
                label="Account"
                icon={<MdPerson />}
                isActive={
                  router.state.location.pathname.split("/")[2] === "account"
                }
              />
            </Link>
            <Link to="appearance">
              <SidebarButton
                label="Appearance"
                icon={<MdPalette />}
                isActive={
                  router.state.location.pathname.split("/")[2] === "appearance"
                }
              />
            </Link>
          </SidebarItemGroup>
        </div>
      </SecondarySidebar>
      <Outlet />
    </>
  );
};

export default Settings;
