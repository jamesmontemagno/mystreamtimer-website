import { useEffect, useId, useState } from "react";
import { buildAutomationUrl } from "../content/siteContent";
import { CopyButton } from "./CopyButton";
import { Icon } from "./Icon";

const DEFAULT_MINUTES = 5;
const MAX_SECONDS = 99 * 60 + 59;

function formatClock(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
}

function clamp(value: number) {
  return Math.min(MAX_SECONDS, Math.max(0, value));
}

export function TimerDemo() {
  const id = useId();
  const [minutes, setMinutes] = useState(DEFAULT_MINUTES);
  const [prefix, setPrefix] = useState("Starting in");
  const [finishText, setFinishText] = useState("We're live!");
  const [remaining, setRemaining] = useState(DEFAULT_MINUTES * 60);
  const [status, setStatus] = useState<"idle" | "running" | "paused" | "finished">(
    "idle"
  );

  useEffect(() => {
    if (status !== "running") {
      return;
    }
    const interval = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          setStatus("finished");
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [status]);

  const isActive = status === "running" || status === "paused";
  const fileText =
    status === "finished"
      ? finishText
      : status === "idle"
        ? ""
        : `${prefix} ${formatClock(remaining)}`.trim();
  const overlayText =
    status === "idle" ? `${prefix} ${formatClock(remaining)}`.trim() : fileText;
  const command = buildAutomationUrl("countdown", "mins", String(minutes));

  const start = () => {
    if (status === "paused") {
      setStatus("running");
      return;
    }
    setRemaining(clamp(minutes * 60));
    setStatus("running");
  };

  const reset = () => {
    setStatus("idle");
    setRemaining(clamp(minutes * 60));
  };

  const adjust = (delta: number) => {
    if (isActive) {
      setRemaining((current) => clamp(current + delta));
    } else {
      const next = Math.min(99, Math.max(1, minutes + delta / 60));
      setMinutes(next);
      setRemaining(next * 60);
    }
  };

  const updateMinutes = (value: string) => {
    const parsed = Number.parseInt(value, 10);
    const next = Number.isNaN(parsed) ? 1 : Math.min(99, Math.max(1, parsed));
    setMinutes(next);
    if (!isActive) {
      setRemaining(next * 60);
      setStatus("idle");
    }
  };

  const statusLabel =
    status === "running"
      ? "Running"
      : status === "paused"
        ? "Paused"
        : status === "finished"
          ? "Finished"
          : "Ready";

  return (
    <div className="demo">
      <div className="demo-app card card-strong">
        <div className="demo-app-header">
          <span className="demo-app-title">
            <Icon name="timer" /> Countdown 1
          </span>
          <span
            className={`badge ${status === "running" ? "badge-live" : "badge-neutral"}`}
          >
            {statusLabel}
          </span>
        </div>

        <div className="demo-readout" aria-live="off">
          {status === "finished" ? finishText : `${prefix} ${formatClock(remaining)}`}
        </div>
        <p className="demo-writing">
          {status === "idle"
            ? "Waiting to write countdown.txt"
            : "Writing to countdown.txt"}
        </p>

        <div className="demo-controls">
          {status === "running" ? (
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setStatus("paused")}
            >
              Pause
            </button>
          ) : (
            <button type="button" className="button button-primary" onClick={start}>
              <Icon name="play" />
              {status === "paused" ? "Resume" : "Start"}
            </button>
          )}
          <button
            type="button"
            className="button button-ghost"
            onClick={() => adjust(-60)}
            aria-label="Subtract one minute"
          >
            −1 min
          </button>
          <button
            type="button"
            className="button button-ghost"
            onClick={() => adjust(60)}
            aria-label="Add one minute"
          >
            +1 min
          </button>
          <button type="button" className="button button-ghost" onClick={reset}>
            Reset
          </button>
        </div>

        <div className="demo-fields">
          <div className="field">
            <label htmlFor={`${id}-minutes`}>Minutes</label>
            <input
              id={`${id}-minutes`}
              type="number"
              inputMode="numeric"
              min={1}
              max={99}
              value={minutes}
              onChange={(event) => updateMinutes(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor={`${id}-prefix`}>Prefix</label>
            <input
              id={`${id}-prefix`}
              type="text"
              maxLength={32}
              value={prefix}
              onChange={(event) => setPrefix(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor={`${id}-finish`}>Finish text</label>
            <input
              id={`${id}-finish`}
              type="text"
              maxLength={32}
              value={finishText}
              onChange={(event) => setFinishText(event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="demo-output">
        <div className="demo-overlay" aria-label="Overlay preview">
          <span className="demo-overlay-label">Pop-out window · OBS window capture</span>
          <span className="demo-overlay-text">{overlayText}</span>
        </div>

        <div className="card demo-file">
          <div className="demo-file-header">
            <span>
              <Icon name="file" /> countdown.txt
            </span>
            <span className="badge badge-neutral">Read from file</span>
          </div>
          <pre className="code-block demo-file-body">{fileText || " "}</pre>
          <p className="small muted" style={{ margin: "0.75rem 0 0" }}>
            This is the entire file. OBS re-reads it every second and your text source
            does the styling.
          </p>
        </div>

        <div className="command-output">
          <code>{command}</code>
          <CopyButton text={command} label="Copy" />
        </div>
      </div>
    </div>
  );
}
