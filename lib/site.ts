export const CV = {
  href: '/cv/Muhammad-Kamran-Ashraf-CV.pdf',
  filename: 'Muhammad-Kamran-Ashraf-CV.pdf',
};

export const GITHUB = 'https://github.com/Kamran5H';
export const EMAIL = 'chkamran32b@gmail.com';
export const ORCID = 'https://orcid.org/0009-0003-2997-2954';
export const LINKEDIN = 'https://www.linkedin.com/in/kamran-ashraf-762a21363/';
export const INSTAGRAM = 'https://www.instagram.com/muhammad.kamran.ashraf';
export const FACEBOOK = 'https://www.facebook.com/chkamran32b';

export const SOCIALS: [string, string][] = [
  ['GitHub', GITHUB],
  ['LinkedIn', LINKEDIN],
  ['ORCID', ORCID],
  ['Instagram', INSTAGRAM],
  ['Facebook', FACEBOOK],
];

export type Status = 'LIVE' | 'PRODUCTION' | 'OPEN SOURCE' | 'PRIVATE';

export type Flagship = {
  id: 'kalam' | 'subah' | 'articles' | 'humanizer' | 'videos';
  name: string;
  hook: string;
  status: Status;
  stack: string[];
  live?: string;
  repo?: string;
};

export const FLAGSHIPS: Flagship[] = [
  {
    id: 'kalam',
    name: 'QAU Kalam',
    hook: 'A verified, students-only network for Quaid-i-Azam University — feed, mentors, chat, bus times.',
    status: 'LIVE',
    stack: ['FastAPI', 'Neon Postgres', 'Azure', 'MediaPipe'],
    live: 'https://www.qaukalam.me',
  },
  {
    id: 'subah',
    name: 'Subah TaskBook',
    hook: 'A morning task book that rolls unfinished work forward and pays you back with small surprises.',
    status: 'OPEN SOURCE',
    stack: ['JavaScript', 'Electron', 'PWA', 'Offline-first'],
    repo: 'https://github.com/Kamran5H/Subah-TaskBook',
  },
  {
    id: 'articles',
    name: 'Articles Downloader',
    hook: 'One query, nine scholarly APIs, a folder of PDFs. Search history kept in SQLite.',
    status: 'OPEN SOURCE',
    stack: ['Python', 'SQLite', 'OpenAlex', 'PubMed'],
    repo: 'https://github.com/Kamran5H/ArticlesDownloader',
  },
  {
    id: 'humanizer',
    name: 'Humanizer Pro',
    hook: 'Rewrites stiff machine text into plain prose, and scores it with a local detector first.',
    status: 'OPEN SOURCE',
    stack: ['Python', 'NLP', 'Tkinter', 'LLM'],
    repo: 'https://github.com/Kamran5H/Humanizer',
  },
  {
    id: 'videos',
    name: 'Quidian Media Downloader',
    hook: '4K streams, whole playlists and subtitles, pulled in parallel by yt-dlp and aria2c.',
    status: 'OPEN SOURCE',
    stack: ['Python', 'yt-dlp', 'aria2c', 'FFmpeg'],
    repo: 'https://github.com/Kamran5H/Quidian-MediaDownloader',
  },
];

export type Category = 'Research' | 'Browser' | 'Automation' | 'Desktop' | 'AI';

export type Repo = {
  name: string;
  line: string;
  category: Category;
  lang: string;
  status: Status;
  repo?: string;
};

const gh = (n: string) => `https://github.com/Kamran5H/${n}`;

export const REPOS: Repo[] = [
  { name: 'ReviewForge', line: 'Config-driven pipeline for reproducible academic review drafts.', category: 'Research', lang: 'Python', status: 'OPEN SOURCE', repo: gh('ReviewForge') },
  { name: 'Research Daybook', line: 'Single-file offline lab journal on localStorage.', category: 'Research', lang: 'HTML', status: 'OPEN SOURCE', repo: gh('ResearchDaybook') },
  { name: 'Computational Chem Lab', line: 'Gaussian DFT and Quantum ESPRESSO runs for my thesis.', category: 'Research', lang: 'Python', status: 'PRIVATE' },
  { name: 'Chem-Kam', line: 'Chrome side panel for DFT notes and live lab references.', category: 'Research', lang: 'JavaScript', status: 'PRIVATE' },
  { name: 'Source Genius', line: 'Finds the real website behind any Amazon brand.', category: 'Browser', lang: 'JavaScript', status: 'PRODUCTION', repo: gh('SourceGenius') },
  { name: 'Source Genius Extension', line: 'MV3 side panel front-end for Source Genius.', category: 'Browser', lang: 'JavaScript', status: 'OPEN SOURCE', repo: gh('SourceGenius-Extension') },
  { name: 'Auto Clear & Optimize', line: 'One-click cache, cookie and history cleanup.', category: 'Browser', lang: 'JavaScript', status: 'OPEN SOURCE', repo: gh('AutoClearExtension') },
  { name: 'Gmail Zenith', line: 'Rule-based inbox cleanup on the official Gmail API.', category: 'Automation', lang: 'Python', status: 'OPEN SOURCE', repo: gh('GmailZenith') },
  { name: 'Facebook Cleaner', line: 'Bulk-triage friends, groups and pages from a web GUI.', category: 'Automation', lang: 'Python', status: 'OPEN SOURCE', repo: gh('FacebookCleaner') },
  { name: 'TikTok Product Hunter', line: 'Matches Amazon products to TikTok Shop listings.', category: 'Automation', lang: 'Python', status: 'OPEN SOURCE', repo: gh('TikTokProductHunter') },
  { name: 'Brand Scrapers', line: 'ASIN scrapers, Keepa lookups, multi-thread cleaners.', category: 'Automation', lang: 'Python', status: 'OPEN SOURCE', repo: gh('BrandScrapers') },
  { name: 'Disk Optimizer Pro', line: 'Duplicate hunter and cleanup for C: and D: drives.', category: 'Desktop', lang: 'Python', status: 'OPEN SOURCE', repo: gh('DiskOptimizerPro') },
  { name: 'Chrome Monitor', line: 'Watches Chrome profiles, extensions and memory.', category: 'Desktop', lang: 'Python', status: 'OPEN SOURCE', repo: gh('ChromeMonitor') },
  { name: 'Urdu Poetry Studio', line: 'Nastaliq typography designer with 4K export.', category: 'Desktop', lang: 'JavaScript', status: 'OPEN SOURCE', repo: gh('Urdu-Poetry-Studio') },
  { name: 'Early Coding Archive', line: 'First Tkinter tools and a boiling-point ML model.', category: 'Desktop', lang: 'Python', status: 'OPEN SOURCE', repo: gh('Early-Coding-Archive') },
  { name: 'AI-Coding', line: 'Local coding agent with SSE streaming and approval gates.', category: 'AI', lang: 'JavaScript', status: 'OPEN SOURCE', repo: gh('AI-Coding') },
  { name: 'VideoStudio', line: 'Text- and image-to-video on free cloud GPUs.', category: 'AI', lang: 'Python', status: 'OPEN SOURCE', repo: gh('VideoStudio') },
  { name: 'AURA', line: 'Personal chief-of-staff agent for tasks and mail.', category: 'AI', lang: 'Python', status: 'PRIVATE' },
];

export const STACK: { group: string; note: string; tools: string[] }[] = [
  { group: 'Frontend & motion', note: 'what people touch', tools: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Three.js', 'Canvas'] },
  { group: 'Backend & data', note: 'what keeps it running', tools: ['FastAPI', 'Python', 'Postgres / Neon', 'SQLite', 'Azure', 'Docker'] },
  { group: 'Automation & media', note: 'what saves the hours', tools: ['Playwright', 'yt-dlp', 'aria2c', 'FFmpeg', 'Chrome MV3', 'Gmail API'] },
  { group: 'Science', note: 'what the degree is for', tools: ['Quantum ESPRESSO', 'Gaussian', 'ORCA', 'NumPy / SciPy', 'Cyclic voltammetry', 'EIS'] },
];
