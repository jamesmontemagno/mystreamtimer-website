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
  alt: string;
  caption: string;
};

export type SeoEntry = {
  title: string;
  description: string;
  path: string;
  robots?: string;
};

export const siteMetadata = {
  siteName: "My Stream Timer",
  siteUrl: "https://mystreamtimer.com",
  defaultTitle: "My Stream Timer | Countdown Timer for OBS, SLOBS, and Stream Deck",
  defaultDescription:
    "My Stream Timer is a countdown and count-up timer app for live creators with OBS and SLOBS file output, Stream Deck triggers, and downloadable apps for macOS and Windows.",
  defaultSocialImage:
    "https://mystreamtimer.apporeum.com/media/baa7e66f-dad4-4d3f-b2b5-7de474c9315f/56edca9e-b4cf-4d9c-99ff-5b1f58ae3f4c.png",
  defaultSocialImageAlt: "My Stream Timer main interface"
} as const;

export const seoEntries: Readonly<Record<string, SeoEntry>> = {
  "/": {
    title: siteMetadata.defaultTitle,
    description: siteMetadata.defaultDescription,
    path: "/"
  },
  "/download": {
    title: "Download My Stream Timer for macOS and Windows",
    description:
      "Download My Stream Timer from the Apple App Store or Microsoft Store and set up precision countdown overlays for your live stream workflow.",
    path: "/download"
  },
  "/screenshots": {
    title: "My Stream Timer Screenshots and Overlay Examples",
    description:
      "Browse My Stream Timer screenshots to see timer controls, overlay-ready output, and the app interface used in live production setups.",
    path: "/screenshots"
  },
  "/support": {
    title: "My Stream Timer Support and Troubleshooting",
    description:
      "Get My Stream Timer support, troubleshooting guidance for OBS and SLOBS file output, and contact details for help with setup issues.",
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
      "The page you requested could not be found. Return to the My Stream Timer homepage or browse screenshots and download information.",
    path: "/404",
    robots: "noindex, nofollow"
  }
} as const;

export const storeLinks = {
  apple:
    "https://itunes.apple.com/us/app/my-stream-timer/id1460539461?mt=12",
  microsoft: "https://www.microsoft.com/p/my-stream-timer/9n5nxx3wk7k7"
} as const;

export const streamDeckCommands: readonly CommandEntry[] = [
  {
    command: "mystreamtimer://countdown/?mins=6",
    description: "Start a countdown from a specific minute value."
  },
  {
    command: "mystreamtimer://countdown/?secs=90",
    description: "Start a countdown from a specific number of seconds."
  },
  {
    command: "mystreamtimer://countdown/?topofhour",
    description: "Count down to the next hour automatically."
  },
  {
    command: "mystreamtimer://countdown/?to=15:30",
    description: "Count down to a specific clock time."
  },
  {
    command: "mystreamtimer://countdown/?pause",
    description: "Pause the active countdown timer."
  },
  {
    command: "mystreamtimer://countdown/?resume",
    description: "Resume the active countdown timer."
  },
  {
    command: "mystreamtimer://countdown/?addmins=1",
    description: "Add one minute to the active timer."
  },
  {
    command: "mystreamtimer://countdown/?subtractsecs=90",
    description: "Subtract time from the active timer."
  },
  {
    command: "mystreamtimer://countdown/?stop",
    description: "Stop the active timer and clear output."
  }
];

export const timerTargets = [
  "countdown",
  "countdown2",
  "countdown3",
  "countdown4",
  "countup",
  "countup2"
] as const;

export const troubleshootingItems: readonly TroubleshootingEntry[] = [
  {
    title: "macOS: Files cannot be saved",
    detail:
      "Open System Settings and check Full Disk Access for My Stream Timer if OBS cannot read timer files."
  },
  {
    title: "macOS: No beep sounds",
    detail:
      "Enable user interface sound effects in macOS Sound settings and route playback to the desired output device."
  },
  {
    title: "OBS/SLOBS text not updating",
    detail:
      "Confirm the text source is set to Read from file and points to the active timer output file path."
  }
];

export const releaseNotes = [
  {
    version: "2.5.0",
    points: [
      "New 12-hour and 24-hour time display modes.",
      "Clear text output when stopping a timer."
    ]
  },
  {
    version: "2.4.0",
    points: [
      "Expanded Stream Deck controls including pause, resume, add, subtract, reset, and stop.",
      "Count-up commands now match countdown command depth.",
      "Performance and startup improvements on macOS."
    ]
  }
] as const;

export const screenshotItems: readonly ScreenshotEntry[] = [
  {
    src: "https://mystreamtimer.apporeum.com/media/baa7e66f-dad4-4d3f-b2b5-7de474c9315f/56edca9e-b4cf-4d9c-99ff-5b1f58ae3f4c.png",
    alt: "My Stream Timer main interface",
    caption: "Main app experience with timer controls and clean readout."
  },
  {
    src: "https://mystreamtimer.apporeum.com/media/baa7e66f-dad4-4d3f-b2b5-7de474c9315f/7148bafb-dd17-415d-95ab-cc76c72ebe60.png",
    alt: "Countdown output in action",
    caption: "Live countdown output ready for overlay use in streaming scenes."
  },
  {
    src: "https://mystreamtimer.apporeum.com/media/baa7e66f-dad4-4d3f-b2b5-7de474c9315f/0148cd36-11c8-4d53-8db9-01a7e888b99a.png",
    alt: "Timer settings panel",
    caption: "Configuration options tailored for live production workflows."
  },
  {
    src: "https://mystreamtimer.apporeum.com/media/baa7e66f-dad4-4d3f-b2b5-7de474c9315f/3783ec8f-6652-4305-b005-12ef63cab05b.png",
    alt: "Sample overlay text in stream",
    caption: "OBS-ready text output that updates without scene interruption."
  },
  {
    src: "https://mystreamtimer.apporeum.com/media/baa7e66f-dad4-4d3f-b2b5-7de474c9315f/835df3e3-5726-4511-b1ea-e1d7906f58e4.jpg",
    alt: "Platform screenshot one",
    caption: "Cross-platform consistency across timer features and controls."
  },
  {
    src: "https://mystreamtimer.apporeum.com/media/baa7e66f-dad4-4d3f-b2b5-7de474c9315f/d9348c59-778b-477e-b490-96adfa700165.jpg",
    alt: "Platform screenshot two",
    caption: "Fast setup flow for streamers and production teams."
  }
];
