// main.jsx — Soft direction, fuchsia accent. Single live view + Tweaks.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  vinyl: true,
}; /*EDITMODE-END*/

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [dark, setDark] = React.useState(
    () => localStorage.getItem("cr-dark") === "1",
  );
  const [scale, setScale] = React.useState(1);
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    const onResize = () => setScale(Math.min(1, window.innerWidth / 1280));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const base = dark ? window.A_TOK_DARK : window.A_TOK;
  const tokens = {
    ...base,
    vinyl: t.vinyl,
    dark,
    onToggleDark: () => {
      setDark((d) => {
        localStorage.setItem("cr-dark", !d ? "1" : "0");
        return !d;
      });
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        background: tokens.paper,
        transition: "background .2s ease",
      }}
    >
      <div
        ref={wrapRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          width: 1280,
          marginBottom: scale < 1 ? -1900 * (1 - scale) : 0,
        }}
      >
        <DirectionA tokens={tokens} />
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Now Listening">
          <TweakToggle
            label="Spinning vinyl animation"
            value={t.vinyl}
            onChange={(v) => setTweak("vinyl", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
