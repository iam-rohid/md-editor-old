import {
  DefaultGenerics,
  ReactLocation,
  Route,
  Router,
} from "@tanstack/react-location";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

const location = new ReactLocation();

const routes: Route<DefaultGenerics>[] = [
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
];

const App = () => {
  return <Router location={location} routes={routes} />;
};

export default App;
