export type Field = {
  l: string;
  t?: "text" | "area" | "select";
  req?: boolean;
  opts?: string[];
  ph?: string;
  name?: string;
  im?: string;
  ac?: string;
};

export type Service = {
  slug: string;
  group: string;
  title: string;
  lead: string;
  body: string;
  offers: [string, string][];
  note: string[];
  steps: string[];
  form: { sheet: string; type: string; cta: string; fields: Field[] };
};

export const SERVICES: Service[] = [
  {
    slug: "murals",
    group: "Art services",
    title: "Murals",
    lead: "A wall can hold memory. A colour can hold grief. A face can hold courage.",
    body: "Indoor, outdoor, schools and campaigns. Three directions to choose from: illustrative, realistic, or fully custom to your brand. Everything is priced per square metre and per site, and every wall is checked for surface, light and finish before we quote.",
    offers: [
      ["Indoor murals", "Feature walls for homes, offices and venues."],
      ["Outdoor and street murals", "Facades, laneways and public walls, sealed to last."],
      ["School and community murals", "Co-designed with the people who use the space."],
      ["Brand and campaign walls", "A mural built around a message or a launch."],
      ["Art wheels", "Hand painted vehicles and moving canvases."],
      ["Surface prep and sealing", "The quiet work that keeps a mural alive for years."],
    ],
    note: ["Illustrative", "Realistic", "Custom to brand", "Priced per m²"],
    steps: ["Enquiry and site details", "Quote to the work", "Design, with three revisions", "Wall prep and paint", "Reveal"],
    form: {
      sheet: "Art_Services",
      type: "mural",
      cta: "Request a quote",
      fields: [
        { l: "Type", t: "select", req: true, opts: ["Indoor", "Outdoor", "Art wheels (vehicles)", "School", "Campaign or brand"] },
        { l: "Wall size and condition", t: "text", ph: "e.g. 6m × 3m, brick, outdoor…" },
        { l: "Location postcode", t: "text", name: "postcode", im: "numeric" },
        { l: "Tell us about the project", t: "area", req: true },
      ],
    },
  },
  {
    slug: "live-art",
    group: "Art services",
    title: "Live art",
    lead: "Painting becomes performance, made in the room with the people in it.",
    body: "Corporate events, weddings, private parties and brand collaborations, plus live auctions with not for profits. We have made work with UNESCO, Doctors Without Borders, Hunter Valley and more. The finished piece is part of the night, and it goes home with someone.",
    offers: [
      ["Corporate and conferences", "A painting made live while your event happens."],
      ["Weddings and private events", "A one off piece that holds the day."],
      ["Brand activations", "Live art as the centre of a launch or campaign."],
      ["Live auction pieces", "Made on stage, sold in the room for a cause."],
      ["Festivals and community days", "Public painting people can watch and join."],
      ["Team creative sessions", "Your people make something together."],
    ],
    note: ["Live painting", "On stage", "Takes home a piece"],
    steps: ["Tell us about the event", "Concept and canvas size", "Live painting on the day", "The reveal and handover"],
    form: {
      sheet: "Art_Services",
      type: "live_art",
      cta: "Enquire",
      fields: [
        { l: "Event type", t: "text", ph: "Corporate, wedding, community, brand…" },
        { l: "Event date", t: "text", name: "date", ph: "Approximate is fine…" },
        { l: "What are you imagining?", t: "area", req: true },
      ],
    },
  },
  {
    slug: "commissions",
    group: "Art services",
    title: "Commissions",
    lead: "A painting made for one story, and priced to that story.",
    body: "Portraits of people and pets, painted on commission. We build the piece together, from the first reference to the final canvas, so it carries the thing you want to remember.",
    offers: [
      ["People portraits", "A person, painted the way you see them."],
      ["Pet portraits", "The family member with four legs."],
      ["Family and couple pieces", "More than one story on one canvas."],
      ["Memorial pieces", "A way to keep someone close."],
      ["Custom canvases", "Anything you can brief, we can paint."],
    ],
    note: ["Any size", "Priced to the work", "Progress updates"],
    steps: ["Share the story and references", "Agree size and price", "Painting, with progress updates", "Delivery"],
    form: {
      sheet: "Art_Services",
      type: "commission",
      cta: "Enquire",
      fields: [
        { l: "Portrait of…", t: "text", ph: "Person, pet, or an idea…" },
        { l: "The story behind it", t: "area", req: true },
      ],
    },
  },
  {
    slug: "music-production",
    group: "Music and sound",
    title: "Music production",
    lead: "Sound is part of the story, so we make it properly.",
    body: "Writing, recording, arranging and producing tracks from the first idea to a finished master. For releases, for film and events, and for the wellbeing programs we run. Made in house, led by listening.",
    offers: [
      ["Songwriting and topline", "Melody, lyrics and the shape of the song."],
      ["Recording sessions", "Vocals and instruments, captured well."],
      ["Arrangement and production", "Building the track around the song."],
      ["Mixing", "Balancing every part so it sits right."],
      ["Mastering", "The final polish for release."],
      ["Scores for film and events", "Original music written to picture or moment."],
    ],
    note: ["In house", "Release ready", "Rights kept yours"],
    steps: ["Talk through the brief", "Pre production and demo", "Record and produce", "Mix, master and deliver"],
    form: {
      sheet: "Music",
      type: "production",
      cta: "Start a project",
      fields: [
        { l: "Project type", t: "select", req: true, opts: ["Single or EP", "Album", "Film or event score", "Program music", "Other"] },
        { l: "Where are you at?", t: "text", ph: "Idea, demo, or ready to record…" },
        { l: "Tell us about it", t: "area", req: true },
      ],
    },
  },
  {
    slug: "music-distribution",
    group: "Music and sound",
    title: "Music distribution",
    lead: "Finished music, onto every platform, with your rights kept in your name.",
    body: "We get your release onto Spotify, Apple Music and the rest, set up the metadata and splits properly, and keep your masters and publishing yours. Built to grow with you as the catalogue grows.",
    offers: [
      ["Platform delivery", "Spotify, Apple Music, YouTube, Amazon and more."],
      ["Metadata and artwork", "Credits, ISRCs and covers done right."],
      ["Splits and rights", "Ownership stays in your name."],
      ["Release scheduling", "Dates, pre saves and rollout."],
      ["Catalogue management", "One place for every release you own."],
      ["Streaming reports", "See what is being played, and where."],
    ],
    note: ["Keep your masters", "All major platforms", "Grows with you"],
    steps: ["Send the finished masters", "Artwork and metadata check", "Schedule the release", "Live on the platforms"],
    form: {
      sheet: "Music",
      type: "distribution",
      cta: "Enquire about a release",
      fields: [
        { l: "Artist or project name", t: "text", name: "artist" },
        { l: "Release type", t: "select", req: true, opts: ["Single", "EP", "Album"] },
        { l: "Anything we should know?", t: "area" },
      ],
    },
  },
  {
    slug: "sound-engineering",
    group: "Music and sound",
    title: "Sound engineering",
    lead: "Live recording, mixing and event sound, done with care.",
    body: "Capturing performances, running sound at events, and mixing what comes out of the room. The technical craft that lets the moment be heard the way it felt.",
    offers: [
      ["Live event sound", "Front of house so the room sounds right."],
      ["Live recording", "Capturing a performance as it happens."],
      ["Studio recording", "Tracking in a controlled space."],
      ["Mixing", "Bringing every element into balance."],
      ["Location and field audio", "Clean sound on site, wherever that is."],
      ["Podcast and voice", "Spoken word recorded and cleaned up."],
    ],
    note: ["Live or studio", "On site", "Clean captures"],
    steps: ["Tell us about the event or session", "Plan the setup", "Record or run sound live", "Mix and deliver"],
    form: {
      sheet: "Music",
      type: "sound_engineering",
      cta: "Enquire",
      fields: [
        { l: "What do you need?", t: "select", req: true, opts: ["Live recording", "Event sound", "Mixing", "Not sure yet"] },
        { l: "Date and place", t: "text", ph: "Approximate is fine…" },
        { l: "Details", t: "area", req: true },
      ],
    },
  },
  {
    slug: "wellbeing-programs",
    group: "Programs",
    title: "Wellbeing programs",
    lead: "Art and music as a way in, run with people, not at them.",
    body: "Wellbeing programs built with Mind Connect, an NDIS support provider. Art and music sessions co-created with community and led by listening, designed for people with lived experience.",
    offers: [
      ["Art sessions", "Making, not performing. Everyone can take part."],
      ["Music sessions", "Sound as a way to connect and express."],
      ["Group workshops", "Shared making, built around the group."],
      ["One to one sessions", "Focused time for one person."],
      ["School and youth programs", "Creative programs for younger people."],
      ["NDIS aligned delivery", "Run with Mind Connect, an NDIS provider."],
    ],
    note: ["With Mind Connect", "NDIS", "Led by listening"],
    steps: ["Talk through the group and goals", "Shape the program together", "Run the sessions", "Reflect and adjust"],
    form: {
      sheet: "Programs",
      type: "wellbeing",
      cta: "Enquire about a program",
      fields: [
        { l: "Organisation", t: "text", name: "org", ac: "organization" },
        { l: "Who is it for?", t: "text", ph: "Group, ages, context…" },
        { l: "What are you hoping for?", t: "area", req: true },
      ],
    },
  },
];

export type PfItem = {
  s: string;
  t: string;
  c: string[];
  y: string;
  d: string;
  loc: string;
  role: string;
  lead: string;
  story: string[];
  facts: [string, string][];
  gallery: string[];
};

const pf = (
  s: string,
  t: string,
  c: string[],
  y: string,
  d: string,
  loc: string,
  role: string,
  lead: string,
  story: string[],
  facts: [string, string][],
  gallery: string[],
): PfItem => ({ s, t, c, y, d, loc, role, lead, story, facts, gallery });

export const PORTFOLIO: PfItem[] = [
  pf(
    "peace",
    "Peace",
    ["Murals"],
    "2024",
    "Large scale acrylic and mixed media wall.",
    "Melbourne",
    "Concept, design and painting",
    "A wall about the quiet after the noise.",
    [
      "Peace started as a conversation about what people carry when they arrive somewhere new. The face at the centre was built from three references, layered until it stopped being any one person and started being everyone.",
      "Painted over eleven days in acrylic and mixed media, with the background worked wet so the colour keeps moving when you walk past it.",
    ],
    [
      ["Size", "7m × 3.2m"],
      ["Medium", "Acrylic and mixed media"],
      ["Duration", "11 days on site"],
    ],
    ["Peace", "Who are you?", "Brand activation wall"],
  ),
  pf(
    "who-are-you",
    "Who are you?",
    ["Murals", "Brands"],
    "2023",
    "A public art piece for a city activation.",
    "Melbourne CBD",
    "Concept and painting",
    "A question painted at the size of a building.",
    [
      "Made for a city activation that wanted people to stop, not scroll. The piece asks one question and leaves the answer to whoever is standing in front of it.",
      "The palette was pulled from the street itself: brick, tram yellow and the blue of the sky between towers.",
    ],
    [
      ["Size", "9m × 4m"],
      ["Client", "City activation program"],
      ["Duration", "8 days"],
    ],
    ["Who are you?", "Peace", "Art wheels"],
  ),
  pf(
    "school-mural-melbourne",
    "School mural, Melbourne",
    ["Murals"],
    "2023",
    "Co-designed with students and staff.",
    "Melbourne",
    "Workshops, design and painting",
    "The students drew it first. We just made it big.",
    [
      "Two workshop days with students produced hundreds of small drawings. We pulled the recurring shapes out of them, built one composition, and took it back to the group before a single wall was touched.",
      "Students painted the lower two metres. Everything above that was ours.",
    ],
    [
      ["Size", "14m × 2.8m"],
      ["Workshops", "2 days, 90 students"],
      ["Finish", "Anti graffiti sealed"],
    ],
    ["School mural, Melbourne", "Peace", "Who are you?"],
  ),
  pf(
    "unesco-fundraiser",
    "UNESCO fundraiser",
    ["Live art", "Events"],
    "2022",
    "Live painting auctioned on the night.",
    "Melbourne",
    "Live painting and auction piece",
    "One canvas, one night, one room deciding what it was worth.",
    [
      "Painted on stage across the length of the evening, finished as the auction opened. The room watched a blank canvas become the last lot of the night.",
      "The piece sold in the room and the proceeds went straight to the program being raised for.",
    ],
    [
      ["Format", "Live painting on stage"],
      ["Canvas", "1.2m × 1.6m"],
      ["Outcome", "Sold on the night"],
    ],
    ["UNESCO fundraiser", "Hunter Valley", "Wedding live painting"],
  ),
  pf(
    "doctors-without-borders",
    "Doctors Without Borders",
    ["Live art", "Events"],
    "2022",
    "A live auction piece for the cause.",
    "Melbourne",
    "Live painting and auction piece",
    "Painted while the speeches happened, sold before the night ended.",
    [
      "A live auction piece made in the room, built around the stories being told from the stage. The brief was simple: do not decorate the night, respond to it.",
    ],
    [
      ["Format", "Live painting"],
      ["Canvas", "1m × 1.4m"],
      ["Outcome", "Auctioned for the cause"],
    ],
    ["Doctors Without Borders", "UNESCO fundraiser", "Hunter Valley"],
  ),
  pf(
    "hunter-valley",
    "Hunter Valley",
    ["Live art", "Events"],
    "2023",
    "Live art at a regional event.",
    "Hunter Valley, NSW",
    "Live painting",
    "Outdoor light, a long table and a canvas that kept changing colour.",
    [
      "Painting outdoors means the piece is lit by whatever the day is doing. This one went from bright to golden to lamplight across five hours, and the painting followed it.",
    ],
    [
      ["Format", "Outdoor live painting"],
      ["Duration", "5 hours"],
      ["Guests", "Regional event, 200 plus"],
    ],
    ["Hunter Valley", "UNESCO fundraiser", "Wedding live painting"],
  ),
  pf(
    "wedding-live-painting",
    "Wedding live painting",
    ["Live art"],
    "2024",
    "A private piece made during the day.",
    "Victoria",
    "Live painting",
    "The first dance, painted while it happened.",
    [
      "Set up quietly at the edge of the room, started at the ceremony and finished during the reception. The couple took the canvas home that night, still wet.",
    ],
    [
      ["Canvas", "90cm × 120cm"],
      ["Duration", "6 hours"],
      ["Delivery", "Same night, varnished later"],
    ],
    ["Wedding live painting", "Portrait commission", "Hunter Valley"],
  ),
  pf(
    "portrait-commission",
    "Portrait commission",
    ["Commissions"],
    "2024",
    "A person, painted from their story.",
    "Studio",
    "Commission",
    "Painted from photographs, memories and one long conversation.",
    [
      "Commissions start with talking, not with references. What came out of that conversation shaped the light, the palette and what the hands are doing.",
      "Progress photographs were shared at three points so nothing arrived as a surprise.",
    ],
    [
      ["Medium", "Oil on canvas"],
      ["Size", "60cm × 80cm"],
      ["Timeline", "5 weeks"],
    ],
    ["Portrait commission", "Pet portrait", "Wedding live painting"],
  ),
  pf(
    "pet-portrait",
    "Pet portrait",
    ["Commissions"],
    "2023",
    "The family member with four legs.",
    "Studio",
    "Commission",
    "A portrait for the one who never sat still for a photograph.",
    [
      "Built from a dozen blurry phone pictures. The job was to find the one expression the family recognises and paint that, not the animal in general.",
    ],
    [
      ["Medium", "Acrylic on canvas"],
      ["Size", "40cm × 50cm"],
      ["Timeline", "3 weeks"],
    ],
    ["Pet portrait", "Portrait commission", "Peace"],
  ),
  pf(
    "single-release",
    "Single release",
    ["Music"],
    "2024",
    "Written, produced and mastered in house.",
    "Artdosis studio",
    "Writing, production, mix and master",
    "From voice memo to master without leaving the room.",
    [
      "Written in the studio, tracked over two sessions and mixed in the same week. Keeping it in house meant the arrangement could keep changing until the last day.",
    ],
    [
      ["Sessions", "2 tracking days"],
      ["Delivered", "Master plus instrumental"],
      ["Rights", "Kept by the artist"],
    ],
    ["Single release", "EP distribution", "Live recording session"],
  ),
  pf(
    "ep-distribution",
    "EP distribution",
    ["Music"],
    "2024",
    "Delivered to every major platform, rights kept.",
    "Worldwide",
    "Distribution and release strategy",
    "Five tracks, every platform, ownership untouched.",
    [
      "Metadata, ISRCs, artwork specs, splits and a release schedule with pre saves. The unglamorous work that decides whether a release lands or disappears.",
    ],
    [
      ["Tracks", "5"],
      ["Platforms", "Spotify, Apple, YouTube, Amazon and more"],
      ["Rights", "Masters and publishing stay with the artist"],
    ],
    ["EP distribution", "Single release", "Live recording session"],
  ),
  pf(
    "live-recording-session",
    "Live recording session",
    ["Music", "Events"],
    "2023",
    "A performance captured and mixed.",
    "Melbourne",
    "Live recording and mix",
    "One take, a full room, nothing fixed afterwards.",
    [
      "Multitracked live with the audience in the room. Mixed to keep the bleed rather than hide it, because the bleed is what makes it sound like it happened.",
    ],
    [
      ["Format", "Live multitrack"],
      ["Channels", "16"],
      ["Delivered", "Mixed live audio and stems"],
    ],
    ["Live recording session", "Single release", "EP distribution"],
  ),
  pf(
    "brand-activation-wall",
    "Brand activation wall",
    ["Brands", "Murals"],
    "2023",
    "A mural built around a launch.",
    "Melbourne",
    "Concept, design and painting",
    "A launch that people photographed instead of walked past.",
    [
      "Built to be shot from three specific angles, painted in a palette that survives phone cameras and bad venue lighting.",
    ],
    [
      ["Size", "6m × 3m"],
      ["Build", "3 days"],
      ["Use", "Launch week activation"],
    ],
    ["Brand activation wall", "Art wheels", "Who are you?"],
  ),
  pf(
    "art-wheels",
    "Art wheels",
    ["Murals", "Brands"],
    "2022",
    "A hand painted moving canvas.",
    "Melbourne",
    "Design and hand painting",
    "A vehicle that carries the artwork around the city all year.",
    [
      "Painted directly onto the panels, sealed for weather and washing. The composition had to read at eighty kilometres an hour and still hold up parked.",
    ],
    [
      ["Surface", "Vehicle panels"],
      ["Finish", "Automotive clear sealed"],
      ["Duration", "6 days"],
    ],
    ["Art wheels", "Brand activation wall", "Who are you?"],
  ),
  pf(
    "awakening",
    "Awakening",
    ["Experiences"],
    "2026",
    "Immersive solo exhibition, all five senses.",
    "Melbourne",
    "Creative direction and artwork",
    "Six rooms built to wake up all five senses.",
    [
      "Angi Castillo's first solo exhibition. Not a room of paintings, a sequence of spaces you walk through: threshold, cleanse, remember, explore, participate, reveal.",
      "Sound, scent and movement are designed alongside the artwork rather than added to it.",
    ],
    [
      ["Dates", "8 to 23 December 2026"],
      ["Rooms", "6"],
      ["Senses", "See, hear, smell, touch, move"],
    ],
    ["Awakening", "Peace", "Who are you?"],
  ),
];

export const PF_CATS = ["All", "Murals", "Live art", "Events", "Commissions", "Music", "Brands", "Experiences"];

