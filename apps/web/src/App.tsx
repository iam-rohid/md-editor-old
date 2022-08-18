import {
  DefaultGenerics,
  ReactLocation,
  Route,
  Router,
} from "@tanstack/react-location";
import { useMemo } from "react";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import LogInPage from "./pages/LogInPage";
import Notebook from "./pages/Notebook";
import Settings from "./pages/Settings";
import SignUpPage from "./pages/SignUpPage";
import Tag from "./pages/Tag";

const location = new ReactLocation();

const App = () => {
  const routes = useMemo(() => {
    return [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          {
            path: "all",
            element: <Notebook />,
          },
          {
            path: "favorites",
            element: <Notebook />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "notebook/:id",
            element: <Notebook />,
          },
          {
            path: "tag/:id",
            element: <Tag />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LogInPage />,
          },
          {
            path: "/signup",
            element: <SignUpPage />,
          },
        ],
      },
    ] as Route<DefaultGenerics>[];
  }, []);
  return <Router location={location} routes={routes} />;
};

export default App;
