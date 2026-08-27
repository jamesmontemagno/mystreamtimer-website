export type Platform = "mac" | "windows";

export type CommandEntry = {
  command: string;
  description: string;
};

export type TroubleshootingEntry = {
  title: string;
  detail: string;
};

export type ScreenshotEntry = {
  src: string;
  fallback: string;
  thumb: string;
  alt: string;
  caption: string;
  platform: Platform;
};

export type SeoEntry = {
  title: string;
  description: string;
  path: string;
  robots?: string;
};

export type IconName =
  | "timer"
  | "file"
  | "popout"
  | "streamdeck"
  | "link"
  | "clock"
  | "format"
  | "keyboard"
  | "play"
  | "sliders"
  | "apple"
  | "windows"
  | "github"
  | "youtube"
  | "sparkles"
  | "check"
  | "copy"
  | "sun"
  | "moon"
  | "monitor"
  | "mail";

export type FeatureEntry = {
  icon: IconName;
  title: string;
  description: string;
};

export type StreamDeckActionEntry = {
  name: string;
  mode: "app" | "file";
  summary: string;
  detail: string;
};

export type TimerKind = "countdown" | "countup" | "time";

export type TimerTarget = {
  id: string;
  label: string;
  kind: TimerKind;
  pro?: boolean;
};

export type AutomationVerb = {
  id: string;
  label: string;
  description: string;
  kinds: readonly TimerKind[];
  param?: "number" | "time";
  paramLabel?: string;
  defaultValue?: string;
};

export type FaqEntry = {
  question: string;
  answer: string;
};

export type ProTier = {
  name: string;
  description: string;
};

export type ChangelogEntry = {
  title: string;
  platform: "windows" | "mac" | "streamdeck";
  version: string;
  points: readonly string[];
};

export const siteMetadata = {
  siteName: "My Stream Timer",
  siteUrl: "https://mystreamtimer.com",
  defaultTitle:
    "My Stream Timer | Countdown, Count-Up & Clock Overlays for OBS and Stream Deck",
  defaultDescription:
    "My Stream Timer writes live countdown, count-up, and clock text files for OBS, Streamlabs, and any streaming app. Native for macOS and Windows with an official Stream Deck plugin and mystreamtimer:// automation.",
  defaultSocialImage: "https://mystreamtimer.com/og-image.png",
  defaultSocialImageAlt:
    "My Stream Timer app on macOS and Windows with a green countdown overlay reading Starting in 00:02:32"
} as const;

export const seoEntries: Readonly<Record<string, SeoEntry>> = {
  "/": {
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    path: "/"
  },
  "/download": {
    title: "Download My Stream Timer for macOS, Windows, and Stream Deck",
    description:
      "Get My Stream Timer from the Mac App Store or Microsoft Store, install the Stream Deck plugin, and unlock Pro for more timers, pop-out windows, and formats.",
    path: "/download"
  },
  "/streamdeck": {
    title: "My Stream Timer for Stream Deck | Official Plugin",
    description:
      "Start, pause, adjust, and stop My Stream Timer countdowns from a Stream Deck key, or run standalone file timers that write straight to a text file for OBS.",
    path: "/streamdeck"
  },
  "/automation": {
    title: "Automation & mystreamtimer:// Commands | My Stream Timer",
    description:
      "Every mystreamtimer:// URL command for countdowns, count-ups, and the clock. Build a command, copy it, and trigger it from Stream Deck, scripts, Shortcuts, or the terminal.",
    path: "/automation"
  },
  "/screenshots": {
    title: "My Stream Timer Screenshots | macOS and Windows",
    description:
      "See My Stream Timer on macOS and Windows: the timer dashboard, pop-out overlays, OBS integration, Current Time clock, and the Automation command builder.",
    path: "/screenshots"
  },
  "/support": {
    title: "My Stream Timer Support, FAQ and Troubleshooting",
    description:
      "Fix OBS text not updating, macOS file access prompts, missing beeps, and Stream Deck plugin questions. Contact Refractored LLC for My Stream Timer help.",
    path: "/support"
  },
  "/privacy": {
    title: "My Stream Timer Privacy Policy",
    description:
      "Read the My Stream Timer privacy policy covering data collection, third-party sharing, and how Refractored LLC handles website and app privacy.",
    path: "/privacy"
  },
  "/404": {
    title: "Page Not Found | My Stream Timer",
    description:
      "The page you requested could not be found. Return to the My Stream Timer homepage or browse downloads and screenshots.",
    path: "/404",
    robots: "noindex, nofollow"
  }
} as const;

export const storeLinks = {
  apple: "https://apps.apple.com/us/app/my-stream-timer/id1460539461?mt=12",
  microsoft: "https://apps.microsoft.com/detail/9n5nxx3wk7k7",
  // Set to the Elgato Marketplace listing URL once published. While null, the site shows "Coming soon".
  streamDeckPlugin: null as string | null,
  github: "https://github.com/jamesmontemagno/MyStreamTimer",
  githubIssues: "https://github.com/jamesmontemagno/MyStreamTimer/issues",
  youtubeWalkthrough: "https://youtu.be/j_GdGIdDRxI",
  youtubeVideoId: "j_GdGIdDRxI",
  deckboard: "https://daraoladapo.github.io/stream-deckboard/",
  tinyToolTown: "https://www.tinytooltown.com/",
  supportEmail: "mailto:refractoredllc@gmail.com?subject=My%20Stream%20Timer%20Support"
} as const;

export function isPluginAvailable() {
  return storeLinks.streamDeckPlugin !== null;
}

export const platformRequirements = {
  mac: "macOS 12 Monterey or later",
  windows: "Windows 10 (1809) or Windows 11",
  streamDeck: "Stream Deck software 7.1 or later on macOS or Windows"
} as const;

export const features: readonly FeatureEntry[] = [
  {
    icon: "timer",
    title: "Seven timers, one dashboard",
    description:
      "Four countdowns, two count-ups, and a live clock. Each one has its own file, format, and controls so every scene can have its own timer."
  },
  {
    icon: "file",
    title: "Text files OBS can read",
    description:
      "Every tick is written to a plain .txt file. Point an OBS or Streamlabs text source at it and the overlay updates live, no plugins required."
  },
  {
    icon: "popout",
    title: "Pop-out overlay windows",
    description:
      "Float a chroma-green timer window over OBS or onto a second monitor, with your own font, size, and colors. Ideal for window capture."
  },
  {
    icon: "streamdeck",
    title: "Official Stream Deck plugin",
    description:
      "Start, pause, add time, reset, or stop any timer from a key. Run standalone file timers straight from the Stream Deck, even when the app is closed."
  },
  {
    icon: "link",
    title: "Automation with a URL",
    description:
      "Fire mystreamtimer:// links from scripts, Shortcuts, Raycast, Alfred, or a browser. The app launches itself if it is not already running."
  },
  {
    icon: "clock",
    title: "Current time clock",
    description:
      "Show the wall clock in 12 or 24-hour format with or without AM/PM, written to time.txt for your schedule and intermission scenes."
  },
  {
    icon: "format",
    title: "Flexible output formats",
    description:
      "Auto, total seconds, minutes:seconds, or a custom template like {0:hh\\:mm\\:ss} with prefix text such as “Starting in”."
  },
  {
    icon: "keyboard",
    title: "Built for live production",
    description:
      "Keyboard shortcuts, count down to a clock time or the top of the hour, beeps at zero, and your PC stays awake while a timer runs."
  }
];

export const obsSteps = [
  {
    title: "Copy the output folder",
    detail:
      "Open My Stream Timer, start a timer, and use Open folder (or the copy icon) to grab the folder where countdown.txt and friends live."
  },
  {
    title: "Add a Text source",
    detail:
      "In OBS or Streamlabs add a Text (GDI+ / FreeType 2) source to your scene and turn on Read from file."
  },
  {
    title: "Pick the timer file",
    detail:
      "Browse to the folder and choose countdown.txt, countup.txt, or time.txt. On macOS press Cmd + Shift + G in the picker and paste the path."
  },
  {
    title: "Go live",
    detail:
      "Start the timer and your overlay updates every second. Style the text source however you like; the app only writes the words."
  }
] as const;

export const streamDeckActions: readonly StreamDeckActionEntry[] = [
  {
    name: "App Timer Start",
    mode: "app",
    summary: "Start any Countdown, Count Up, or Current Time output in the app.",
    detail:
      "Pick the timer and how it starts: from minutes or seconds, to a clock time, or to the top of the hour. Uses the mystreamtimer:// protocol so the app launches if it is closed."
  },
  {
    name: "App Timer Control",
    mode: "app",
    summary: "Pause, resume, add or subtract time, reset, or stop an app timer.",
    detail:
      "Map one key per control you use on air: +1 minute, −30 seconds, pause/resume, reset, and stop. Current Time supports start and stop."
  },
  {
    name: "Stream Deck Start",
    mode: "file",
    summary:
      "Start or restart a timer that runs inside the plugin and writes to a text file.",
    detail:
      "No app required. Choose Countdown, Count Up, or Current Time, a duration, an output folder, and a file name, then point OBS at the file."
  },
  {
    name: "Stream Deck Control",
    mode: "file",
    summary: "Pause, resume, reset, or stop a plugin file timer.",
    detail:
      "Matches the file timer by its output folder and file name, so a whole profile of keys can drive the same timer."
  }
];

export const streamDeckInstallSteps = [
  "Download the .streamDeckPlugin installer and double-click it. Stream Deck 7.1 or newer installs it on macOS and Windows.",
  "Drag a My Stream Timer action from the actions list onto a key.",
  "In the property inspector pick the timer, the action, and any value such as minutes or a clock time.",
  "For file timers, use Copy output file path and paste it into an OBS text source set to Read from file."
] as const;

export const timerTargets: readonly TimerTarget[] = [
  { id: "countdown", label: "Countdown 1", kind: "countdown" },
  { id: "countdown2", label: "Countdown 2", kind: "countdown" },
  { id: "countdown3", label: "Countdown 3", kind: "countdown" },
  { id: "countdown4", label: "Countdown 4", kind: "countdown", pro: true },
  { id: "countup", label: "Count Up 1", kind: "countup" },
  { id: "countup2", label: "Count Up 2", kind: "countup", pro: true },
  { id: "time", label: "Current Time", kind: "time", pro: true }
];

export const automationVerbs: readonly AutomationVerb[] = [
  {
    id: "mins",
    label: "Start from minutes",
    description: "Starts the timer from a number of minutes.",
    kinds: ["countdown", "countup"],
    param: "number",
    paramLabel: "Minutes",
    defaultValue: "15"
  },
  {
    id: "secs",
    label: "Start from seconds",
    description: "Starts the timer from a number of seconds.",
    kinds: ["countdown", "countup"],
    param: "number",
    paramLabel: "Seconds",
    defaultValue: "90"
  },
  {
    id: "to",
    label: "Count down to a clock time",
    description: "Counts down until the given 24-hour time, for example 15:30.",
    kinds: ["countdown"],
    param: "time",
    paramLabel: "Time (24-hour)",
    defaultValue: "15:30"
  },
  {
    id: "topofhour",
    label: "Count down to the top of the hour",
    description: "Counts down until the next :00.",
    kinds: ["countdown"]
  },
  {
    id: "start",
    label: "Start",
    description: "Starts writing the current time.",
    kinds: ["time"]
  },
  {
    id: "addmins",
    label: "Add minutes",
    description: "Adds minutes to the running timer.",
    kinds: ["countdown", "countup"],
    param: "number",
    paramLabel: "Minutes",
    defaultValue: "1"
  },
  {
    id: "addsecs",
    label: "Add seconds",
    description: "Adds seconds to the running timer.",
    kinds: ["countdown", "countup"],
    param: "number",
    paramLabel: "Seconds",
    defaultValue: "30"
  },
  {
    id: "subtractmins",
    label: "Subtract minutes",
    description: "Removes minutes from the running timer.",
    kinds: ["countdown", "countup"],
    param: "number",
    paramLabel: "Minutes",
    defaultValue: "1"
  },
  {
    id: "subtractsecs",
    label: "Subtract seconds",
    description: "Removes seconds from the running timer.",
    kinds: ["countdown", "countup"],
    param: "number",
    paramLabel: "Seconds",
    defaultValue: "30"
  },
  {
    id: "pause",
    label: "Pause",
    description: "Pauses the running timer and keeps the file as is.",
    kinds: ["countdown", "countup"]
  },
  {
    id: "resume",
    label: "Resume",
    description: "Resumes a paused timer.",
    kinds: ["countdown", "countup"]
  },
  {
    id: "reset",
    label: "Reset",
    description: "Resets the timer to its configured start value.",
    kinds: ["countdown", "countup"]
  },
  {
    id: "stop",
    label: "Stop",
    description: "Stops the timer and clears the output file.",
    kinds: ["countdown", "countup", "time"]
  }
];

export const automationExamples: readonly CommandEntry[] = [
  {
    command: "mystreamtimer://countdown/?mins=15",
    description:
      "Start a 15-minute countdown. Great for intros, breaks, and timed announcements."
  },
  {
    command: "mystreamtimer://countdown/?secs=90",
    description: "Start a 90-second countdown on Countdown 1."
  },
  {
    command: "mystreamtimer://countdown/?to=15:30",
    description: "Count down to 3:30 PM using a 24-hour clock time."
  },
  {
    command: "mystreamtimer://countdown/?topofhour",
    description:
      "Count down to the next hour, perfect for “starting at the top of the hour”."
  },
  {
    command: "mystreamtimer://countdown2/?pause",
    description: "Pause Countdown 2. Swap the target for any countdown or count-up."
  },
  {
    command: "mystreamtimer://countup/?addmins=1",
    description: "Add a minute to Count Up 1 while it runs."
  },
  {
    command: "mystreamtimer://countdown/?stop",
    description: "Stop Countdown 1 and clear its text file."
  },
  {
    command: "mystreamtimer://time/?start",
    description: "Start the Current Time clock output (Pro)."
  }
];

export const proFeatures = [
  "Countdown 4, Count Up 2, and the Current Time clock",
  "Pop-out timer windows with custom font, size, text color, and background",
  "Auto, total seconds, total minutes, and custom output formats",
  "Automation commands for every timer, including the clock",
  "Supports ongoing development of the app and Stream Deck plugin"
] as const;

export const proTiers: readonly ProTier[] = [
  { name: "Lifetime", description: "One-time purchase. Yours forever on that platform." },
  { name: "Monthly", description: "Billed every month. Cancel any time." },
  {
    name: "6 Months",
    description: "Best value subscription for a full season of streams."
  }
];

export const changelog: readonly ChangelogEntry[] = [
  {
    title: "Windows 3.0: rebuilt on WinUI 3",
    platform: "windows",
    version: "3.0",
    points: [
      "Brand-new Fluent design with sidebar navigation, Mica, and Light, Dark, and System themes.",
      "Rename timers and pick an icon for each one in Settings › Timers.",
      "Pop-out timer windows (Pro) with custom font, size, and colors.",
      "Automation page with a command builder that generates mystreamtimer:// URLs.",
      "Output folder management, per-timer +1 / −1 minute, and keyboard shortcuts (Space, P, R, Ctrl+Shift+1…7).",
      "Pro monthly and 6-month subscriptions alongside the lifetime tiers.",
      "mystreamtimer://time/?start and ?stop for the clock, and your PC stays awake while a timer runs.",
      "Existing settings, file names, output folder, and Pro unlocks carry over automatically."
    ]
  },
  {
    title: "macOS: native SwiftUI app",
    platform: "mac",
    version: "3.0",
    points: [
      "Rewritten in SwiftUI with a sidebar of Countdowns, Count Up, and Clock timers.",
      "Live badges show which timers are writing files right now.",
      "Duration or clock-time mode per countdown, plus custom output templates.",
      "Automation page with a command builder, copy, and Run in App.",
      "Pro with Lifetime, Monthly, and 6 Months options, offer codes, and restore purchases."
    ]
  },
  {
    title: "Stream Deck plugin 2.0",
    platform: "streamdeck",
    version: "2.0",
    points: [
      "Rebuilt on Elgato's official Stream Deck SDK for Stream Deck 7.1+ on macOS and Windows.",
      "App Timer Start and App Timer Control actions for every timer in the app.",
      "Stream Deck Start and Stream Deck Control run standalone file timers without launching the app.",
      "Copy output file path from the property inspector for quick OBS setup.",
      "Uses new plugin and action identifiers, so keys from the legacy plugin need to be re-added."
    ]
  }
];

export const troubleshootingItems: readonly TroubleshootingEntry[] = [
  {
    title: "OBS or Streamlabs text is not updating",
    detail:
      "Make sure the text source has Read from file enabled and points at the exact file for the timer you started, such as countdown.txt rather than countdown2.txt. Use Open folder in the app to confirm the path."
  },
  {
    title: "macOS: files cannot be saved",
    detail:
      "Rarely, macOS needs you to grant access. Open System Settings › Privacy & Security › Full Disk Access and add My Stream Timer, or choose a different output folder in Settings."
  },
  {
    title: "macOS: no beeps when a timer ends",
    detail:
      "My Stream Timer uses the system alert sound. In System Settings › Sound, turn on Play user interface sound effects and set the alert output device."
  },
  {
    title: "Stream Deck keys stopped working after upgrading",
    detail:
      "Version 2 of the plugin uses new identifiers. Remove the old My Stream Timer keys and add them again from the new actions list."
  }
];

export const faqItems: readonly FaqEntry[] = [
  {
    question: "Does My Stream Timer work with OBS, Streamlabs, and other apps?",
    answer:
      "Yes. The app writes plain text files, so anything that can read a text file works: OBS Studio, Streamlabs Desktop, XSplit, vMix, Wirecast, and more."
  },
  {
    question: "Do I need the app for the Stream Deck plugin?",
    answer:
      "Not for everything. App Timer actions control the desktop app, while Stream Deck Start and Control run their own timers inside the plugin and write a text file directly. Install the app for pop-out windows, formats, and the full dashboard."
  },
  {
    question: "What does Pro unlock?",
    answer:
      "Countdown 4, Count Up 2, the Current Time clock, pop-out windows, and the extra output formats. Pro is available as a Lifetime purchase or a Monthly or 6 Months subscription through the App Store or Microsoft Store."
  },
  {
    question: "Can I show a message like “Starting in” before the time?",
    answer:
      "Yes. Each timer has a prefix and format. Use a custom template such as Starting in {0:hh\\:mm\\:ss} and the text file will include the words."
  },
  {
    question: "Do I have to buy Pro on both macOS and Windows?",
    answer:
      "Purchases are handled by each store, so macOS and Windows Pro are separate. Your timer settings and Pro status carry over when you update the app on the same platform."
  },
  {
    question: "Is there a command line or scripting option?",
    answer:
      'Yes. On Windows run start mystreamtimer://countdown/?mins=6 and on macOS run open "mystreamtimer://countdown/?mins=6". The Automation page lists every command.'
  }
];

export const screenshotItems: readonly ScreenshotEntry[] = [
  {
    src: "/screenshots/mac-1.webp",
    fallback: "/screenshots/mac-1.png",
    thumb: "/screenshots/mac-1-thumb.webp",
    alt: "My Stream Timer on macOS showing Countdown 1 running with a green pop-out overlay reading Starting in 00:02:32",
    caption: "Countdown 1 running on macOS with the chroma-green pop-out window.",
    platform: "mac"
  },
  {
    src: "/screenshots/mac-2.webp",
    fallback: "/screenshots/mac-2.png",
    thumb: "/screenshots/mac-2-thumb.webp",
    alt: "OBS Studio on macOS displaying the countdown text next to the My Stream Timer window",
    caption: "OBS reads countdown.txt and shows the timer live on the scene.",
    platform: "mac"
  },
  {
    src: "/screenshots/mac-3.webp",
    fallback: "/screenshots/mac-3.png",
    thumb: "/screenshots/mac-3-thumb.webp",
    alt: "Count Up 1 running on macOS with a custom output template of {0:hh:mm:ss}",
    caption: "Count Up with custom, auto, total seconds, or minutes:seconds formats.",
    platform: "mac"
  },
  {
    src: "/screenshots/mac-4.webp",
    fallback: "/screenshots/mac-4.png",
    thumb: "/screenshots/mac-4-thumb.webp",
    alt: "Current Time clock on macOS showing 9:41 AM with hour and minute format options",
    caption: "Current Time clock with 12 or 24-hour formats and AM/PM toggle.",
    platform: "mac"
  },
  {
    src: "/screenshots/mac-5.webp",
    fallback: "/screenshots/mac-5.png",
    thumb: "/screenshots/mac-5-thumb.webp",
    alt: "Automation command builder on macOS generating mystreamtimer://countdown/?mins=15",
    caption:
      "The Automation page builds mystreamtimer:// commands for Stream Deck and scripts.",
    platform: "mac"
  },
  {
    src: "/screenshots/windows-1.webp",
    fallback: "/screenshots/windows-1.png",
    thumb: "/screenshots/windows-1-thumb.webp",
    alt: "My Stream Timer on Windows 11 showing Countdown 1 running with a green pop-out window reading Starting in 00:13:23",
    caption: "Countdown 1 on Windows 11 with the pop-out timer window.",
    platform: "windows"
  },
  {
    src: "/screenshots/windows-2.webp",
    fallback: "/screenshots/windows-2.png",
    thumb: "/screenshots/windows-2-thumb.webp",
    alt: "OBS Studio on Windows displaying the countdown text source beside My Stream Timer",
    caption: "OBS on Windows reading the countdown text file.",
    platform: "windows"
  },
  {
    src: "/screenshots/windows-3.webp",
    fallback: "/screenshots/windows-3.png",
    thumb: "/screenshots/windows-3-thumb.webp",
    alt: "Count Up 1 on Windows with the Output format set to Custom",
    caption: "Count Up with custom output templates on Windows.",
    platform: "windows"
  },
  {
    src: "/screenshots/windows-4.webp",
    fallback: "/screenshots/windows-4.png",
    thumb: "/screenshots/windows-4-thumb.webp",
    alt: "Current Time clock on Windows showing 11:25 with Hour:Minute format and AM/PM toggle",
    caption: "Current Time clock output on Windows.",
    platform: "windows"
  },
  {
    src: "/screenshots/windows-5.webp",
    fallback: "/screenshots/windows-5.png",
    thumb: "/screenshots/windows-5-thumb.webp",
    alt: "Automation page on Windows listing mystreamtimer:// example commands with copy buttons",
    caption: "Automation examples with one-click copy on Windows.",
    platform: "windows"
  }
];

export const platformLabels: Readonly<Record<Platform, string>> = {
  mac: "macOS",
  windows: "Windows"
};

export function buildAutomationUrl(target: string, verb: string, value?: string) {
  const query = value !== undefined && value !== "" ? `${verb}=${value}` : verb;
  return `mystreamtimer://${target}/?${query}`;
}
