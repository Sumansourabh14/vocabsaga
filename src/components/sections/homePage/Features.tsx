import { CalendarIcon, InputIcon, QuoteIcon } from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { BookIcon } from "lucide-react";

const features = [
  {
    Icon: InputIcon,
    name: "Contextual Learning",
    description: "Understand how words are used in real sentences.",
    href: "/story",
    cta: "Read passage",
    background: (
      <img
        className="absolute -right-20 -top-20 opacity-60"
        alt="Sample feature image"
      />
    ),
    className: "col-span-3 md:col-span-2",
  },
  {
    Icon: BookIcon,
    name: "Built-in Dictionary",
    description: "Find any word for instant definitions.",
    href: "/find",
    cta: "Find a word",
    background: (
      <img
        className="absolute -right-20 -top-20 opacity-60"
        alt="Sample feature image"
      />
    ),
    className: "col-span-3 md:col-span-1",
  },
  {
    Icon: CalendarIcon,
    name: "Minimal UI",
    description: "Focus on the content, not clutter.",
    href: "/",
    background: (
      <img
        className="absolute -right-20 -top-20 opacity-60"
        alt="Sample feature image"
      />
    ),
    className: "col-span-3 md:col-span-1",
  },
  {
    Icon: QuoteIcon,
    name: "Quotes from popular books",
    description: "Read famous book quotes at random, founded just for you.",
    href: "/quote",
    cta: "Read quotes",
    background: (
      <img
        className="absolute -right-20 -top-20 opacity-60"
        alt="Sample feature image"
      />
    ),
    className: "col-span-3 md:col-span-2",
  },
];

export function Features() {
  return (
    <BentoGrid className="3xl:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
