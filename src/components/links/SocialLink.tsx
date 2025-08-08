import React from "react";

type LinkProps = {
  link: string;
  title: string;
  icon: React.ComponentType;
};

const SocialLink = ({ link, title, icon: Icon }: LinkProps) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-black dark:hover:text-white"
      aria-label={title}
    >
      <Icon />
    </a>
  );
};

export default SocialLink;
