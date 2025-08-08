import SocialLink from "@/components/links/SocialLink";
import SiteTitleText from "@/components/text/SiteTitleText";
import { Separator } from "@/components/ui/separator";
import { SITE_TITLE } from "@/data/constants";
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Link } from "react-router";

const navItems = [
  { name: "Story", href: "/story" },
  // { name: "Input", href: "/input" },
  { name: "Find", href: "/find" },
  { name: "Bookmarks", href: "/bookmarks" },
];

const socialLinks = [
  {
    id: "1",
    title: "Instagram",
    link: "https://instagram.com/vocabsaga",
    icon: InstagramLogoIcon,
  },
  {
    id: "2",
    title: "Twitter/X",
    link: "https://x.com/vocabsaga",
    icon: TwitterLogoIcon,
  },
  {
    id: "3",
    title: "GitHub",
    link: "https://github.com/Sumansourabh14/vocabsaga",
    icon: GitHubLogoIcon,
  },
];

export default function Footer() {
  return (
    <footer className="border-t bg-zinc-100 dark:bg-black text-gray-600 dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-row justify-between items-center mb-6">
          <SiteTitleText />
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

        <Separator />

        <section className="flex justify-between items-center mt-6">
          <div className="text-xs font-light text-muted-foreground">
            © {new Date().getFullYear()} {SITE_TITLE}. All Rights Reserved
          </div>
          <div className="flex space-x-4 text-xl">
            {socialLinks.map((item) => (
              <SocialLink
                key={item.id}
                icon={item.icon}
                link={item.link}
                title={item.link}
              />
            ))}
          </div>
        </section>
        <div className="text-center pb-8">
          <p
            className="playfair-display-bold font-bold tracking-tighter text-7xl sm:text-9xl lg:text-[11rem] xl:text-[14rem]"
            style={{ lineHeight: 1 }}
          >
            <span className="text-[#1b7a1b]">vocab</span>saga.
          </p>
        </div>
      </div>
    </footer>
  );
}
