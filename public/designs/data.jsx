// Shared content for all three directions. One source of truth.

const SITE = {
  name: "Christina Reilly",
  hero: {
    headline: "I make things for the web.",
    sub: "This site is where I keep track of what I'm reading, writing, and thinking about.",
  },
  // Writing — empty for now. Drop entries here when ready:
  //   { id, title, date: 'May 10, 2026', dek: 'A short subtitle.',
  //     tag: 'essay' | 'note' | 'log', url: '#', readMinutes: 4 }
  writing: [],
  writingEmptyNote:
    "aug 04, 2026 — nothing published yet. this line updates when that changes.",
  reading: [
    {
      id: "mcteague",
      title: "McTeague",
      author: "Frank Norris",
      year: 1899,
      blurb:
        "A dark tale of greed and downfall in San Francisco set in the late 19th century.",
      // synthetic cover style (no copyrighted art)
      cover: { bg: "#e36888", ink: "#fff6f2", motif: "arch" },
      dewey: "813.4 / NOR",
      checkedOut: "Apr 28, 2026",
    },
  ],
  past: [
    {
      id: "sunrise",
      title: "Sunrise on the Reaping",
      author: "Suzanne Collins",
      year: 2025,
      blurb:
        "A prequel to The Hunger Games, exploring the origins of Haymitch.",
      cover: { bg: "#6698cc", ink: "#f4f9ff", motif: "flame" },
      dewey: "813.6 / COL",
      returned: "Apr 14, 2026",
    },
    {
      id: "wuthering",
      title: "Wuthering Heights",
      author: "Emily Brontë",
      year: 1847,
      blurb: "A gothic tale of love and revenge (mostly revenge) on the moors.",
      cover: { bg: "#b4b534", ink: "#2a2b00", motif: "moor" },
      dewey: "823.8 / BRO",
      returned: "Mar 02, 2026",
    },
    {
      id: "eden",
      title: "East of Eden",
      author: "John Steinbeck",
      year: 1952,
      blurb: "Finished January 2026 — I am officially a Steinbeck fangirl now.",
      cover: { bg: "#f2d88f", ink: "#4a3400", motif: "valley" },
      dewey: "813.5 / STE",
      returned: "Jan 27, 2026",
    },
    {
      id: "demon",
      title: "Demon Copperhead",
      author: "Barbara Kingsolver",
      year: 2022,
      blurb: "Appalachia by way of Dickens. Wrecked me in the best way.",
      cover: { bg: "#f08c21", ink: "#341a00", motif: "mountain" },
      dewey: "813.6 / KIN",
      returned: "Dec 11, 2025",
    },
  ],
  working: [
    { text: "Raising a tiny human.", icon: "baby", since: "may 2025" },
    {
      text: "Web builds & bug fixes @ 829 Studios as a Senior Web Developer.",
      icon: "briefcase",
      since: "2022",
    },
    {
      text: "pulls from your RSS feeds and hands you three picks each morning.",
      project: true,
      title: "Trio.Reads",
      lastTouched: "jul 22",
    },
    {
      text: "Listening my way through the top albums of all time, one week at a time.",
      project: true,
      title: "AlbumLog",
      url: "#",
      lastTouched: "aug 01",
    },
  ],
  listening: {
    album: "Body Talk",
    artist: "Robyn",
    year: 2010,
    note: "Trying to sit with this album all week without skipping.",
    week: "Week 18 / 500",
    progress: 0.62, // 62% through the week
    onRepeatSince: "jul 20",
  },
};

// A synthetic book-cover SVG. Uses only solid colors + type — no copyrighted art.
function BookCover({ book, w = 92, h = 138, style = {}, className = "" }) {
  const { bg, ink, motif } = book.cover;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      style={style}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${book.title} cover`}
    >
      <defs>
        <linearGradient id={`sp-${book.id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(0,0,0,.25)" />
          <stop offset="0.05" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={w} height={h} fill={bg} />
      {/* Subtle texture lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          x2={w}
          y1={(h / 8) * i + 0.5}
          y2={(h / 8) * i + 0.5}
          stroke={ink}
          strokeOpacity="0.04"
          strokeWidth="1"
        />
      ))}
      {/* Spine shadow */}
      <rect x="0" y="0" width="6" height={h} fill={`url(#sp-${book.id})`} />
      {/* Motif */}
      {motif === "arch" && (
        <path
          d={`M${w * 0.25} ${h * 0.78} L${w * 0.25} ${h * 0.5} A${w * 0.25} ${h * 0.18} 0 0 1 ${w * 0.75} ${h * 0.5} L${w * 0.75} ${h * 0.78} Z`}
          fill="none"
          stroke={ink}
          strokeOpacity="0.5"
          strokeWidth="1.2"
        />
      )}
      {motif === "flame" && (
        <circle
          cx={w / 2}
          cy={h * 0.55}
          r={w * 0.18}
          fill="none"
          stroke={ink}
          strokeOpacity="0.6"
          strokeWidth="1.5"
        />
      )}
      {motif === "moor" && (
        <path
          d={`M0 ${h * 0.7} Q${w * 0.3} ${h * 0.55} ${w * 0.5} ${h * 0.65} T${w} ${h * 0.62} L${w} ${h} L0 ${h} Z`}
          fill={ink}
          fillOpacity="0.18"
        />
      )}
      {motif === "valley" && (
        <path
          d={`M0 ${h * 0.78} L${w * 0.3} ${h * 0.6} L${w * 0.55} ${h * 0.72} L${w} ${h * 0.55} L${w} ${h} L0 ${h} Z`}
          fill={ink}
          fillOpacity="0.25"
        />
      )}
      {motif === "mountain" && (
        <path
          d={`M0 ${h * 0.78} L${w * 0.4} ${h * 0.45} L${w * 0.6} ${h * 0.6} L${w} ${h * 0.4} L${w} ${h} L0 ${h} Z`}
          fill={ink}
          fillOpacity="0.22"
        />
      )}
      {/* Top rule + title/author */}
      <line
        x1={w * 0.12}
        x2={w * 0.88}
        y1={h * 0.18}
        y2={h * 0.18}
        stroke={ink}
        strokeOpacity="0.6"
      />
      <line
        x1={w * 0.12}
        x2={w * 0.88}
        y1={h * 0.22}
        y2={h * 0.22}
        stroke={ink}
        strokeOpacity="0.3"
      />
      <text
        x={w / 2}
        y={h * 0.34}
        fill={ink}
        fontFamily="Newsreader, Georgia, serif"
        fontSize={w * 0.105}
        fontWeight="600"
        textAnchor="middle"
        style={{ letterSpacing: "0.02em" }}
      >
        {book.title.length > 16
          ? book.title.slice(0, 14) + "…"
          : book.title.toUpperCase()}
      </text>
      <text
        x={w / 2}
        y={h * 0.92}
        fill={ink}
        fontFamily="Geist, system-ui, sans-serif"
        fontSize={w * 0.07}
        fontWeight="400"
        textAnchor="middle"
        opacity="0.75"
      >
        {book.author}
      </text>
    </svg>
  );
}

// Shared tokens context — lets directions C / D wrap A / B with overrides.
const TokensCtx = React.createContext(null);

window.SITE = SITE;
window.BookCover = BookCover;
window.TokensCtx = TokensCtx;
