export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4 text-gray-700 dark:text-gray-300">
        Oops! Page not found.
      </p>
      <a
        href="/"
        className="inline-block mt-6 text-blue-500 hover:underline text-sm"
      >
        Go back home →
      </a>
    </div>
  );
}
