import { Link, useRouter } from "@tanstack/react-location";
import React from "react";
import { MdAdd, MdTag } from "react-icons/md";
import SidebarButton from "./SidebarButton";
import SidebarItemGroup from "./SidebarItemGroup";

const TagsList = () => {
  const router = useRouter();

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
      <Link to={`tag/${12345}`}>
        <SidebarButton
          icon={<MdTag />}
          label="Article"
          isActive={router.state.location.pathname.startsWith(`/tag/${12345}`)}
        />
      </Link>
      <SidebarButton icon={<MdTag />} label="Reminder" />
      <SidebarButton icon={<MdTag />} label="Place" />
      <SidebarButton icon={<MdTag />} label="Gym" />
    </SidebarItemGroup>
  );
};

export default TagsList;
