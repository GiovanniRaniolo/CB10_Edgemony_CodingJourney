import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-700">
      <h1 className="text-4xl">Oops!</h1>
      <p className="text-lg mt-4">Sorry, an unexpected error has occurred.</p>
      <p className="text-sm mt-2">
        <i>{error.statusText || error.message}</i>
      </p>
      <a href="/" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Go to Home
      </a>
    </div>
  );
};

export default ErrorPage;
