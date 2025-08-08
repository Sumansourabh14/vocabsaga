import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import FeedbackBar from "@/components/sections/FeedbackBar";

export default function RootLayout() {
  return (
    <div className="flex flex-col">
      <FeedbackBar />
      <Navbar />
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
