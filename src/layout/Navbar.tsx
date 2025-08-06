import { ModeToggle } from "@/components/theme/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SITE_TITLE } from "@/data/constants";
import { Menu } from "lucide-react";
import { Link } from "react-router";

const navItems = [
  { name: "Story", href: "/story" },
  { name: "Input", href: "/input" },
  { name: "Find", href: "/find" },
];

export default function Navbar() {
  return (
    <header className="w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          {SITE_TITLE}
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden space-x-6 md:flex md:items-center">
          <ModeToggle />
          <NavigationMenuList>
            {navItems.map((link, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink asChild>
                  <Link
                    to={link.href}
                    className="text-sm font-bold text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    {link.name}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="px-8">
            <SheetHeader>
              <SheetTitle>Vocabsaga</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-4">
              <ModeToggle />
              {navItems.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-bold text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
              {/* <Button className="mt-2 w-full">Login</Button> */}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
