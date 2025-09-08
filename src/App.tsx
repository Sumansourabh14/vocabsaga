import { Analytics } from "@vercel/analytics/react";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { Toaster } from "./components/ui/sonner";
import WordInput from "./components/WordInput";
import { ThemeProvider } from "./context/theme-provider";
import NotFound from "./layout/NotFound";
import RootLayout from "./layout/RootLayout";
import AuthPage from "./pages/AuthPage";
import Bookmarks from "./pages/Bookmarks";
import FindWord from "./pages/FindWord";
import Home from "./pages/Home";
import RandomQuote from "./pages/RandomQuote";
import RandomStory from "./pages/RandomStory";
import Word from "./pages/Word";
import AuthLayout from "./layout/AuthLayout";
import { AuthProvider } from "./context/AuthContext";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import WordOfTheDay from "./pages/WordOfTheDay";

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
        path: "privacy-policy",
        element: <PrivacyPolicy />,
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
        path: "word-of-the-day",
        element: <WordOfTheDay />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <AuthPage />,
      },
      {
        path: "sign-up",
        element: <AuthPage />,
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
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
        <Analytics />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
