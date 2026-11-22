/* =========================================================
   vinayedits.com — ALL SITE CONTENT LIVES HERE
   To add a video / service / client, add an entry to a list.
   Anything marked TODO is a placeholder waiting for real info.
   ========================================================= */

window.SITE = {
  name: "Vinay Shende",
  brand: "vinayedits",

  contact: {
    whatsapp: "919921536187", // country code + number, digits only
    email: "",                // TODO: after the vinayedits.com domain is set up
    instagram: "vnay_vfx"     // without @
  },

  /* Aisles = video categories, in the order the screens appear in the shop.
     shape "wide" = TV screens, "tall" = phone screens.
     (Add { id: "talkinghead", label: "Talking Head", shape: "tall" } back when there are talking-head videos.) */
  aisles: [
    { id: "reels", label: "Shorts & Reels", shape: "tall" },
    { id: "longform", label: "Long-form", shape: "wide" },
    { id: "podcasts", label: "Podcasts", shape: "wide" }
  ],

  /* Videos. Each needs ONE source:
       youtube: "VIDEO_ID"   (the part after watch?v= or /shorts/)
       vimeo:   "VIDEO_ID"   (the number in the vimeo link)
       file:    "assets/videos/name.mp4"
       link:    "https://..." (anything else, e.g. an X post — opens in a new tab)
     Optional: views: "1.2M", client: "Channel name"
     The first 3 shorts / first 2 long-form & podcasts show on the screens;
     the rest appear under "See all". */
  videos: [
    // Shorts & Reels
    { aisle: "reels", title: "Jaden — Ad #1", youtube: "LX0rDBNpJK0" },
    { aisle: "reels", title: "Jaden — Ad #2", youtube: "6mU6mCiXG3Y" },
    { aisle: "reels", title: "Fyers", youtube: "dR0JKBCbMkI" },
    { aisle: "reels", title: "Mian — Facebook ad", youtube: "BQurqj_3zyY" },
    { aisle: "reels", title: "Carson", youtube: "8pm2ahem80k" },
    { aisle: "reels", title: "Spiritual short", youtube: "PljkYczppU8" },

    // Long-form
    { aisle: "longform", title: "Most Christians MISS This About Dinosaurs...", youtube: "ebe6XB0b3QM", client: "Allen Parr" },
    { aisle: "longform", title: "If You Just Sinned, Watch This Video Now", youtube: "3A8a8LJ8-1E", client: "Allen Parr" },
    { aisle: "longform", title: "Insight", youtube: "K3FJKICoapU" },
    { aisle: "longform", title: "Pre-call video", youtube: "hrnbqKIy0oc" },

    // Podcasts
    { aisle: "podcasts", title: "Rabbi Exposes the WRONG Ways Christians Interpret the Old Testament", youtube: "-O7dTrP2iSI", client: "Allen Parr" },
    { aisle: "podcasts", title: "Podcast clip for Vader Research", link: "https://x.com/VaderResearch/status/1980543505098244386", client: "Vader Research" }
  ],

  services: [
    {
      name: "Shorts / Reels",
      price: "$50",
      unit: "per short",
      items: ["Vertical 9:16 edits", "Hook-first structure", "Animated captions", "Ads & organic content"]
    },
    {
      name: "Long-form",
      price: "$20",
      short: "/min", // shown after the price on the chalkboard
      unit: "per minute",
      items: ["YouTube edits", "Story pacing & retention cuts", "Motion graphics & captions", "Colour + sound polish"]
    },
    {
      name: "Podcasts",
      price: "$300",
      unit: "per episode",
      items: ["Full episode edit", "+ 5 short clips included", "Multi-cam switching", "Audio cleanup"]
    }
  ],

  /* The journey, printed as a shop receipt */
  receipt: [
    { when: "2024", what: "1× Laptop — gift from Papa", price: "PRICELESS" },
    { when: "2024", what: "Self-taught: Premiere Pro, Photoshop, After Effects", price: "$0.00" },
    { when: "NOV 2024", what: "First agency gig (2–3 months)", price: "PAID" },
    { when: "2025", what: "Edited for 2 different agencies", price: "PAID" },
    { when: "2026", what: "Freelance clients + an agency", price: "PAID" }
  ],
  bought: ["College fees", "MacBook Pro", "New phone", "Electric desk & full setup"],

  /* Clients — "Regular customers" section.
     work = what Vinay edited for them (his own words, not a quote from the client).
     stat = optional highlight badge. photo = optional, e.g. "assets/clients/luis.jpg" */
  clients: [
    { name: "Dr. Nmami Agarwal", photo: "assets/clients/nmami.webp", platform: "Instagram", handle: "@nmamiagarwal", url: "https://www.instagram.com/nmamiagarwal/",
      work: "Edited a long run of Instagram reels for her page.", stat: "500K+ views per reel" },
    { name: "Allen Parr", photo: "assets/clients/allen.webp", platform: "YouTube", handle: "@thebeatagp", url: "https://www.youtube.com/@thebeatagp",
      work: "Edited his podcast episodes and long-form videos for THE BEAT.", stat: "Podcast · 2025" },
    { name: "Bruno Sousa", photo: "assets/clients/bruno.webp", platform: "X", handle: "@goatfather_web3", url: "https://x.com/goatfather_web3",
      work: "Edited a stack of Web3 videos for his X audience.", stat: "Web3" },
    { name: "Dominic Namis", photo: "assets/clients/dominic.webp", platform: "LinkedIn", url: "https://www.linkedin.com/in/dnamis/",
      work: "Cut montages and LinkedIn reels for his personal brand.", stat: "Montages + reels" },
    { name: "Luis Lan", photo: "assets/clients/luis.webp", platform: "LinkedIn", url: "https://www.linkedin.com/in/luis-lan/",
      work: "Edited short-form videos for his LinkedIn.", stat: "Short-form" }
  ],

  /* Testimonials — client's own words only. e.g.
     { name: "Allen Parr", role: "THE BEAT by Allen Parr", text: "..." } */
  reviews: []
};
