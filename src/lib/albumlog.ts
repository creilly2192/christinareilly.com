// Build-time fetch of AlbumLog's public "now playing" endpoint. Fail-soft:
// any network error, non-OK response, or unexpected shape returns null
// rather than throwing, so a bad response or outage never breaks the build.
const ALBUMLOG_NOW_URL = "https://www.albumlog.app/api/now.json";

export type NowPlaying = {
  title: string;
  artist: string;
  year: number;
  label: string;
  genres: string[];
  rankRollingStone: number | null;
  rankAppleMusic: number | null;
};

type RawAlbumLogResponse = {
  album?: {
    title?: unknown;
    artist?: unknown;
    year?: unknown;
    label?: unknown;
    genres?: unknown;
    rank_rs?: unknown;
    rank_apple?: unknown;
  };
};

const isRawAlbumLogResponse = (value: unknown): value is RawAlbumLogResponse =>
  typeof value === "object" && value !== null;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((v) => typeof v === "string");

export async function getNowPlaying(): Promise<NowPlaying | null> {
  try {
    const res = await fetch(ALBUMLOG_NOW_URL);
    if (!res.ok) return null;

    const data: unknown = await res.json();
    if (!isRawAlbumLogResponse(data)) return null;

    const { album } = data;
    if (typeof album?.title !== "string" || typeof album?.artist !== "string") {
      return null;
    }

    return {
      title: album.title,
      artist: album.artist,
      year: typeof album.year === "number" ? album.year : 0,
      label: typeof album.label === "string" ? album.label : "",
      genres: isStringArray(album.genres) ? album.genres : [],
      rankRollingStone:
        typeof album.rank_rs === "number" ? album.rank_rs : null,
      rankAppleMusic:
        typeof album.rank_apple === "number" ? album.rank_apple : null,
    };
  } catch {
    return null;
  }
}
