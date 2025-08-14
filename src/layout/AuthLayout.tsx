import SiteTitleText from "@/components/text/SiteTitleText";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex flex-col max-w-[1300px] mx-auto">
      <div className="flex justify-between items-center mt-8">
        <div>
          <SiteTitleText />
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
      <main className="flex-1 px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
