import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import WordInput from "./components/WordInput";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import NotFound from "./layout/NotFound";
import { ThemeProvider } from "./context/theme-provider";
import Word from "./pages/Word";
import FindWord from "./pages/FindWord";
import RandomStory from "./pages/RandomStory";
import Bookmarks from "./pages/Bookmarks";
import { Toaster } from "./components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import RandomQuote from "./pages/RandomQuote";

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
        path: "story",
        element: <RandomStory />,
      },
      {
        path: "quote",
        element: <RandomQuote />,
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
        path: "bookmarks",
        element: <Bookmarks />,
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
      <Toaster />
      <Analytics />
    </ThemeProvider>
  );
}

export default App;
