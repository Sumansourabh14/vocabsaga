import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import WordInput from "./components/WordInput";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/input",
    element: <WordInput />,
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <Home />
    </RouterProvider>
  );
}

export default App;
