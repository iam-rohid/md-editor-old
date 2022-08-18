import { Link } from "@tanstack/react-location";
import { MdAdd, MdTag } from "react-icons/md";
import SidebarButton from "./SidebarButton";
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
          <SidebarButton icon={<MdTag />} label="Article" isActive={isActive} />
        )}
      </Link>
      <SidebarButton icon={<MdTag />} label="Reminder" />
      <SidebarButton icon={<MdTag />} label="Place" />
      <SidebarButton icon={<MdTag />} label="Gym" />
    </SidebarItemGroup>
  );
};

export default TagsList;
