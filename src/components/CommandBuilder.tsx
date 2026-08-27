import { useId, useMemo, useState } from "react";
import {
  automationVerbs,
  buildAutomationUrl,
  timerTargets,
  type AutomationVerb,
  type TimerTarget
} from "../content/siteContent";
import { CopyButton } from "./CopyButton";

function requireFirst<T>(items: readonly T[], label: string): T {
  const first = items[0];
  if (!first) {
    throw new Error(`Automation content is missing ${label}`);
  }
  return first;
}

const firstTarget: TimerTarget = requireFirst(timerTargets, "timer targets");
const firstVerb: AutomationVerb = requireFirst(automationVerbs, "automation verbs");

function verbsFor(target: TimerTarget): readonly AutomationVerb[] {
  return automationVerbs.filter((verb) => verb.kinds.includes(target.kind));
}

export function CommandBuilder() {
  const id = useId();
  const [targetId, setTargetId] = useState<string>(firstTarget.id);
  const [verbId, setVerbId] = useState<string>(firstVerb.id);
  const [value, setValue] = useState<string>(firstVerb.defaultValue ?? "");

  const target = timerTargets.find((entry) => entry.id === targetId) ?? firstTarget;
  const availableVerbs = useMemo(() => verbsFor(target), [target]);
  const verb =
    availableVerbs.find((entry) => entry.id === verbId) ?? availableVerbs[0] ?? firstVerb;

  const needsValue = verb.param !== undefined;
  const url = buildAutomationUrl(target.id, verb.id, needsValue ? value : undefined);

  const selectTarget = (nextId: string) => {
    const nextTarget = timerTargets.find((entry) => entry.id === nextId) ?? firstTarget;
    const nextVerbs = verbsFor(nextTarget);
    const keepVerb = nextVerbs.find((entry) => entry.id === verbId);
    const nextVerb = keepVerb ?? nextVerbs[0] ?? firstVerb;
    setTargetId(nextTarget.id);
    setVerbId(nextVerb.id);
    if (!keepVerb) {
      setValue(nextVerb.defaultValue ?? "");
    }
  };

  const selectVerb = (nextId: string) => {
    const nextVerb = availableVerbs.find((entry) => entry.id === nextId) ?? firstVerb;
    setVerbId(nextVerb.id);
    setValue(nextVerb.defaultValue ?? "");
  };

  return (
    <div className="command-builder">
      <div className="builder-fields">
        <div className="field">
          <label htmlFor={`${id}-target`}>Timer</label>
          <select
            id={`${id}-target`}
            value={target.id}
            onChange={(event) => selectTarget(event.target.value)}
          >
            {timerTargets.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.label}
                {entry.pro ? " (Pro)" : ""}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${id}-verb`}>Action</label>
          <select
            id={`${id}-verb`}
            value={verb.id}
            onChange={(event) => selectVerb(event.target.value)}
          >
            {availableVerbs.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={`${id}-value`}>{verb.paramLabel ?? "Value"}</label>
          <input
            id={`${id}-value`}
            type={verb.param === "number" ? "number" : "text"}
            inputMode={verb.param === "number" ? "numeric" : "text"}
            min={verb.param === "number" ? 0 : undefined}
            placeholder={verb.param === "time" ? "HH:MM" : undefined}
            value={needsValue ? value : ""}
            disabled={!needsValue}
            aria-disabled={!needsValue}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
      </div>

      <div className="command-output">
        <code>{url}</code>
        <CopyButton text={url} label="Copy command" />
      </div>
      <p className="command-hint">{verb.description}</p>

      <div className="shell-snippets">
        <div>
          <span className="code-block-label">
            Windows (Command Prompt / Stream Deck Open)
          </span>
          <pre className="code-block">{`start ${url}`}</pre>
        </div>
        <div>
          <span className="code-block-label">macOS (Terminal / Shortcuts)</span>
          <pre className="code-block">{`open "${url}"`}</pre>
        </div>
      </div>
    </div>
  );
}
