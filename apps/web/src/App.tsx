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
        path: "login",
        element: (
          <AuthLayout>
            <LogInPage />
          </AuthLayout>
        ),
      },
      {
        path: "signup",
        element: (
          <AuthLayout>
            <SignUpPage />
          </AuthLayout>
        ),
      },
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
            path: "notebooks/:id",
            element: <Notebook />,
          },
          {
            path: "tag/:id",
            element: <Tag />,
          },
        ],
      },
    ] as Route<DefaultGenerics>[];
  }, []);
  return <Router location={location} routes={routes} />;
};

export default App;
