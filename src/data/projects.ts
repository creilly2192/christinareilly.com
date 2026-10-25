// Side projects for the /projects log page. Separate from the homepage's
// Working On cards (data/now/working.ts) on purpose: this list can grow to
// include past/shelved projects, which the homepage never shows.

type ProjectItemBase = {
  title: string;
  role: string; // e.g. "Design & build" — shown where the reading log shows the author
  year?: number;
  note?: string;
  link?: string;
  since?: string; // display string, same format as the homepage Working On cards, e.g. "aug 2026"
  // Screenshot in public/projects/ — width/height are the file's real pixel
  // size, used only so the browser can reserve the right aspect ratio.
  image?: { src: string; alt: string; width: number; height: number };
};

// "active" projects show a dateless "ongoing" tag; "past" ones show when they ended.
export type ProjectItem =
  | (ProjectItemBase & { status: "active" })
  | (ProjectItemBase & { status: "past"; ended: string }); // display date, e.g. "Mar 2026"

export const projects: ProjectItem[] = [
  {
    title: "Trio.Reads",
    role: "Design & build",
    year: 2026,
    note: "Pulls from your RSS feeds and hands you three picks each morning. Built because I kept opening a reader with 400 unread items and closing it again.",
    link: "https://trioreads.netlify.app/app",
    since: "aug 2026",
    image: {
      src: "trio.webp",
      alt: "Screenshot of Trio.Reads",
      width: 1200,
      height: 725,
    },
    status: "active",
  },
  {
    title: "AlbumLog",
    role: "Design & build",
    year: 2026,
    note: "Listening my way through the 500 greatest albums of all time, one week at a time. A week per album, notes as I go.",
    link: "https://albumlog.app",
    since: "feb 2026",
    image: {
      src: "albumlog.webp",
      alt: "Screenshot of AlbumLog",
      width: 1200,
      height: 651,
    },
    status: "active",
  },
  {
    title: "Christina Reilly",
    role: "Design & build",
    since: "2016",
    // No link on purpose — visitors are already on it.
    // Placeholder — reuses AlbumLog's screenshot until this site has its own.
    // Alt text says so, so screen readers aren't told it's this site.
    image: {
      src: "albumlog.webp",
      alt: "Placeholder screenshot (AlbumLog)",
      width: 1200,
      height: 651,
    },
    // Draft copy — Christina to confirm.
    note: "The site you're on: a running, dated log of what I'm reading, listening to, and building.",
    status: "active",
  },
];
