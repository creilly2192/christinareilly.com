export type ReadingStatus = "finished" | "current";

export type ReadingItem = {
  title: string;
  author?: string;
  status: ReadingStatus;
  date?: string; // ISO: YYYY-MM-DD
  note?: string; // one sentence max (by convention)
  cover?: string; // later: asset path or slug
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
};

export const now = {
  reading: [] as ReadingItem[],
  listening: [] as ListeningItem[],
  working: [] as WorkingItem[],
};
