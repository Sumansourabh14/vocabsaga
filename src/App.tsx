import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import WordInput from "./components/WordInput";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import NotFound from "./layout/NotFound";
import { ThemeProvider } from "./context/theme-provider";
import Word from "./pages/Word";
import FindWord from "./pages/FindWord";

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
        element: <WordInput isOnPage={true} />,
      },
      {
        path: "find",
        element: <FindWord />,
      },
      {
        path: "word/:title",
        element: <Word />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
