// Curated list of upcoming events with detailed data, dates, categories, and agenda
const INITIAL_EVENTS = [
  {
    id: "evt-1",
    title: "Global Tech Innovators Summit 2026",
    category: "technology",
    categoryLabel: "Technology",
    date: "2026-11-20T09:30:00",
    displayDate: "Nov 20, 2026 • 9:30 AM",
    venue: "Silicon Convention Arena, Hall A & Online",
    city: "San Francisco / Virtual",
    price: "Free",
    isFeatured: true,
    seatsRemaining: 42,
    totalSeats: 300,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    description: "Join premier industry leaders, AI pioneers, and tech visionaries discussing the breakthrough frontiers of Agentic AI, Quantum Computing, and Next-Gen Web.",
    detailedDescription: "The Global Tech Innovators Summit 2026 gathers over 3,000 developers, architects, and founders. Experience hands-on technical workshops, live product keynotes, and deep networking sessions with leading pioneers in artificial intelligence and cloud architectures.",
    speakers: [
      { name: "Dr. Elena Vance", role: "Chief AI Architect, NeuroTech" },
      { name: "Marcus Chen", role: "VP of Engineering, CloudScale" }
    ],
    agenda: [
      "09:30 AM - Opening Keynote: The Agentic Web Era",
      "11:15 AM - Deep Dive: Quantum & Edge Computing Paradigms",
      "02:00 PM - Panel: Ethical AI and Decentralized Systems",
      "04:30 PM - Live Innovation Demo & Pitch Showcase"
    ]
  },
  {
    id: "evt-2",
    title: "Neon Horizon Music & Arts Festival",
    category: "music",
    categoryLabel: "Music & Arts",
    date: "2026-11-28T17:00:00",
    displayDate: "Nov 28, 2026 • 5:00 PM",
    venue: "Starlight Open-Air Amphitheater",
    city: "Los Angeles, CA",
    price: "$49",
    isFeatured: true,
    seatsRemaining: 18,
    totalSeats: 1200,
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
    description: "An electrifying night of live synthwave, electronic beats, holographic laser installations, and experiential visual art.",
    detailedDescription: "Immerse yourself into a sensory wonderland featuring world-renowned electronic DJs, mesmerizing 3D laser projections, synchronized drone choreographies, and artisanal food pop-ups under the twilight skies.",
    speakers: [
      { name: "Kairo & The Synthetics", role: "Headline Electronic Act" },
      { name: "Aria Nova", role: "Ambient Holographic Artist" }
    ],
    agenda: [
      "05:00 PM - Sunset Ambient DJ Set & Gate Opening",
      "07:30 PM - Holographic Light & Laser Spectacle",
      "09:00 PM - Mainstage Live Electronic Performances",
      "11:30 PM - Midnight Cosmic Drone Light Finale"
    ]
  },
  {
    id: "evt-3",
    title: "International Web3 & Cybersecurity Workshop",
    category: "workshops",
    categoryLabel: "Workshops",
    date: "2026-12-05T10:00:00",
    displayDate: "Dec 05, 2026 • 10:00 AM",
    venue: "CyberLabs Institute, Suite 402",
    city: "Seattle, WA",
    price: "$29",
    isFeatured: true,
    seatsRemaining: 15,
    totalSeats: 80,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80",
    description: "Hands-on masterclass covering zero-trust architecture, web vulnerability scanning, penetration testing, and secure modern API design.",
    detailedDescription: "Designed for intermediate-to-advanced software engineers and security researchers. Participants will audit live mock codebases, patch zero-day vulnerabilities in isolated sandboxes, and receive a verified Workshop Certificate of Completion upon finishing.",
    speakers: [
      { name: "Sophia Reynolds", role: "Principal SecOps Specialist" },
      { name: "Tariq Al-Mansoor", role: "Ethical Hacker & Threat Intel" }
    ],
    agenda: [
      "10:00 AM - Modern Threat Vectors: OWASP Top 10 Revisited",
      "12:00 PM - Interactive Lab: Breaking & Defending Microservices",
      "02:30 PM - Zero Trust Deployment in Cloud Environments",
      "04:30 PM - Capstone Defense Challenge & Certificate Distribution"
    ]
  },
  {
    id: "evt-4",
    title: "Apex Esports Championship & LAN Invitational",
    category: "gaming",
    categoryLabel: "Gaming & Esports",
    date: "2026-12-12T13:00:00",
    displayDate: "Dec 12, 2026 • 1:00 PM",
    venue: "Nexus Gaming Arena & Stadium",
    city: "Austin, TX",
    price: "$19",
    isFeatured: false,
    seatsRemaining: 65,
    totalSeats: 500,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80",
    description: "Watch the top 16 collegiate and pro esports squads clash in a high-stakes tournament with live shoutcasting, VR booths, and cosplay contests.",
    detailedDescription: "Feel the stadium thunder as elite gaming rosters compete for a $50,000 prize pool. Attendees gain access to demo booths showcasing unreleased PC and console games, free-play retro arcade lounges, and meet-and-greets with pro streamers.",
    speakers: [
      { name: "Dexter 'Viper' Vance", role: "Senior Esports Caster" },
      { name: "Maya 'PixelCat' Lin", role: "Pro Gamer & Content Creator" }
    ],
    agenda: [
      "01:00 PM - Opening Ceremony & Squad Intros",
      "02:00 PM - Quarter-Finals Bracket Play (Best of 3)",
      "05:30 PM - Cosplay Showcase & Audience Prize Raffles",
      "07:00 PM - Grand Finals & Trophy Presentation"
    ]
  },
  {
    id: "evt-5",
    title: "Future of UI/UX & 3D Interactive Web Design",
    category: "design",
    categoryLabel: "Design & UX",
    date: "2026-12-18T14:00:00",
    displayDate: "Dec 18, 2026 • 2:00 PM",
    venue: "Metropolitan Design Hub, Auditorium",
    city: "New York, NY",
    price: "Free",
    isFeatured: false,
    seatsRemaining: 28,
    totalSeats: 150,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    description: "Explore the bleeding-edge of WebGL, spatial interfaces, micro-interactions, and accessible design systems.",
    detailedDescription: "This symposium connects digital product designers, creative coders, and front-end innovators. Discover how generative design tools, Three.js spatial UI, and dynamic physics engines are transforming digital consumer experiences.",
    speakers: [
      { name: "Lucas Sterling", role: "Creative Director at StudioMotion" },
      { name: "Amara O'Connor", role: "Design Systems Lead" }
    ],
    agenda: [
      "02:00 PM - The Evolution from Flat 2D to Spatial 3D UI",
      "03:15 PM - Motion Choreography & Micro-Interactions in CSS/JS",
      "04:30 PM - Designing for Accessibility in 3D Web Experiences",
      "05:30 PM - Portfolio Reviews & Networking Mixer"
    ]
  },
  {
    id: "evt-6",
    title: "Startup Founders Pitch Gala & Angel Network",
    category: "business",
    categoryLabel: "Business",
    date: "2027-01-10T18:00:00",
    displayDate: "Jan 10, 2027 • 6:00 PM",
    venue: "Grand Horizon Ballroom, Sky Level",
    city: "Chicago, IL",
    price: "$75",
    isFeatured: false,
    seatsRemaining: 12,
    totalSeats: 100,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80",
    description: "An exclusive evening connecting early-stage tech founders with venture capitalists, angel investors, and industry advisors.",
    detailedDescription: "Ten curated seed-stage startups will deliver rapid 5-minute pitches to an esteemed panel of VC partners followed by Q&A. The evening includes an upscale dinner reception, VIP breakout suites, and bilateral investor deal-flow rooms.",
    speakers: [
      { name: "Jonathan Sterling", role: "Managing General Partner, Horizon VC" },
      { name: "Priya Nair", role: "Serial Founder & Angel Syndicate Lead" }
    ],
    agenda: [
      "06:00 PM - Cocktail Welcome & Investor Badge Check",
      "07:00 PM - Top 10 Startup Pitch Showcases",
      "08:30 PM - Judges Deliberation & Best Pitch Award",
      "09:00 PM - Private Deal-Making & Networking Reception"
    ]
  }
];
