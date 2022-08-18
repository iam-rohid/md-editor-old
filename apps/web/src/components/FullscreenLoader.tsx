import Spinner from "./Spinner";

const FullscreenLoader = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner />
    </div>
  );
};

export default FullscreenLoader;
