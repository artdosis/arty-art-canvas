export type Exp = {
  s: string;
  cat: string;
  t: string;
  when: string;
  where: string;
  status: string;
  lead: string;
  blurb: string;
  story: string[];
  program: [string, string][];
  facts: [string, string][];
  img: string;
  gallery: string[];
};

export const EXP_CATS: [string, string][] = [
  ["Exhibitions", "Rooms you walk through, not walls you walk past."],
  ["Music events", "Live sound, made and mixed by the studio."],
  ["Live experiences", "Painting, workshops and activations made in the room."],
];

export const EXPERIENCES: Exp[] = [
  {
    s: "awakening",
    cat: "Exhibitions",
    t: "Awakening",
    when: "8 to 23 December 2026",
    where: "Melbourne",
    status: "Waitlist open",
    lead: "Angi Castillo's first solo exhibition.",
    blurb: "An immersive journey through art, ancestry, movement and sound that wakes up all five senses.",
    story: [
      "Instead of walking through a room of paintings, you move through a sequence of spaces built to stir the senses and ask something of you.",
      "Six rooms, one journey: cross the threshold, cleanse, remember, explore, participate, reveal. There is a scent free route through every room.",
    ],
    program: [
      ["Cross the threshold", "Leave the outside world behind. The tunnel shifts light, sound and scent the moment you step in."],
      ["Cleanse", "Pause. Breathe. Arrive. An optional cleansing moment, always with a scent free route."],
      ["Remember", "Where do we come from? Family, migration, memory, culture, identity."],
      ["Explore", "Enter the labyrinth. A run of artworks with no correct route."],
      ["Participate", "Do not just look. Interactive walls, live printing, a pop up studio."],
      ["Reveal", "The veil falls. The central peace artwork rises out of the dark."],
    ],
    facts: [
      ["Dates", "8 to 23 December 2026"],
      ["Rooms", "6"],
      ["Access", "Scent free route, step free entry"],
    ],
    img: "awakening",
    gallery: ["awakening", "immersive", "opening"],
  },
  {
    s: "colour-of-memory",
    cat: "Exhibitions",
    t: "The colour of memory",
    when: "Autumn 2027",
    where: "Melbourne, venue to be announced",
    status: "In development",
    lead: "A group show about the images we keep and the ones we lose.",
    blurb: "Painting, photography and sound from artists working with migration, family and memory.",
    story: [
      "A group exhibition built around one question: what does a memory look like once it has been retold enough times?",
      "Each artist contributes a work and a recording of the story behind it, played in the room beside the piece.",
    ],
    program: [
      ["Open call", "Submissions from artists across Naarm and beyond."],
      ["The listening room", "Every work paired with the voice that made it."],
      ["Closing night", "Live painting and a short set from the studio."],
    ],
    facts: [
      ["Format", "Group exhibition"],
      ["Artists", "8 to 12"],
      ["Status", "In development"],
    ],
    img: "opening",
    gallery: ["opening", "pf-peace", "immersive"],
  },
  {
    s: "dosis-sessions",
    cat: "Music events",
    t: "Dosis Sessions",
    when: "Monthly",
    where: "Warehouse venues, Melbourne",
    status: "Running",
    lead: "A small room, a live band and a recording desk.",
    blurb: "Monthly live sessions recorded and mixed by the studio, then released as a track.",
    story: [
      "One artist, one room, one take. Everything is multitracked live and mixed the same week, then released with the video.",
      "The audience is part of the recording rather than something to be edited out of it.",
    ],
    program: [
      ["Doors and support", "A local opener, one short set."],
      ["The session", "The main set, recorded live to sixteen channels."],
      ["The release", "Mixed and out on the platforms within the month."],
    ],
    facts: [
      ["Cadence", "Monthly"],
      ["Capacity", "80 to 120"],
      ["Output", "One released track per session"],
    ],
    img: "liveband",
    gallery: ["liveband", "sound", "music"],
  },
  {
    s: "open-air",
    cat: "Music events",
    t: "Open Air",
    when: "Summer 2027",
    where: "Regional Victoria",
    status: "In development",
    lead: "A day of music with a mural painted from the first set to the last.",
    blurb: "Outdoor stage, live sound run by the studio, and a wall that finishes when the music does.",
    story: [
      "Music and painting on the same clock. The wall starts blank at the first set and is finished by the closing act, lit as it goes.",
      "Front of house, recording and the artwork all run by the one team, so the day sounds and looks like one piece of work.",
    ],
    program: [
      ["Afternoon", "Acoustic sets, the wall is blocked in."],
      ["Golden hour", "Full band sets, colour goes on."],
      ["Night", "Headline set and the reveal, lit from the stage."],
    ],
    facts: [
      ["Format", "Outdoor day event"],
      ["Sound", "Front of house and live recording in house"],
      ["Status", "In development"],
    ],
    img: "festival",
    gallery: ["festival", "liveband", "pf-valley"],
  },
  {
    s: "live-painting-nights",
    cat: "Live experiences",
    t: "Live painting nights",
    when: "By booking",
    where: "Your venue",
    status: "Booking",
    lead: "A painting made in the room, finished before the night ends.",
    blurb: "Corporate events, weddings, launches and fundraisers, with the finished piece handed over on the night.",
    story: [
      "The canvas is set where people can watch it change. By the end of the evening it is a record of the night rather than a decoration for it.",
      "For fundraisers the piece can go straight to auction, still wet.",
    ],
    program: [
      ["Set up", "Canvas, lighting and a clear sightline."],
      ["The painting", "Made across the event, in view."],
      ["The handover", "Reveal, photographs and the piece goes home."],
    ],
    facts: [
      ["Duration", "3 to 6 hours"],
      ["Canvas", "Sized to the room"],
      ["Extras", "Auction support, timelapse video"],
    ],
    img: "pf-wedding",
    gallery: ["pf-wedding", "pf-gala", "pf-valley"],
  },
  {
    s: "studio-in-the-round",
    cat: "Live experiences",
    t: "Studio in the round",
    when: "By booking",
    where: "Schools, workplaces, community spaces",
    status: "Booking",
    lead: "A pop up studio where everyone in the room makes something.",
    blurb: "Art and sound workshops built with the group, run with Mind Connect for wellbeing programs.",
    story: [
      "Tables, paint, a small recording rig and no performance expected. People make something together and take it with them.",
      "Sessions are shaped with the group beforehand, so the room decides what it is making.",
    ],
    program: [
      ["Arrive", "Materials out, no blank page pressure."],
      ["Make", "Paint, print or record, in small groups."],
      ["Share", "Everything goes on one wall before it goes home."],
    ],
    facts: [
      ["Group size", "10 to 60"],
      ["Duration", "2 to 4 hours"],
      ["Partner", "Mind Connect, an NDIS provider"],
    ],
    img: "wellbeing",
    gallery: ["wellbeing", "pf-school", "music"],
  },
];

export function expBySlug(s: string) {
  return EXPERIENCES.find((e) => e.s === s);
}
