import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router";
import { SITE_TITLE } from "@/data/constants";
import { ModeToggle } from "@/components/theme/ModeToggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Input", href: "/input" },
  { name: "Find", href: "/find" },
  // { name: "Contact", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white dark:bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-black dark:text-white">
          {SITE_TITLE}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden space-x-6 md:flex md:items-center">
          <ModeToggle />
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-800 dark:text-white"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black px-4 py-4">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-black dark:text-gray-200 dark:hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
