import { Link } from "@tanstack/react-location";
import { MdAdd, MdTag } from "react-icons/md";
import SidebarItem from "./SidebarItem";
import SidebarItemGroup from "./SidebarItemGroup";

const TagsList = () => {
  return (
    <SidebarItemGroup
      title="Tags"
      actions={[
        {
          label: "Add Tag",
          icon: <MdAdd />,
        },
      ]}
    >
      <Link to={`tags/${12345}`}>
        {({ isActive }) => (
          <SidebarItem icon={<MdTag />} label="Article" isActive={isActive} />
        )}
      </Link>
      <SidebarItem icon={<MdTag />} label="Reminder" />
      <SidebarItem icon={<MdTag />} label="Place" />
      <SidebarItem icon={<MdTag />} label="Gym" />
    </SidebarItemGroup>
  );
};

export default TagsList;
