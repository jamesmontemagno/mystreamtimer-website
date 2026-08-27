import { Icon } from "./Icon";

const keys = [
  { icon: "timer", label: "Down 1\n5 min", tone: "" },
  { icon: "clock", label: "Down 1\nPause", tone: "warm" },
  { icon: "file", label: "File\n10 min", tone: "accent" },
  { icon: "sliders", label: "File\nReset", tone: "" },
  { icon: "timer", label: "Up 1\nStart", tone: "accent" },
  { icon: "clock", label: "Clock\nStart", tone: "" },
  { icon: "link", label: "Down 2\nTop of hour", tone: "warm" },
  { icon: "timer", label: "Down 1\nStop", tone: "" }
] as const;

export function StreamDeckKeys() {
  return (
    <div
      className="sd-keys"
      role="img"
      aria-label="Illustration of a Stream Deck with My Stream Timer keys"
    >
      {keys.map((key) => (
        <div className={`sd-key ${key.tone}`.trim()} key={key.label}>
          <Icon name={key.icon} />
          <span>
            {key.label.split("\n").map((line, index) => (
              <span
                key={line}
                style={
                  index === 0 ? { display: "block" } : { display: "block", opacity: 0.75 }
                }
              >
                {line}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
