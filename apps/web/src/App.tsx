import {
  DefaultGenerics,
  Navigate,
  ReactLocation,
  Route,
  Router,
} from "@tanstack/react-location";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import LogInPage from "./pages/LogInPage";
import Note from "./pages/Note";
import Notebook from "./pages/Notebook";
import Settings from "./pages/Settings";
import SignUpPage from "./pages/SignUpPage";
import Tag from "./pages/Tag";

const location = new ReactLocation();

const noteRoutes: Route<DefaultGenerics>[] = [
  {
    path: "note/:noteId",
    element: <Note />,
  },
];

const routes: Route<DefaultGenerics>[] = [
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
    element: <AppLayout />,
    children: [
      {
        path: "all",
        element: <Notebook />,
        children: noteRoutes,
      },
      {
        path: "favorites",
        element: <Notebook />,
        children: noteRoutes,
      },
      {
        path: "settings",
        element: <Settings />,
        children: noteRoutes,
      },
      {
        path: "notebook/:notebookId",
        element: <Notebook />,
        children: noteRoutes,
      },
      {
        path: "tags/:tagId",
        element: <Tag />,
        children: noteRoutes,
      },
      {
        element: <Navigate to="/all" replace />,
      },
    ],
  },
];

const App = () => {
  return <Router location={location} routes={routes} />;
};

export default App;
