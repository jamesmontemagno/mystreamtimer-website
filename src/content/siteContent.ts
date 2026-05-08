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
