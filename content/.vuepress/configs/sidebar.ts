import type { SidebarConfig } from "@vuepress/theme-default";

export const sidebarEn: SidebarConfig = [
  {
    text: "Joining",
    collapsible: true,
    children: [
      "/index.md",
      "/joining.md",
      "/benefits.md",
      "/vacation.md",
      "/moonlighting",
      "/otherinfo.md"
   ],
  },
  {
    text: "Career paths",
    collapsible: true,
    children: [
      "/career_path.md"
   ],
  }
];
