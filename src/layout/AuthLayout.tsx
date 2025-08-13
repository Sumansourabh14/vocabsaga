import SiteTitleText from "@/components/text/SiteTitleText";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex flex-col max-w-[1300px] mx-auto">
      <div className="mt-8 px-6">
        <SiteTitleText />
      </div>
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
