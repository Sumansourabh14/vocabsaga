import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import WordInput from "./components/WordInput";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import NotFound from "./layout/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "input",
        element: <WordInput />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
