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
import SignUpPage from "./pages/SignUpPage";

const location = new ReactLocation();

const App = () => {
  const routes = useMemo(() => {
    return [
      {
        path: "/",
        element: <AppLayout />,
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
