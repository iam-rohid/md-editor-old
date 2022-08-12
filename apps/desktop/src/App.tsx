import { ActivityBar } from "@/components/activity-bar";
import { FileExplorer } from "@/components/file-explorer";
import { Document } from "@/components/document";

const App = () => {
  return (
    <>
      <ActivityBar />
      <FileExplorer />
      <Document />
    </>
  );
};

export default App;
