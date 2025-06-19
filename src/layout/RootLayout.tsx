import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black">
      <Navbar />
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
