import siteData from "@/content/site.json";
import projectsData from "@/content/projects.json";
import labData from "@/content/lab.json";
import vaultData from "@/content/vault.json";

export type Status = "LIVE" | "PRODUCTION" | "OPEN SOURCE" | "PRIVATE";
export type Category = "Research" | "Browser" | "Automation" | "Desktop" | "AI";
export type ModelType =
  | "phone"
  | "papers"
  | "envelope"
  | "disk"
  | "morph"
  | "book"
  | "funnel"
  | "prism"
  | "atom";

export interface ProjectDeepDive {
  problem: string;
  architecture: string;
  impact: string;
  highlights: string[];
}

export interface Project {
  id: string;
  name: string;
  hook: string;
  model?: ModelType;
  discipline: string;
  status: Status;
  stack: string[];
  live?: string | null;
  repo?: string | null;
  deepDive?: ProjectDeepDive;
}

export interface LabItem {
  id: string;
  name: string;
  line: string;
  category: Category;
  lang: string;
  status: Status;
  repo?: string;
  locked?: boolean;
}

export interface VaultItem {
  id: string;
  label: string;
  group: string;
  blurb: string;
}

export const SITE = siteData;
export const CV = {
  href: siteData.cv.pdf,
  filename: "Muhammad-Kamran-Ashraf-CV.pdf",
  label: siteData.cv.label,
};
export const EMAIL = siteData.email;
export const GITHUB =
  siteData.socials.find((s) => s.label.toLowerCase() === "github")?.href ||
  "https://github.com/Kamran5H";
export const SOCIALS: [string, string][] = siteData.socials.map((s) => [
  s.label,
  s.href,
]);

export const FLAGSHIPS: Project[] = projectsData as Project[];
export const REPOS: LabItem[] = labData as LabItem[];
export const VAULT_ITEMS: VaultItem[] = vaultData;
export const STACK = siteData.stack;
