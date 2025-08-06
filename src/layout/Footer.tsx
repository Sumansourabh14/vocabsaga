import { Separator } from "@/components/ui/separator";
import { SITE_TITLE } from "@/data/constants";
import { Link } from "react-router";

const navItems = [
  { name: "Story", href: "/story" },
  { name: "Input", href: "/input" },
  { name: "Find", href: "/find" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-zinc-100 dark:bg-black text-gray-600 dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-row justify-between items-center mb-2">
          <Link to="/" className="text-xl font-bold">
            {SITE_TITLE}
          </Link>
          {/* Links */}
          <nav className="flex space-x-6 text-sm">
            {navItems.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-sm font-bold text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <section className="pt-4 text-center">
          <Separator />
          <div className="text-sm font-light text-muted-foreground mt-4">
            © {new Date().getFullYear()} {SITE_TITLE}. All Rights Reserved
          </div>
        </section>
        <div className="text-center pb-8">
          <p
            className="font-bold tracking-tighter text-7xl sm:text-9xl lg:text-[11rem] xl:text-[14rem]"
            style={{ lineHeight: 1 }}
          >
            <span className="text-[#1b7a1b]">vocab</span>saga.
          </p>
        </div>
      </div>
    </footer>
  );
}
