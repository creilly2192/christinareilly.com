function ReadingLog() {
  const t = window.A_TOK;
  return (
    <div
      className="ab"
      style={{
        width: 1280,
        minHeight: 1200,
        background: t.paper,
        color: t.ink,
        fontFamily: "Jost, sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          padding: "48px 96px 0",
        }}
      >
        <div
          style={{
            fontFamily: "Jost, sans-serif",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          Christina Reilly.
        </div>
        <a
          href="index.html"
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 12,
            letterSpacing: "0.06em",
            color: t.inkSoft,
            textDecoration: "none",
          }}
        >
          ← back home
        </a>
      </div>

      <div style={{ padding: "72px 96px 40px" }}>
        <h1
          style={{
            fontFamily: "Jost, sans-serif",
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <window.IconBadge name="book" bg={t.cards[0].bg} fg={t.ink} />
          Reading Log<span style={{ color: t.peachInk }}>.</span>
        </h1>
        <p
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 17,
            lineHeight: 1.6,
            color: t.inkSoft,
            maxWidth: 640,
            marginTop: 24,
          }}
        >
          Every book I've picked up and finished, oldest habit I've kept the
          longest.
        </p>
      </div>

      <div style={{ padding: "0 96px" }}>
        <window.SoftSectionLabel icon="book">
          Currently Reading
        </window.SoftSectionLabel>
        {SITE.reading.map((b) => (
          <window.SoftBookRow key={b.id} book={b} status="reading" />
        ))}

        <div style={{ marginTop: 64 }}>
          <window.SoftSectionLabel icon="bookmark">
            Past Reads
          </window.SoftSectionLabel>
          {SITE.past.map((b) => (
            <window.SoftBookRow key={b.id} book={b} status="past" />
          ))}
        </div>
      </div>

      <div style={{ height: 80 }} />
      <div
        style={{
          padding: "32px 96px 48px",
          margin: "0 96px",
          fontFamily: "Instrument Sans, sans-serif",
          fontSize: 11,
          color: t.inkMute,
          letterSpacing: "0.08em",
        }}
      >
        © 2026 c. reilly · handcoded with care
      </div>
    </div>
  );
}

const rlRoot = ReactDOM.createRoot(document.getElementById("root"));
rlRoot.render(
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      minHeight: "100vh",
      background: window.A_TOK.paper,
    }}
  >
    <ReadingLog />
  </div>,
);
