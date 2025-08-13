import SiteTitleText from "@/components/text/SiteTitleText";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { AuthContext } from "@/context/AuthContext";
import { Menu } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router";

const navItems = [
  { name: "Story", href: "/story" },
  { name: "Quote", href: "/quote" },
  // { name: "Input", href: "/input" },
  { name: "Dictionary", href: "/find" },
  { name: "Bookmarks", href: "/bookmarks" },
];

export default function Navbar() {
  const { session, logout, profile } = useContext(AuthContext);

  return (
    <header className="w-full">
      <div className="mx-auto flex h-16 max-w-[1330px] items-center justify-between px-4">
        {/* Logo */}
        <SiteTitleText />

        {/* Desktop Nav */}
        <NavigationMenu className="hidden space-x-2 md:flex md:items-center">
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
          {session && profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="font-bold text-sm cursor-pointer text-muted-foreground">
                <Avatar>
                  {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                  <AvatarFallback>{profile.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to={`/sign-in`}
              className="border-[1px] px-6 py-1.5 font-semibold text-sm rounded-md"
            >
              Sign in
            </Link>
          )}
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
