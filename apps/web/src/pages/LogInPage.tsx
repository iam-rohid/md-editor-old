import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import classNames from "classnames";

type LogInForm = {
  email: string;
  password: string;
};

const LogInPage = () => {
  const formData = useForm<LogInForm>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (value: LogInForm) => {
    console.log("onSubmit", value);
  };

  return (
    <div className="mx-auto my-16 max-w-md px-4">
      <h1 className="mb-16 text-center text-3xl font-bold">Log In</h1>

      <form onSubmit={formData.handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...formData.register("email", {
              required: "Email is required",
            })}
            className={classNames(
              "w-full rounded-md border bg-transparent px-4 py-2 placeholder:text-gray-500 dark:placeholder:text-gray-500",
              {
                "border-red-500 dark:border-red-500":
                  !!formData.formState.errors.email,
                "border-gray-100 hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700":
                  !formData.formState.errors.email,
              }
            )}
          />
          {!!formData.formState.errors.email && (
            <p className="text-sm text-red-500">
              {formData.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...formData.register("password", {
                required: "Password is required",
              })}
              className={classNames(
                "w-full rounded-md border bg-transparent px-4 py-2 placeholder:text-gray-500 dark:placeholder:text-gray-500",
                {
                  "border-red-500 dark:border-red-500":
                    !!formData.formState.errors.password,
                  "border-gray-100 hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700":
                    !formData.formState.errors.password,
                }
              )}
            />
            <div className="absolute right-0 top-0 flex aspect-square h-full items-center justify-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="rounded-md p-1.5 text-gray-600 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700"
              >
                {showPassword ? (
                  <MdVisibilityOff className="text-xl" />
                ) : (
                  <MdVisibility className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {!!formData.formState.errors.password && (
            <p className="text-sm text-red-500">
              {formData.formState.errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-primary-500 py-2 px-4 font-medium text-white outline-offset-2 hover:bg-primary-600 active:bg-primary-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LogInPage;
