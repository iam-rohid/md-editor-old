import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import classNames from "classnames";
import {
  SignInDto,
  signInWithEmailAsync,
  useAppDispatch,
  useAppSelector,
} from "@mdotion/store";

const LogInPage = () => {
  const formData = useForm<SignInDto>();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.user);

  const onSubmit = (dto: SignInDto) => {
    dispatch(signInWithEmailAsync(dto));
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
                "border-gray-100 hover:border-gray-200 dark:border-gray-700 dark:hover:border-gray-600":
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
              placeholder="????????????????????????"
              {...formData.register("password", {
                required: "Password is required",
              })}
              className={classNames(
                "w-full rounded-md border bg-transparent px-4 py-2 placeholder:text-gray-500 dark:placeholder:text-gray-500",
                {
                  "border-red-500 dark:border-red-500":
                    !!formData.formState.errors.password,
                  "border-gray-100 hover:border-gray-200 dark:border-gray-700 dark:hover:border-gray-600":
                    !formData.formState.errors.password,
                }
              )}
            />
            <div className="absolute right-0 top-0 flex aspect-square h-full items-center justify-center">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="rounded-md p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:active:bg-gray-600"
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
          disabled={status === "signingIn"}
          type="submit"
          className="mt-4 flex h-10 w-full items-center justify-center rounded-md bg-primary-500 px-4 font-medium text-white outline-offset-2 hover:bg-primary-600 active:bg-primary-700"
        >
          {status === "signingIn" ? (
            <div className="bordercap h-7 w-7 animate-spin rounded-full border-4 border-t-white border-l-white  border-b-white/20 border-r-white/20" />
          ) : (
            "Log In"
          )}
        </button>

        {!!error && (
          <p className="mt-4 rounded-md border  border-red-500 px-4 py-2 text-red-500">
            {error.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default LogInPage;
