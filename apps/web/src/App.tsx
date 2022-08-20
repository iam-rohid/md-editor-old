import {
  getCurrentUserAsync,
  useAppDispatch,
  useAppSelector,
} from "@mdotion/store";
import {
  DefaultGenerics,
  Navigate,
  ReactLocation,
  Route,
  Router,
} from "@tanstack/react-location";
import { useEffect } from "react";
import FullscreenLoader from "./components/FullscreenLoader";
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import All from "./pages/All";
import Favorites from "./pages/Favorites";
import LogInPage from "./pages/LogInPage";
import Note from "./pages/Note";
import Notebook from "./pages/Notebook";
import Settings from "./pages/Settings";
import SignUpPage from "./pages/SignUpPage";
import Tag from "./pages/Tag";
import Trash from "./pages/Trash";

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
        element: <All />,
        children: noteRoutes,
      },
      {
        path: "favorites",
        element: <Favorites />,
        children: noteRoutes,
      },
      {
        path: "trash",
        element: <Trash />,
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
  const userStatus = useAppSelector((state) => state.user.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(getCurrentUserAsync());
    }
  }, [dispatch, userStatus]);

  if (userStatus === "loading" || userStatus === "idle") {
    return <FullscreenLoader />;
  }

  return <Router location={location} routes={routes} />;
};

export default App;
