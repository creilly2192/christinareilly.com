// Direction A — Dark Log
// Near-black background, bold sans headline + mono body — a terminal-log feel.
// Cotton-candy / blush-rose / berry-crush / bordeaux show up as solid accent
// cards, not as page chrome.

const A_TOK = {
  paper: "#fefaf8", // near-white — lets the color cards pop
  paperDeep: "#f5ece7", // card background, one step up
  ink: "#241a10", // warm near-black — main text
  inkSoft: "#5c4a3d", // secondary text
  inkMute: "#7a6a60", // tertiary / meta text (darkened for contrast)
  rule: "#eae0da", // hairline
  link: "#e36888", // blush
  linkHover: "#c14f6c", // deeper blush
  accentText: "#b8456a", // accessible blush for small text/links on light bg
  peach: "#e36888", // blush accent fill
  peachInk: "#e36888", // blush accent ink
  cards: [
    { bg: "#e36888", text: "#fff6f2" }, // blush
    { bg: "#f08c21", text: "#341a00" }, // tangerine
    { bg: "#6698cc", text: "#f4f9ff" }, // sea
    { bg: "#b4b534", text: "#2a2b00" }, // matcha
  ],
};

const A_TOK_DARK = {
  paper: "#1b1712", // near-black warm base
  paperDeep: "#252019", // card background, one step up
  ink: "#f3ece4", // warm near-white — main text
  inkSoft: "#c9bdb0", // secondary text
  inkMute: "#a89a8c", // tertiary / meta text (darkened for contrast)
  rule: "#38312a", // hairline
  link: "#f0839e", // brighter blush for dark contrast
  linkHover: "#f6a4b8",
  accentText: "#f0839e", // already accessible on dark bg
  peach: "#f0839e",
  peachInk: "#f0839e",
  cards: [
    { bg: "#e36888", text: "#fff6f2" }, // blush
    { bg: "#f08c21", text: "#241a10" }, // tangerine
    { bg: "#6698cc", text: "#0e1a26" }, // sea
    { bg: "#b4b534", text: "#1a1b00" }, // matcha
  ],
};

function DirectionA({ tokens }) {
  const t = tokens || A_TOK;
  const [stamped, setStamped] = React.useState(false);
  const [pulse, setPulse] = React.useState(0);
  const [blink, setBlink] = React.useState(true);
  const [scratch, setScratch] = React.useState(false);
  React.useEffect(() => {
    const i = setInterval(() => setPulse((p) => p + 1), 1800);
    const b = setInterval(() => setBlink((v) => !v), 600);
    return () => {
      clearInterval(i);
      clearInterval(b);
    };
  }, []);

  return (
    <window.TokensCtx.Provider value={t}>
      <div
        className="ab"
        style={{
          width: 1280,
          minHeight: 1900,
          background: t.paper,
          color: t.ink,
          fontFamily: "Jost, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle paper texture via layered radial gradients */}
        <style>{`
        @keyframes a-wiggle{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(6deg) scale(1.06)}}
        @keyframes a-pop{0%{transform:scale(.6) rotate(-8deg);opacity:0}60%{transform:scale(1.1) rotate(4deg);opacity:1}100%{transform:scale(1) rotate(-8deg);opacity:1}}
        .a-badge{transition:transform .2s ease}
        .a-badge:hover{animation:a-wiggle .5s ease}
        .a-wo-card{transition:transform .25s ease,box-shadow .25s ease;cursor:default}
        .a-wo-card:hover{transform:translateY(-6px) rotate(var(--rot,-1deg));box-shadow:0 16px 28px rgba(36,26,16,.18)}
        .a-wo-arrow{transition:transform .25s ease}
        .a-wo-card:hover .a-wo-arrow{transform:translate(3px,-3px)}
        .a-book-cover{transition:transform .25s ease,box-shadow .25s ease}
        .a-book-row:hover .a-book-cover{transform:rotate(-3deg) translateY(-4px)}
        .a-footer-link{transition:transform .2s ease,color .2s ease}
        .a-footer-link:hover{transform:translateY(-2px)}
        .a-stamp{animation:a-pop .4s cubic-bezier(.2,1.4,.4,1)}
        .a-vinyl-wrap{cursor:pointer}
        .a-web{display:inline-block;position:relative}
        .a-web b{display:inline-block;font-style:normal;font-weight:inherit;transition:transform .15s}
        .a-web:hover b{animation:a-web-bounce .7s ease}
        .a-web:hover b:nth-child(1){animation-delay:0s;color:${t.cards[0].bg}}
        .a-web:hover b:nth-child(2){animation-delay:.08s;color:${t.cards[1].bg}}
        .a-web:hover b:nth-child(3){animation-delay:.16s;color:${t.cards[2].bg}}
        @keyframes a-web-bounce{0%,100%{transform:translateY(0) rotate(0)}30%{transform:translateY(-18px) rotate(-10deg)}60%{transform:translateY(5px) rotate(6deg)}}
      `}</style>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.6,
            backgroundImage: `radial-gradient(circle at 15% 0%, rgba(227,104,136,.07), transparent 45%),
           radial-gradient(circle at 90% 30%, rgba(240,140,33,.05), transparent 50%),
           radial-gradient(circle at 50% 100%, rgba(102,152,204,.05), transparent 45%)`,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "48px 96px 0",
            position: "relative",
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
            Christina Reilly
            <span
              onClick={() => setStamped((s) => !s)}
              style={{
                cursor: "pointer",
                userSelect: "none",
                position: "relative",
              }}
              title="psst — click me"
            >
              .
            </span>
            {stamped && (
              <span
                className="a-stamp"
                style={{
                  marginLeft: 14,
                  display: "inline-block",
                  transform: "rotate(-8deg)",
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  padding: "4px 10px",
                  border: `1.5px solid ${t.accentText}`,
                  color: t.accentText,
                  borderRadius: 3,
                  opacity: 0.85,
                }}
              >
                HELLO ✿
              </span>
            )}
          </div>
          <nav
            style={{
              display: "flex",
              gap: 28,
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: 12,
              letterSpacing: "0.06em",
              alignItems: "center",
            }}
          >
            <a
              href="reading-log.html"
              className="a-footer-link"
              style={{ color: t.inkSoft, textDecoration: "none" }}
            >
              reading log
            </a>
            {t.onToggleDark && (
              <button
                onClick={t.onToggleDark}
                aria-label="Toggle dark mode"
                style={{
                  cursor: "pointer",
                  border: `1.5px solid ${t.rule}`,
                  background: "transparent",
                  color: t.inkSoft,
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              >
                {t.dark ? (
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden>
                    <circle
                      cx="12"
                      cy="12"
                      r="5"
                      fill="none"
                      stroke={t.inkSoft}
                      strokeWidth="2"
                    />
                    <path
                      d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
                      stroke={t.inkSoft}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden>
                    <path
                      d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
                      fill="none"
                      stroke={t.inkSoft}
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            )}
          </nav>
        </div>

        {/* Hero — retro browser window chrome, floating pill address bar above */}
        <div style={{ padding: "84px 96px 96px", position: "relative" }}>
          <div
            style={{
              border: `2.5px solid ${t.dark ? "#000" : t.ink}`,
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: `10px 10px 0 ${t.dark ? "#000" : t.ink}`,
              position: "relative",
            }}
          >
            {/* Title bar */}
            <div
              style={{
                background: t.peachInk,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 18px",
                borderBottom: `2.5px solid ${t.dark ? "#000" : t.ink}`,
              }}
            >
              <span
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  background: t.cards[3].bg,
                  border: `2px solid ${t.ink}`,
                }}
              />
              <span
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  background: t.cards[1].bg,
                  border: `2px solid ${t.ink}`,
                }}
              />
              <span
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  background: t.cards[2].bg,
                  border: `2px solid ${t.ink}`,
                }}
              />
            </div>
            {/* Page content */}
            <div
              style={{
                background: t.paper,
                padding: "88px 64px 96px",
                position: "relative",
              }}
            >
              <h1
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontSize: 104,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  fontWeight: 600,
                  margin: 0,
                  maxWidth: 1040,
                  textWrap: "balance",
                }}
              >
                I make things
                <br />
                for the{" "}
                <span className="a-web" style={{ color: t.peachInk }}>
                  <b>w</b>
                  <b>e</b>
                  <b>b</b>
                </span>
                .
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 76,
                    background: t.cards[2].bg,
                    marginLeft: 10,
                    verticalAlign: "-6px",
                    opacity: blink ? 1 : 0,
                    transition: "opacity .1s",
                  }}
                />
              </h1>
              <p
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: 21,
                  lineHeight: 1.6,
                  color: t.inkSoft,
                  maxWidth: 640,
                  marginTop: 20,
                  fontWeight: 400,
                }}
              >
                A running log of what I'm reading, writing, and thinking about.
                <br />
                Updated when I get around to it.
              </p>
            </div>
          </div>
        </div>

        {/* Working On — full-width, prominent band right after the hero */}
        <div
          style={{
            padding: "72px 96px 96px",
            background: t.paperDeep || t.cards[3].bg + "22",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 24,
              marginBottom: 14,
            }}
          >
            <h2
              style={{
                fontFamily: "Jost, sans-serif",
                fontSize: 52,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <IconBadge name="code" bg={t.peachInk} fg={t.ink} />
              Working On<span style={{ color: t.peachInk }}>.</span>
            </h2>
            <div style={{ flex: 1 }} />
          </div>
          <div
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: 15,
              color: t.inkSoft,
              marginBottom: 26,
            }}
          >
            Sized roughly to how much room each one actually takes up in my
            life.
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridAutoRows: "minmax(230px, auto)",
              gap: 18,
              alignItems: "stretch",
            }}
          >
            {SITE.working.map((w, i) => {
              const c = t.cards[i % t.cards.length];
              const Tag = w.url ? "a" : "div";
              // Bento sizing: card 0 (tiny human) is the hero block, card 1 (day
              // job) is a wide banner, cards 2–3 (side projects) are small tiles.
              const layout = [
                { gridColumn: "1 / 7", gridRow: "1 / 3", rot: -1.4 },
                { gridColumn: "7 / 13", gridRow: "1 / 2", rot: 0.9 },
                { gridColumn: "7 / 10", gridRow: "2 / 3", rot: -1.6 },
                { gridColumn: "10 / 13", gridRow: "2 / 3", rot: 1.8 },
              ][i] || { gridColumn: "auto", gridRow: "auto", rot: 0 };
              const big = i === 0;
              const med = i === 1;
              return (
                <Tag
                  key={i}
                  href={w.url}
                  className="a-wo-card"
                  style={{
                    background: c.bg,
                    color: c.text,
                    borderRadius: big ? 14 : 10,
                    padding: big
                      ? "32px 34px 26px"
                      : med
                        ? "26px 30px"
                        : "20px 22px",
                    gridColumn: layout.gridColumn,
                    gridRow: layout.gridRow,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    position: "relative",
                    overflow: "hidden",
                    "--rot": `${layout.rot}deg`,
                  }}
                >
                  {big && w.icon && (
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        right: -26,
                        bottom: -30,
                        opacity: 0.16,
                        transform: "rotate(-10deg)",
                      }}
                    >
                      <Icon
                        name={w.icon}
                        size={140}
                        color={c.text}
                        strokeWidth={1.3}
                      />
                    </span>
                  )}
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    {w.project ? (
                      <span
                        style={{
                          fontFamily: "Instrument Sans, sans-serif",
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          padding: "3px 7px",
                          borderRadius: 4,
                          background: "rgba(255,255,255,.32)",
                        }}
                      >
                        PROJECT
                      </span>
                    ) : w.icon ? (
                      <span
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,.32)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon
                          name={w.icon}
                          size={14}
                          color={c.text}
                          strokeWidth={2.1}
                        />
                      </span>
                    ) : (
                      <span />
                    )}
                    {w.url && (
                      <span
                        className="a-wo-arrow"
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                          aria-hidden
                        >
                          <path
                            d="M7 17 17 7M9 7h8v8"
                            fill="none"
                            stroke={c.text}
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </span>
                  <span>
                    {w.title && (
                      <span
                        style={{
                          fontFamily: "Jost, sans-serif",
                          fontSize: 17,
                          fontWeight: 600,
                          display: "block",
                          marginBottom: 4,
                        }}
                      >
                        {w.title}
                      </span>
                    )}
                    <span
                      style={{
                        fontFamily: "Instrument Sans, sans-serif",
                        fontSize: big ? 30 : med ? 21 : 16,
                        lineHeight: big ? 1.18 : 1.3,
                        fontWeight: big ? 600 : 500,
                        letterSpacing: big ? "-0.01em" : "normal",
                        maxWidth: big ? "86%" : "100%",
                        textWrap: "pretty",
                        display: "block",
                      }}
                    >
                      {w.text}
                    </span>
                    {(w.lastTouched || w.since) && (
                      <span
                        style={{
                          fontFamily: "Instrument Sans, sans-serif",
                          fontSize: 11,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          opacity: 0.7,
                          display: "block",
                          marginTop: big ? 16 : 10,
                        }}
                      >
                        {w.since
                          ? `since ${w.since}`
                          : `last touched ${w.lastTouched}`}
                      </span>
                    )}
                  </span>
                </Tag>
              );
            })}
          </div>
        </div>

        {/* Currently */}
        <div style={{ padding: "96px 96px 0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 24,
              marginBottom: 56,
            }}
          >
            <h2
              style={{
                fontFamily: "Jost, sans-serif",
                fontSize: 52,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <IconBadge name="book" bg={t.peachInk} fg={t.ink} />
              Currently<span style={{ color: t.peachInk }}>.</span>
            </h2>
            <div style={{ flex: 1 }} />
            <div
              style={{
                fontFamily: "Instrument Sans, sans-serif",
                fontSize: 12,
                color: t.inkMute,
                letterSpacing: "0.08em",
              }}
            >
              UPDATED 05·08·26
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.15fr 1fr",
              gap: 96,
            }}
          >
            {/* Left column — Currently Reading */}
            <div>
              <SoftSectionLabel icon="book">Currently Reading</SoftSectionLabel>
              {SITE.reading.map((b) => (
                <SoftBookRow key={b.id} book={b} status="reading" />
              ))}

              <a
                href="reading-log.html"
                style={{
                  marginTop: 32,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  color: t.accentText,
                  textDecoration: "none",
                }}
              >
                view full reading log →
              </a>
            </div>

            {/* Right column — Now Listening */}
            <div>
              <SoftSectionLabel icon="headphones">
                Now Listening
              </SoftSectionLabel>
              <SoftListening pulse={pulse} t={t} />
            </div>
          </div>

          {/* Writing — full-width band, uses horizontal space */}
          <div style={{ marginTop: 96 }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 24,
                marginBottom: 40,
              }}
            >
              <h2
                style={{
                  fontFamily: "Jost, sans-serif",
                  fontSize: 52,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <IconBadge name="pencil" bg={t.peachInk} fg={t.ink} />
                Writing<span style={{ color: t.peachInk }}>.</span>
              </h2>
              <div style={{ flex: 1 }} />
              <div
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: 12,
                  color: t.inkMute,
                  letterSpacing: "0.08em",
                }}
              >
                {SITE.writing && SITE.writing.length > 0
                  ? `${SITE.writing.length} ENTRIES · LATEST FIRST`
                  : "COMING SOON"}
              </div>
            </div>
            <SoftWritingList items={SITE.writing} t={t} />
          </div>
        </div>

        <div style={{ height: 80 }} />

        {/* Footer */}
        <div
          style={{
            padding: "32px 96px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 96px",
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 11,
            color: t.inkMute,
            letterSpacing: "0.08em",
          }}
        >
          <span>© 2026 c. reilly · handcoded with care</span>
          <span style={{ display: "flex", gap: 22 }}>
            <a
              className="a-footer-link"
              style={{
                color: t.inkSoft,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon name="mail" size={13} />
              email
            </a>
            <a
              className="a-footer-link"
              style={{
                color: t.inkSoft,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon name="github" size={13} />
              github
            </a>
            <a
              className="a-footer-link"
              style={{
                color: t.inkSoft,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Icon name="rss" size={13} />
              rss
            </a>
          </span>
        </div>
      </div>
    </window.TokensCtx.Provider>
  );
}

function SoftSectionLabel({ children, icon }) {
  const t = React.useContext(window.TokensCtx) || A_TOK;
  return (
    <div
      style={{
        fontFamily: "Instrument Sans, sans-serif",
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: t.inkMute,
        marginBottom: 24,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {icon ? (
        <Icon name={icon} size={14} color={t.peachInk} />
      ) : (
        <span style={{ width: 14, height: 1, background: t.inkMute }} />
      )}
      {children}
    </div>
  );
}

function Icon({ name, size = 16, color = "currentColor", strokeWidth = 1.8 }) {
  const p = {
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  const glyphs = {
    book: (
      <>
        <path
          {...p}
          d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z"
        />
        <path {...p} d="M4 19a2.5 2.5 0 0 1 2.5-2.5H20" />
      </>
    ),
    bookmark: <path {...p} d="M6 3h12v18l-6-4.5L6 21V3Z" />,
    headphones: (
      <path
        {...p}
        d="M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4Zm16 0a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1Z"
      />
    ),
    code: <path {...p} d="m9 18-6-6 6-6m6 12 6-6-6-6" />,
    pencil: (
      <path
        {...p}
        d="M12 20h9M4 20h1.5L18 7.5a1.5 1.5 0 0 0 0-2.12l-1.38-1.4a1.5 1.5 0 0 0-2.12 0L2 16.5V20Z"
      />
    ),
    mail: (
      <>
        <path {...p} d="M3 6h18v12H3V6Z" />
        <path {...p} d="m3 6 9 7 9-7" />
      </>
    ),
    github: (
      <path
        {...p}
        strokeWidth={1.4}
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.4 9.4 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    ),
    rss: (
      <>
        <circle cx="5" cy="19" r="1.5" fill={color} stroke="none" />
        <path {...p} d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16" />
      </>
    ),
    baby: (
      <>
        <rect {...p} x="10.5" y="2.5" width="3" height="2.5" rx="1" />
        <rect {...p} x="9" y="5" width="6" height="3" rx="1" />
        <rect {...p} x="7.5" y="8" width="9" height="13" rx="2.5" />
        <path {...p} d="M9 12h2M9 15.5h2M9 19h2" />
      </>
    ),
    briefcase: (
      <>
        <path
          {...p}
          d="M3 8.5A1.5 1.5 0 0 1 4.5 7h15A1.5 1.5 0 0 1 21 8.5v10A1.5 1.5 0 0 1 19.5 20h-15A1.5 1.5 0 0 1 3 18.5v-10Z"
        />
        <path
          {...p}
          d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18"
        />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      {glyphs[name]}
    </svg>
  );
}

function IconBadge({ name, bg, fg, shape = "folder" }) {
  if (shape === "sticker") {
    return (
      <span
        className="a-badge"
        style={{
          width: 46,
          height: 46,
          background: bg,
          transform: "rotate(-3deg)",
          borderRadius: "38% 62% 63% 37% / 41% 39% 61% 59%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon name={name} size={22} color={fg} strokeWidth={2.1} />
      </span>
    );
  }
  return (
    <span
      className="a-badge"
      style={{
        position: "relative",
        width: 50,
        height: 42,
        display: "inline-flex",
        alignItems: "flex-end",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 3,
          width: "44%",
          height: 11,
          borderRadius: "6px 6px 0 0",
          background: bg,
          filter: "brightness(0.84)",
        }}
      />
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 8,
          left: 0,
          width: "100%",
          height: "calc(100% - 8px)",
          borderRadius: "3px 10px 10px 10px",
          background: bg,
          boxShadow: "0 4px 8px rgba(36,26,16,.16)",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: 8,
          left: 0,
          width: "100%",
          height: "calc(100% - 8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <Icon name={name} size={18} color={fg} strokeWidth={2.2} />
      </span>
    </span>
  );
}

function SoftBookRow({ book, status }) {
  const t = React.useContext(window.TokensCtx) || A_TOK;
  return (
    <div
      className="a-book-row"
      style={{
        display: "grid",
        gridTemplateColumns: "92px 1fr",
        gap: 28,
        padding: "20px 0",
      }}
    >
      <BookCover
        book={book}
        w={92}
        h={138}
        className="a-book-cover"
        style={{
          boxShadow:
            "0 8px 18px rgba(36,26,16,.20), 0 1px 2px rgba(36,26,16,.24)",
          borderRadius: 1.5,
        }}
      />
      <div>
        <div
          style={{
            fontFamily: "Jost, sans-serif",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
          }}
        >
          {book.title}
        </div>
        <div
          style={{
            fontSize: 13,
            color: t.inkSoft,
            marginTop: 6,
            letterSpacing: "0.01em",
            fontFamily: "Instrument Sans, sans-serif",
          }}
        >
          {book.author} · {book.year}
        </div>
        <p
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 15,
            lineHeight: 1.55,
            color: t.inkSoft,
            marginTop: 14,
            marginBottom: 14,
            maxWidth: 540,
          }}
        >
          {book.blurb}
        </p>
        <div
          style={{
            fontFamily: "Instrument Sans, sans-serif",
            fontSize: 11,
            color: t.inkMute,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            display: "flex",
            gap: 16,
          }}
        >
          {status === "reading" ? (
            <>
              <span style={{ color: t.accentText }}>● in progress</span>
              <span>
                checked out{" "}
                {(book.checkedOut || "").replace(", 2026", "").toLowerCase()}
              </span>
            </>
          ) : (
            <>
              <span>
                returned{" "}
                {(book.returned || "").replace(", 2026", "").toLowerCase()}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SoftListening({ pulse, t }) {
  const { album, artist, note } = SITE.listening;
  return (
    <div
      style={{
        background: t.paperDeep,
        borderRadius: 4,
        padding: "28px 140px 32px 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Vinyl record — slowly spinning, peeking off the right edge. Click to scratch it. */}
      {t.vinyl !== false && <SoftVinyl t={t} pulse={pulse} />}
      <style>{`
        @keyframes a-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      <div
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontSize: 11,
          letterSpacing: "0.18em",
          color: t.accentText,
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <EqBars t={t} />
        on repeat since {SITE.listening.onRepeatSince}
      </div>
      <div
        style={{
          fontFamily: "Jost, sans-serif",
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          marginTop: 14,
          lineHeight: 1.1,
        }}
      >
        {album}
      </div>
      <div
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontSize: 15,
          color: t.inkSoft,
          marginTop: 4,
          marginBottom: 16,
        }}
      >
        by {artist} · 2010
      </div>
      <div
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontSize: 13,
          color: t.inkMute,
          lineHeight: 1.5,
        }}
      >
        Part of{" "}
        <a
          href="#"
          style={{
            color: t.accentText,
            textDecoration: "underline",
            textUnderlineOffset: 2,
          }}
        >
          albumlog
        </a>
        , my project ranking the 500 greatest albums of all time, one week at a
        time.
      </div>
    </div>
  );
}

function EqBars({ t }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "flex-end",
        gap: 2,
        height: 10,
      }}
    >
      <style>{`@keyframes a-eq{0%,100%{height:3px}50%{height:10px}}`}</style>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 2.5,
            background: t.peachInk,
            borderRadius: 1,
            animation: `a-eq ${0.6 + i * 0.15}s ease-in-out infinite`,
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </span>
  );
}

function SoftVinyl({ t, pulse }) {
  // Concentric "grooves" as SVG circles. Slowly rotates. Center has a small
  // off-set label puck and a tiny spindle hole — clearly reads as vinyl.
  // Pulses subtly with the beat (scales the outer disc by ~1.5%). Click to
  // give it a quick DJ scratch — a little surprise.
  const beat = 1 + (pulse % 2 === 0 ? 0 : 0.015);
  const grooves = 14;
  const [scratching, setScratching] = React.useState(false);
  const doScratch = () => {
    if (scratching) return;
    setScratching(true);
    setTimeout(() => setScratching(false), 500);
  };
  return (
    <div
      aria-hidden
      className="a-vinyl-wrap"
      title="give it a scratch"
      onClick={doScratch}
      style={{
        position: "absolute",
        right: -90,
        top: -90,
        width: 220,
        height: 220,
        opacity: 0.85,
        pointerEvents: "auto",
        animation: scratching
          ? "a-scratch .5s ease"
          : "a-spin 14s linear infinite",
        transform: `scale(${beat})`,
        transition: "transform 1.6s ease",
      }}
    >
      <style>{`@keyframes a-scratch{0%{transform:rotate(0deg)}25%{transform:rotate(-35deg)}55%{transform:rotate(20deg)}80%{transform:rotate(-8deg)}100%{transform:rotate(0deg)}}`}</style>
      <svg
        viewBox="0 0 300 300"
        width="220"
        height="220"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft radial sheen so the disc isn't pure flat black */}
          <radialGradient id="a-vinyl-disc" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#2a2330" />
            <stop offset="55%" stopColor="#161118" />
            <stop offset="100%" stopColor="#0a0709" />
          </radialGradient>
        </defs>
        {/* Outer rim — slightly lighter ring catching "light" */}
        <circle cx="150" cy="150" r="148" fill="#1a141c" />
        <circle
          cx="150"
          cy="150"
          r="148"
          fill="none"
          stroke={t.peach}
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        {/* The disc itself — dark, so grooves read as record */}
        <circle cx="150" cy="150" r="142" fill="url(#a-vinyl-disc)" />
        <circle
          cx="150"
          cy="150"
          r="142"
          fill="none"
          stroke="#000"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        {/* Grooves — light against the dark disc */}
        {Array.from({ length: grooves }).map((_, i) => (
          <circle
            key={i}
            cx="150"
            cy="150"
            r={136 - i * 7}
            fill="none"
            stroke={i % 3 === 0 ? t.peach : "#ffffff"}
            strokeOpacity={i % 3 === 0 ? 0.32 : 0.1}
            strokeWidth="1"
          />
        ))}
        {/* Inner glossy band right before the label */}
        <circle
          cx="150"
          cy="150"
          r="40"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.06"
          strokeWidth="2"
        />
        {/* Label puck — peach, small + centered */}
        <circle cx="150" cy="150" r="34" fill={t.peach} fillOpacity="0.98" />
        <circle
          cx="150"
          cy="150"
          r="34"
          fill="none"
          stroke={t.peachInk}
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        {/* Label rings — give it printed-label texture */}
        <circle
          cx="150"
          cy="150"
          r="28"
          fill="none"
          stroke={t.peachInk}
          strokeOpacity="0.25"
          strokeWidth="0.5"
        />
        <circle
          cx="150"
          cy="150"
          r="14"
          fill="none"
          stroke={t.peachInk}
          strokeOpacity="0.3"
          strokeWidth="0.5"
        />
        {/* Label text */}
        <text
          x="150"
          y="146"
          textAnchor="middle"
          fontFamily="Instrument Sans, sans-serif"
          fontSize="7"
          fill={t.peachInk}
          fillOpacity="0.9"
          letterSpacing="1.2"
        >
          SIDE A
        </text>
        <text
          x="150"
          y="158"
          textAnchor="middle"
          fontFamily="Instrument Sans, sans-serif"
          fontSize="6"
          fill={t.peachInk}
          fillOpacity="0.65"
          letterSpacing="0.8"
        >
          33⅓ RPM
        </text>
        {/* Spindle hole — punched through to card background */}
        <circle cx="150" cy="150" r="3.5" fill={t.paperDeep} />
        <circle
          cx="150"
          cy="150"
          r="3.5"
          fill="none"
          stroke="#000"
          strokeOpacity="0.6"
          strokeWidth="0.5"
        />
        {/* Highlight sheen — wide arc of light across the upper-left of the disc */}
        <path
          d="M 36 150 A 114 114 0 0 1 150 36"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.14"
          strokeWidth="18"
        />
        <path
          d="M 50 150 A 100 100 0 0 1 150 50"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.08"
          strokeWidth="6"
        />
      </svg>
    </div>
  );
}

window.DirectionA = DirectionA;
window.A_TOK = A_TOK;
window.A_TOK_DARK = A_TOK_DARK;
window.Icon = Icon;
window.IconBadge = IconBadge;
window.SoftSectionLabel = SoftSectionLabel;
window.SoftBookRow = SoftBookRow;

function SoftWritingList({ items, t }) {
  // Empty state — quiet, on-brand placeholder. When `items` arrives the
  // markup below renders it instead of this card.
  if (!items || items.length === 0) {
    return (
      <div
        style={{
          fontFamily: "Instrument Sans, sans-serif",
          fontSize: 11,
          color: t.inkMute,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {SITE.writingEmptyNote}
      </div>
    );
  }

  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: 64,
        rowGap: 0,
      }}
    >
      {items.map((entry, i) => (
        <li
          key={entry.id}
          style={{
            padding: "24px 0",
            borderBottom: `1px solid ${t.rule}`,
            display: "grid",
            gridTemplateColumns: "120px 1fr",
            gap: 28,
            alignItems: "baseline",
          }}
        >
          <div
            style={{
              fontFamily: "Instrument Sans, sans-serif",
              fontSize: 11,
              color: t.inkMute,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {entry.date}
          </div>
          <div>
            {entry.tag && (
              <div
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: 11,
                  color: t.accentText,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {entry.tag}
              </div>
            )}
            <a
              href={entry.url || "#"}
              style={{
                fontFamily: "Jost, sans-serif",
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                color: t.ink,
                textDecoration: "none",
                display: "block",
                textWrap: "balance",
              }}
            >
              {entry.title}
            </a>
            {entry.dek && (
              <p
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: t.inkSoft,
                  margin: "12px 0 0",
                  textWrap: "pretty",
                }}
              >
                {entry.dek}
              </p>
            )}
            {entry.readMinutes && (
              <div
                style={{
                  fontFamily: "Instrument Sans, sans-serif",
                  fontSize: 11,
                  color: t.inkMute,
                  letterSpacing: "0.06em",
                  marginTop: 12,
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                <span>{entry.readMinutes} min read</span>
                <span style={{ color: t.accentText }}>read →</span>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

window.SoftWritingList = SoftWritingList;
