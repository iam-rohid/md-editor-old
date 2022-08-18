import SITE from "@/constants/SITE";
import { Link } from "@tanstack/react-location";

const AuthHeader = () => {
  return (
    <nav className="h-14 bg-white dark:bg-black">
      <div className="flex h-full items-center px-4">
        <Link to="/" className="text-xl font-bold uppercase">
          {SITE.NAME}
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Link
            to="/login"
            className="rounded-md px-3.5 py-1.5 font-medium text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white dark:active:bg-gray-800"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="rounded-md bg-primary-500 px-3.5 py-1.5 font-medium text-white outline-offset-2 hover:bg-primary-600 active:bg-primary-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AuthHeader;
