import type { ReactNode } from "react";
import type { IconName } from "../content/siteContent";

type IconProps = {
  name: IconName;
  className?: string;
  title?: string;
};

const paths: Record<IconName, ReactNode> = {
  timer: (
    <>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2.5M9 2h6M12 2v3" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </>
  ),
  popout: (
    <>
      <path d="M14 4h6v6M20 4l-8 8" />
      <path d="M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" />
    </>
  ),
  streamdeck: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <rect x="6.5" y="7.5" width="3.5" height="3.5" rx="0.8" />
      <rect x="12" y="7.5" width="3.5" height="3.5" rx="0.8" />
      <rect x="6.5" y="13" width="3.5" height="3.5" rx="0.8" />
      <rect x="12" y="13" width="3.5" height="3.5" rx="0.8" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  format: (
    <>
      <path d="M4 7V5h16v2M9 5v14M15 5v14M7 19h4M13 19h4" />
    </>
  ),
  keyboard: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" />
    </>
  ),
  play: <path d="M7 5v14l12-7z" fill="currentColor" stroke="none" />,
  sliders: (
    <>
      <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="10" cy="12" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  apple: (
    <path
      fill="currentColor"
      stroke="none"
      d="M16.37 12.64c.02 2.64 2.32 3.52 2.35 3.53-.02.06-.37 1.26-1.21 2.5-.73 1.07-1.49 2.14-2.68 2.16-1.17.02-1.55-.7-2.89-.7-1.34 0-1.76.68-2.87.72-1.15.04-2.03-1.16-2.77-2.23-1.5-2.18-2.65-6.17-1.11-8.86a4.3 4.3 0 0 1 3.63-2.2c1.13-.02 2.2.76 2.89.76.69 0 1.99-.94 3.35-.8.57.02 2.17.23 3.2 1.74-.08.05-1.91 1.12-1.89 3.38M14.2 5.7c.61-.74 1.02-1.77.91-2.8-.88.04-1.95.59-2.58 1.33-.57.65-1.06 1.7-.93 2.7.98.08 1.99-.5 2.6-1.23"
    />
  ),
  windows: (
    <path
      fill="currentColor"
      stroke="none"
      d="M3 5.5 10.5 4.4v7.2H3zm0 13 7.5 1.1v-7.1H3zm8.3 1.2L21 21v-8.5h-9.7zm0-15.4v7.3H21V3z"
    />
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2"
    />
  ),
  youtube: (
    <>
      <path d="M22 12s0-3.4-.43-5.03a2.6 2.6 0 0 0-1.83-1.83C18.1 4.7 12 4.7 12 4.7s-6.1 0-7.74.44A2.6 2.6 0 0 0 2.43 6.97C2 8.6 2 12 2 12s0 3.4.43 5.03a2.6 2.6 0 0 0 1.83 1.83c1.64.44 7.74.44 7.74.44s6.1 0 7.74-.44a2.6 2.6 0 0 0 1.83-1.83C22 15.4 22 12 22 12z" />
      <path d="m10 15 5-3-5-3z" fill="currentColor" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8zM5 15l.6 1.6L7.2 17.2l-1.6.6L5 19.4l-.6-1.6-1.6-.6 1.6-.6z" />
    </>
  ),
  check: <path d="m5 12 5 5L20 7" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  monitor: (
    <>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  )
};

export function Icon({ name, className, title }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...(className ? { className } : {})}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
