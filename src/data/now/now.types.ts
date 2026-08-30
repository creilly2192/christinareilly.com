export type ReadingStatus = "finished" | "current";

type ReadingItemBase = {
  title: string;
  author?: string;
  note?: string; // one sentence max
  cover?: string;
  coverAlt?: string;
  goodreadsLink?: string;
};

// A currently-reading book shows no date (deliberate — see CLAUDE.md
// Decisions: start dates aren't shared). A finished book shows `returned`.
export type ReadingItem =
  | (ReadingItemBase & { status: "current" })
  | (ReadingItemBase & { status: "finished"; returned: string }); // display date, e.g. "Apr 28, 2026"

export type ListeningItem = {
  title: string;
  artist: string;
  since: string; // display date the current album has been "on repeat" — ledger's SINCE tag
  note?: string;
  link?: string;
};

// Every Working On card reads as ongoing, not a discrete edited artifact —
// all use the SINCE tag (no lastTouched variant).
export type WorkingItem = {
  text: string;
  since: string; // display string for the StatusTag, e.g. "2022" or "jul 22" — not ISO
  link?: string;
  linkText?: string;
};
