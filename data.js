/* Portfolio copy adapted from James's existing portfolio. See evidence/content-notes.md. */
(function () {
  "use strict";

  const yt = (id, start = 0) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1${start ? `&start=${start}` : ""}`;
  const vi = (id) => `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&playsinline=1&dnt=1`;
  const ytLink = (id) => `https://www.youtube.com/watch?v=${id}`;
  const film = (data) => ({ role: "Cinematography", preview: null, ...data });
  const campaign = (data) => ({ embed: null, preview: null, details: [], ...data });
  const project = (data) => ({ role: "Design & development", details: [], stack: [], links: [], url: null, ...data });

  window.PORTFOLIO = {
    reel: film({
      id: "showreel", title: "Cinematography Showreel", client: "James McShane", category: "Showreel",
      description: "A selection of moments from my work behind the camera.",
      image: "assets/images/showreel.webp",
      embed: vi("658473014"), url: "https://vimeo.com/658473014"
    }),

    films: [
      film({
        id: "khalid-nah", title: "Nah", client: "Khalid", category: "Music video",
        role: "Creative Producer & VR Cinematographer",
        description: "Khalid's music brought into an immersive, spatial world.",
        image: "assets/images/khalid-nah.webp", embed: null, url: ytLink("8RtgEpz_wa8"),
        links: [{ label: "Watch on YouTube", url: ytLink("8RtgEpz_wa8") }]
      }),
      film({
        id: "ariana-grande", title: "hate that i made you love me", client: "Ariana Grande", category: "Music video / BTS",
        role: "Behind-the-scenes cinematography",
        description: "Behind the scenes of Ariana Grande's music video.",
        image: "assets/images/ariana-grande.webp", embed: null, url: ytLink("2ljp0qQiRKk"),
        links: [{ label: "Watch on YouTube", url: ytLink("2ljp0qQiRKk") }]
      }),
      film({
        id: "paris-2024", title: "Paris 2024 Closing Ceremony", client: "LA28", category: "Live event",
        role: "Aerial & Action Cinematographer / Technical Producer",
        description: "The Olympic handover from Paris to Los Angeles, featuring Tom Cruise.",
        image: "assets/images/paris-2024.webp", embed: yt("REVLVw3L5B4"), url: ytLink("REVLVw3L5B4")
      }),
      film({
        id: "fila-fusion", title: "Fila Fusion", client: "Fila", category: "Commercial",
        description: "Commercial work for Fila Fusion.",
        image: "assets/images/fila-fusion.webp",
        embed: vi("338366635"), url: "https://vimeo.com/338366635"
      }),
      film({
        id: "dancing-with-the-devil", title: "Dancing with the Devil", client: "Demi Lovato", category: "Documentary",
        description: "Documentary work for Demi Lovato: Dancing with the Devil.",
        image: "assets/images/dancing-with-the-devil.webp", embed: yt("jTiiD8L811w"), url: ytLink("jTiiD8L811w")
      }),
      film({
        id: "chasing-happiness", title: "Chasing Happiness", client: "Jonas Brothers", category: "Documentary",
        description: "Documentary work for the Jonas Brothers' Chasing Happiness.",
        image: "assets/images/chasing-happiness.webp", embed: yt("BSToRSpV94E"), url: ytLink("BSToRSpV94E")
      }),
      film({
        id: "pj-morton", title: "Bring It On Home to Me", client: "PJ Morton", category: "Music video",
        description: "Music video for PJ Morton.",
        image: "assets/images/pj-morton.webp", embed: yt("lDiIKknNhWw"), url: ytLink("lDiIKknNhWw")
      }),
      film({
        id: "the-green", title: "The Green", client: "", category: "Short film",
        description: "The official teaser for The Green.",
        image: "assets/images/the-green.webp",
        embed: vi("603676670"), url: "https://vimeo.com/603676670"
      }),
      film({
        id: "uspa-spring", title: "Spring", client: "USPA", category: "Commercial",
        description: "A spring commercial for USPA.",
        image: "assets/images/uspa-spring.webp",
        embed: vi("900645674"), url: "https://vimeo.com/900645674"
      }),
      film({
        id: "simply-complicated", title: "Simply Complicated", client: "Demi Lovato", category: "Documentary",
        description: "Documentary work for Demi Lovato: Simply Complicated.",
        image: "assets/images/simply-complicated.webp", embed: yt("ZWTlL_w8cRA"), url: ytLink("ZWTlL_w8cRA")
      }),
      film({
        id: "chet-faker", title: "Feel Good", client: "Chet Faker", category: "Music video",
        description: "Music video for Chet Faker.",
        image: "assets/images/chet-faker.webp", embed: yt("YyODHqG2Tz0"), url: ytLink("YyODHqG2Tz0")
      }),
      film({
        id: "pike-county", title: "Pike County", client: "", category: "Short film",
        description: "Narrative short film.",
        image: "assets/images/pike-county.webp",
        embed: vi("263682306"), url: "https://vimeo.com/263682306"
      }),
      film({
        id: "ilan-rubin", title: "Studio 606", client: "Ilan Rubin", category: "Session film",
        description: "Ilan Rubin's session at Studio 606.",
        image: "assets/images/ilan-rubin.webp", embed: yt("rx6Pf3LITbI", 1430), url: "https://www.youtube.com/watch?v=rx6Pf3LITbI&t=1430s"
      }),
      film({
        id: "charlie-cheddars", title: "Charlie Cheddar's", client: "", category: "Commercial",
        description: "Commercial cinematography for Charlie Cheddar's.",
        image: "assets/images/charlie-cheddars.webp",
        embed: vi("443901139"), url: "https://vimeo.com/443901139"
      }),
      film({
        id: "sins-of-the-amish", title: "Sins of the Amish", client: "", category: "Documentary",
        description: "Documentary cinematography.",
        image: "assets/images/sins-of-the-amish.webp", embed: yt("CQVglFZ-HZ0"), url: ytLink("CQVglFZ-HZ0")
      }),
      film({
        id: "the-big-empty", title: "The Big Empty", client: "", category: "Documentary",
        description: "Documentary cinematography.",
        image: "assets/images/the-big-empty.webp", embed: yt("pGUj6jV1UOc"), url: ytLink("pGUj6jV1UOc")
      })
    ],

    campaigns: [
      campaign({
        id: "apple-iphone", title: "Shot on iPhone: Film Techniques", client: "Apple / Black Coffee", category: "Commercial campaign",
        role: "Creative Direction & Technical Direction",
        description: "Cinematic lighting and deliberate camera movement, explored through the iPhone camera.",
        image: "assets/images/apple-iphone.webp",
        url: "https://www.blackcoff.ee/#/apple-iphone-1/",
        details: ["Commercial and digital series", "Production: Black Coffee Productions", "Lighting, camera movement, and practical film techniques"]
      }),
      campaign({
        id: "swarovski-ariana", title: "Ariana Grande Capsule Collection", client: "Swarovski", category: "Fashion campaign",
        role: "Art Direction",
        description: "Jewelry, candy-colored sets, and a playful world built around Ariana Grande.",
        image: "assets/images/swarovski-ariana.webp", url: ytLink("fOgAI_gHr_U"),
        details: ["Global summer campaign", "Capsule collection launch", "Art direction"]
      }),
      campaign({
        id: "khalid-xr", title: "Nah: Immersive VR", client: "Google / Samsung", category: "Spatial experience",
        role: "Creative Producer & VR Cinematographer",
        description: "An immersive music experience joining spatial cinematography with custom tools for reviewing stereoscopic footage.",
        image: "assets/images/khalid-xr.webp", url: ytLink("8RtgEpz_wa8"),
        details: ["Music experience featuring Khalid", "Creative production and VR cinematography", "VR Live-View tooling for in-headset review"]
      }),
      campaign({
        id: "johnnie-walker", title: "Jingle Bells", client: "Johnnie Walker", category: "Holiday campaign",
        role: "Creative Director",
        description: "Tabletop drinks photography meets festive light and movement.",
        image: "assets/images/johnnie-walker.webp", url: "https://www.unreasonablestudios.com/johnny-walker-jingle-bells",
        details: ["Diageo / Unreasonable Studios", "Holiday broadcast campaign"]
      }),
      campaign({
        id: "vans-off-the-wall", title: "Off The Wall", client: "Vans", category: "Brand campaign",
        role: "Creative Director",
        description: "Skate motion, expressive framing, and the energy of street culture.",
        image: "assets/images/vans-off-the-wall.webp", url: "https://www.unreasonablestudios.com/vans-off-the-wall",
        details: ["Unreasonable Studios", "Skate and street culture campaign"]
      }),
      campaign({
        id: "dont-mess-with-texas", title: "Don't Mess With Texas", client: "TxDOT / Black Coffee", category: "Broadcast campaign",
        role: "Art Direction",
        description: "Ethan Hawke, Texas iconography, and a little deadpan humor.",
        image: "assets/images/dont-mess-with-texas.webp",
        url: "https://www.blackcoff.ee/#/dmwtethanhawke/", details: ["Featuring Ethan Hawke", "60-second broadcast campaign"]
      }),
      campaign({
        id: "don-julio", title: "Heritage Campaign", client: "Don Julio", category: "Spirits campaign",
        role: "Creative Director",
        description: "Warm earth tones and tactile imagery drawn from blue agave heritage.",
        image: "assets/images/don-julio.webp", url: "https://www.unreasonablestudios.com/don-julio",
        details: ["Diageo / Unreasonable Studios", "Luxury spirits campaign"]
      }),
      campaign({
        id: "ed-sheeran", title: "Mathematics Tour", client: "Ed Sheeran", category: "Tour visuals",
        role: "Visual Producer",
        description: "Promotional creative and screen visuals for a stadium stage seen from every angle.",
        image: "assets/images/ed-sheeran.webp",
        url: "https://www.blackcoff.ee/#/ed-sheeran/", details: ["Black Coffee", "Stadium tour visual package", "Circular, 360-degree stage geometry"]
      }),
      campaign({
        id: "blink-182", title: "Tour Checkup", client: "Blink-182", category: "Tour promo",
        role: "Creative Direction",
        description: "Travis Barker in a tour announcement with clinical satire and pop-punk irreverence.",
        image: "assets/images/blink-182.webp",
        url: "https://www.blackcoff.ee/#/blink-182/", details: ["Live Nation / GTC", "Tour announcement promo"]
      }),
      campaign({
        id: "tidal-brooklyn", title: "Tidal X Brooklyn", client: "Tidal / Roc Nation", category: "Concert campaign",
        role: "Visual Producer",
        description: "Visual identity and commercial integration for an arena benefit concert.",
        image: "assets/images/tidal-brooklyn.webp",
        url: "https://www.blackcoff.ee/#/tidal-x-brooklyn/", details: ["Barclays Center", "Concert visual campaign"]
      }),
      campaign({
        id: "olympic-handover", title: "Paris to LA28", client: "IOC / NBC / LA28", category: "Global broadcast",
        role: "Aerial & Action Cinematographer / Technical Producer",
        description: "Action photography and technical production for the Olympic handover featuring Tom Cruise.",
        image: "assets/images/olympic-handover.webp", url: ytLink("REVLVw3L5B4"),
        details: ["Paris 2024 Closing Ceremony", "Aerial and action camera work", "Technical production"]
      })
    ],

    projects: [
      project({
        id: "somnora", title: "Somnora", category: "Personal AI companion", role: "Founder, design & development", status: "App Store",
        description: "A companion for nights and the days they shape. Dreams, mood, sleep, and reflection come together in an ongoing conversation with Nora.",
        image: "assets/images/somnora.webp", url: "https://apps.apple.com/il/app/somnora/id6755064744",
        links: [{ label: "App Store", url: "https://apps.apple.com/il/app/somnora/id6755064744" }, { label: "Visit Somnora", url: "https://somnora.app/" }],
        details: ["Memory with inspectable sources", "Read-only HealthKit context", "Consent before optional actions", "iPhone and Apple Watch"],
        stack: ["SwiftUI", "HealthKit", "Cloud Run"]
      }),
      project({
        id: "manifold", title: "Manifold", category: "GPU orchestration", status: "Open source",
        description: "A local cockpit for cloud GPUs. Launch machines, run durable jobs, serve models, and bring the work home before shutting things down.",
        image: "assets/images/manifold.svg", url: "https://github.com/Somnora/Manifold",
        links: [{ label: "GitHub", url: "https://github.com/Somnora/Manifold" }],
        details: ["Shared controls for dashboard, desktop, and agents", "Budget and concurrency limits", "Durable jobs and output recovery"],
        stack: ["Python", "FastAPI", "Next.js", "Tauri"]
      }),
      project({
        id: "agentic", title: "Agentic", category: "Agent-native commerce", status: "Research / working title",
        description: "Product discovery that keeps its evidence visible. Merchant publishing and a separate WebMCP research demo explore how people and agents can understand an offer.",
        image: "assets/images/agentic.webp", url: "https://agentic-webmcp.somnora.workers.dev/",
        links: [{ label: "Research demo", url: "https://agentic-webmcp.somnora.workers.dev/" }, { label: "GitHub", url: "https://github.com/Somnora/agentic-webmcp" }],
        details: ["Merchant-authorized Shopify publishing", "Separate public WebMCP research build", "Field-level sources and freshness", "Human-controlled merchant handoff"],
        stack: ["TypeScript", "Cloudflare Workers", "Shopify", "WebMCP"]
      }),
      project({
        id: "warden", title: "Warden", category: "Agent governance", status: "In development",
        description: "A control plane for agents working with cloud infrastructure. Policy, spending limits, human approvals, and audit evidence sit between a request and an action.",
        image: "assets/images/warden.webp", url: "https://github.com/Somnora/Warden",
        links: [{ label: "GitHub", url: "https://github.com/Somnora/Warden" }],
        details: ["Policy checks before provider execution", "Durable human approval workflows", "Bounded missions and teardown deadlines", "Verifiable audit records"],
        stack: ["Python", "Google ADK", "FastAPI", "Firestore"]
      }),
      project({
        id: "callsheet-companion", title: "Callsheet Companion", category: "Tools for film crew", status: "App Store",
        description: "Built around the real rhythm of freelance crew life. Shoot days become invoices, overtime gets calculated, and the paperwork stays with the job.",
        image: "assets/images/callsheet.webp", url: "https://apps.apple.com/il/app/callsheet-companion/id6757967487",
        links: [{ label: "App Store", url: "https://apps.apple.com/il/app/callsheet-companion/id6757967487" }],
        details: ["Production, time, rates, and expenses", "Invoices, time cards, and work-history CVs", "Local records and optional CloudKit sync"],
        stack: ["SwiftUI", "SwiftData", "CloudKit"]
      }),
      project({
        id: "setview", title: "SetView", category: "AR previsualization", status: "Open source",
        description: "Find the shot before the crew arrives. Block virtual actors, test lenses, and plan lighting inside the actual location through a headset.",
        image: "assets/images/setview.webp", url: "https://github.com/Somnora/Set-View",
        links: [{ label: "GitHub", url: "https://github.com/Somnora/Set-View" }],
        details: ["Actor blocking and scene timing", "Virtual cameras with filmback and lens controls", "Lighting plans and shot-list exports"],
        stack: ["WebXR", "Three.js", "TypeScript"]
      }),
      project({
        id: "today-in-time", title: "Today In Time", category: "Daily almanac", status: "App Store",
        description: "A handful of sourced stories from this date in history. A small daily reading ritual with room for curiosity, a different tone, and a second look.",
        image: "assets/images/today.webp", url: "https://apps.apple.com/il/app/today-in-time/id6766169103",
        links: [{ label: "App Store", url: "https://apps.apple.com/il/app/today-in-time/id6766169103" }, { label: "GitHub", url: "https://github.com/Somnora/Today" }],
        details: ["Sourced editorial records", "Offline reading and saved stories", "Quizzes and a daily widget"],
        stack: ["SwiftUI", "WidgetKit", "Local JSON"]
      }),
      project({
        id: "squadsync", title: "SquadSync", category: "Gaming together", status: "In development",
        description: "Turn a group-chat maybe into a session. Plans, ready checks, expiring invites, and a one-tap rematch keep the group moving.",
        image: "assets/images/squadsync.webp", url: "https://somnora.app/SquadSync/",
        links: [{ label: "Product page", url: "https://somnora.app/SquadSync/" }],
        details: ["Sessions, squads, and expiring invites", "Ready checks and presence", "Run It Back rematches"],
        stack: ["SwiftUI", "FastAPI", "PostgreSQL", "Redis"]
      }),
      project({
        id: "homeplate", title: "HomePlate", category: "Friend availability", status: "In development",
        description: "A small signal to your friends: available, maybe, or busy. Add a little context, let it expire, and leave the permanent feed behind.",
        image: "assets/images/homeplate.webp",
        details: ["Friends connected through explicit codes", "Expiring availability posts", "Lightweight waves and notifications"],
        stack: ["SwiftUI", "Firebase", "Firestore"]
      }),
      project({
        id: "cosmo-trader", title: "Cosmo Trader", category: "Astrology & markets", status: "Open source",
        description: "Real market charts with a playful cosmic overlay. Moon phases, zodiac profiles, and retrograde windows are entertainment, never a trading signal.",
        image: "assets/images/cosmo.webp", url: "https://github.com/Somnora/Cosmo-Trader",
        links: [{ label: "GitHub", url: "https://github.com/Somnora/Cosmo-Trader" }],
        details: ["Market data and portfolio tracking", "Deterministic moon phases and transit windows", "Entertainment-only framing; no trade execution"],
        stack: ["SwiftUI", "WidgetKit", "FastAPI", "Firebase"]
      }),
      project({
        id: "locked", title: "Locked", category: "Virtual camera", status: "In development",
        description: "A camera that feels operated, even when it never moves. Subject tracking, patient reframing, and deliberate camera moves turn a static webcam into a local virtual camera.",
        image: null,
        details: ["Local Windows camera pipeline", "Subject lock and motion smoothing", "Hotkey, voice, and audio triggers", "OBS Virtual Camera output"],
        stack: ["Python", "MediaPipe", "OBS"]
      })
    ]
  };
}());
