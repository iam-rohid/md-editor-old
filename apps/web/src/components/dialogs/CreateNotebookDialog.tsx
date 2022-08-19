import { Dialog } from "@headlessui/react";
import {
  createNotebookAsync,
  CreateNotebookDto,
  useAppDispatch,
} from "@mdotion/store";
import classNames from "classnames";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateNotebookDialog = (props: Props) => {
  const { isOpen, onClose } = props;
  const formData = useForm<CreateNotebookDto>();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(
    (dto: CreateNotebookDto) => {
      dispatch(createNotebookAsync(dto));
      onClose();
    },
    [dispatch, onClose]
  );

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <Dialog.Overlay className="absolute inset-0 bg-black/60 " />
      <div className="absolute inset-0 z-10 overflow-y-auto">
        <Dialog.Panel className="mx-auto my-16 max-w-md rounded-lg border border-gray-100 bg-white shadow-xl dark:border-gray-800 dark:bg-black">
          <div className="flex h-12 items-center border-b border-gray-100 px-4 dark:border-gray-800">
            <Dialog.Title className="text-lg font-bold">
              Create Notebook
            </Dialog.Title>
          </div>
          <form onSubmit={formData.handleSubmit(onSubmit)}>
            <div className="p-4">
              <div className="mb-4 flex flex-col gap-2">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  placeholder="My Notebook"
                  {...formData.register("title", {
                    required: "Notebook name is required",
                  })}
                  autoFocus
                  className={classNames(
                    "w-full rounded-md border bg-transparent px-4 py-2 placeholder:text-gray-500 dark:placeholder:text-gray-500",
                    {
                      "border-red-500 dark:border-red-500":
                        !!formData.formState.errors.title,
                      "border-gray-100 hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700":
                        !formData.formState.errors.title,
                    }
                  )}
                />
                {!!formData.formState.errors.title && (
                  <p className="text-sm text-red-500">
                    {formData.formState.errors.title.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description">
                  Description <span className="opacity-50">(optional)</span>
                </label>
                <textarea
                  id="description"
                  placeholder="Sort Description"
                  {...formData.register("description", {
                    maxLength: {
                      value: 300,
                      message:
                        "Description must not be more than 300 characters long.",
                    },
                  })}
                  className={classNames(
                    "w-full rounded-md border bg-transparent px-4 py-2 placeholder:text-gray-500 dark:placeholder:text-gray-500",
                    {
                      "border-red-500 dark:border-red-500":
                        !!formData.formState.errors.description,
                      "border-gray-100 hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700":
                        !formData.formState.errors.description,
                    }
                  )}
                />
                {!!formData.formState.errors.description && (
                  <p className="text-sm text-red-500">
                    {formData.formState.errors.description.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full justify-end gap-2 border-t border-gray-100 bg-gray-50 px-4 py-2 dark:border-gray-800 dark:bg-gray-900">
              <button
                type="reset"
                onClick={onClose}
                className="rounded-md px-3.5 py-1.5 font-medium text-gray-600 outline-offset-2 hover:bg-gray-100 hover:text-black active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white dark:active:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-primary-500 px-3.5 py-1.5 font-medium text-white outline-offset-2 hover:bg-primary-600 active:bg-primary-700"
              >
                Create
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateNotebookDialog;
