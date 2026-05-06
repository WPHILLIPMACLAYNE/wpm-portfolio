"use client";

import { cn } from "@/lib/utils";

type IconName =
  | "projects"
  | "about"
  | "skills"
  | "resume"
  | "lab"
  | "hobbies"
  | "contact"
  | "settings"
  | "secret"
  | "back"
  | "github"
  | "linkedin"
  | "email"
  | "live"
  | "figma";

const iconMap: Record<IconName, string> = {
  projects: "[]",
  about: "?",
  skills: "{}",
  resume: "\u25A0",
  lab: "<>",
  hobbies: "\u2666",
  contact: "@",
  settings: "\u2699",
  secret: "\u2603",
  back: "<-",
  github: "GH",
  linkedin: "LI",
  email: "@",
  live: ">>",
  figma: "FG",
};

interface IconProps {
  name: IconName;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "text-xs",
  md: "text-lg",
  lg: "text-2xl",
};

export default function Icon({ name, size = "md", className }: IconProps) {
  return (
    <span
      className={cn(
        "font-mono select-none leading-none",
        sizeClasses[size],
        className
      )}
      aria-hidden="true"
    >
      {iconMap[name]}
    </span>
  );
}

export { type IconName, iconMap };
