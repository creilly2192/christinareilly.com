export type ReadingStatus = "finished" | "current";

export type ReadingItem = {
  title: string;
  author?: string;
  status: ReadingStatus;
  date?: string; // ISO: YYYY-MM-DD
  note?: string; // one sentence max
  cover?: string;
};

export type ListeningItem = {
  title: string;
  artist: string;
  note?: string;
  link?: string;
};

export type WorkingItem = {
  text: string;
  link?: string;
  linkText?: string;
};
