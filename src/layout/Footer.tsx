import { SITE_TITLE } from "@/data/constants";

export default function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-black text-gray-600 dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Branding */}
          <div className="text-lg font-semibold">© 2025 {SITE_TITLE}</div>

          {/* Links */}
          <nav className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-black dark:hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-black dark:hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-black dark:hover:text-white">
              About
            </a>
            <a href="#" className="hover:text-black dark:hover:text-white">
              Contact
            </a>
          </nav>
        </div>
        <div className="text-center pb-8">
          <h2
            className="font-bold tracking-tighter text-6xl sm:text-9xl lg:text-[11rem] xl:text-[14rem]"
            style={{ lineHeight: 1 }}
          >
            <span className="text-[#1b7a1b]">vocab</span>saga.
          </h2>
        </div>
      </div>
    </footer>
  );
}
