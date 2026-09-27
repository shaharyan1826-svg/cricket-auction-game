// Real-player pool for the T20 auction game.
// Player names and nationalities are real. Attribute ratings are game-play
// ratings for the auction simulation and are not official player statistics.

const REAL_PLAYERS = [
  // India
  { name: "Rohit Sharma", nationality: "IN", role: "Opener", attrs: {bat:9,pow:8,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Virat Kohli", nationality: "IN", role: "Opener", attrs: {bat:10,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Shubman Gill", nationality: "IN", role: "Opener", attrs: {bat:9,pow:7,fin:5,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Yashasvi Jaiswal", nationality: "IN", role: "Opener", attrs: {bat:9,pow:8,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Ruturaj Gaikwad", nationality: "IN", role: "Opener", attrs: {bat:8,pow:7,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Suryakumar Yadav", nationality: "IN", role: "Middle Order", attrs: {bat:9,pow:10,fin:9,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Rishabh Pant", nationality: "IN", role: "Wicketkeeper", attrs: {bat:8,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:9} },
  { name: "Sanju Samson", nationality: "IN", role: "Wicketkeeper", attrs: {bat:8,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Ishan Kishan", nationality: "IN", role: "Wicketkeeper", attrs: {bat:7,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Shreyas Iyer", nationality: "IN", role: "Middle Order", attrs: {bat:8,pow:7,fin:7,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Tilak Varma", nationality: "IN", role: "Middle Order", attrs: {bat:8,pow:8,fin:7,bowl:3,pace:1,spin:4,keep:1} },
  { name: "Rinku Singh", nationality: "IN", role: "Finisher", attrs: {bat:7,pow:9,fin:10,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Hardik Pandya", nationality: "IN", role: "All-rounder", attrs: {bat:8,pow:9,fin:9,bowl:7,pace:8,spin:1,keep:1} },
  { name: "Ravindra Jadeja", nationality: "IN", role: "All-rounder", attrs: {bat:8,pow:7,fin:8,bowl:8,pace:4,spin:9,keep:1} },
  { name: "Axar Patel", nationality: "IN", role: "All-rounder", attrs: {bat:7,pow:6,fin:7,bowl:8,pace:3,spin:9,keep:1} },
  { name: "Washington Sundar", nationality: "IN", role: "All-rounder", attrs: {bat:6,pow:5,fin:5,bowl:7,pace:2,spin:8,keep:1} },
  { name: "Kuldeep Yadav", nationality: "IN", role: "Spinner", attrs: {bat:3,pow:2,fin:1,bowl:9,pace:1,spin:10,keep:1} },
  { name: "Yuzvendra Chahal", nationality: "IN", role: "Spinner", attrs: {bat:2,pow:2,fin:1,bowl:9,pace:1,spin:10,keep:1} },
  { name: "Jasprit Bumrah", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:10,pace:10,spin:1,keep:1} },
  { name: "Mohammed Shami", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:9,pace:9,spin:1,keep:1} },
  { name: "Mohammed Siraj", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:9,spin:1,keep:1} },
  { name: "Arshdeep Singh", nationality: "IN", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:8,spin:1,keep:1} },
  { name: "Harshal Patel", nationality: "IN", role: "Fast Bowler", attrs: {bat:3,pow:2,fin:2,bowl:8,pace:7,spin:1,keep:1} },

  // Australia
  { name: "Travis Head", nationality: "OV", role: "Opener", attrs: {bat:9,pow:10,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "David Warner", nationality: "OV", role: "Opener", attrs: {bat:9,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Glenn Maxwell", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:10,fin:10,bowl:6,pace:2,spin:7,keep:1} },
  { name: "Mitchell Marsh", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:9,fin:8,bowl:6,pace:7,spin:1,keep:1} },
  { name: "Pat Cummins", nationality: "OV", role: "Fast Bowler", attrs: {bat:5,pow:5,fin:4,bowl:9,pace:9,spin:1,keep:1} },
  { name: "Mitchell Starc", nationality: "OV", role: "Fast Bowler", attrs: {bat:3,pow:2,fin:2,bowl:9,pace:10,spin:1,keep:1} },
  { name: "Josh Hazlewood", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:9,pace:8,spin:1,keep:1} },

  // England
  { name: "Jos Buttler", nationality: "OV", role: "Wicketkeeper", attrs: {bat:9,pow:10,fin:9,bowl:1,pace:1,spin:1,keep:9} },
  { name: "Phil Salt", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:10,fin:8,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Harry Brook", nationality: "OV", role: "Middle Order", attrs: {bat:8,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Liam Livingstone", nationality: "OV", role: "All-rounder", attrs: {bat:7,pow:10,fin:9,bowl:7,pace:6,spin:8,keep:1} },
  { name: "Jofra Archer", nationality: "OV", role: "Fast Bowler", attrs: {bat:3,pow:2,fin:2,bowl:9,pace:10,spin:1,keep:1} },
  { name: "Sam Curran", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:7,fin:8,bowl:7,pace:7,spin:1,keep:1} },

  // West Indies
  { name: "Andre Russell", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:10,fin:10,bowl:7,pace:8,spin:1,keep:1} },
  { name: "Nicholas Pooran", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:10,fin:9,bowl:1,pace:1,spin:1,keep:7} },
  { name: "Shimron Hetmyer", nationality: "OV", role: "Middle Order", attrs: {bat:7,pow:9,fin:9,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Rovman Powell", nationality: "OV", role: "Finisher", attrs: {bat:7,pow:9,fin:9,bowl:3,pace:1,spin:2,keep:1} },

  // South Africa
  { name: "Quinton de Kock", nationality: "OV", role: "Wicketkeeper", attrs: {bat:9,pow:9,fin:8,bowl:1,pace:1,spin:1,keep:9} },
  { name: "David Miller", nationality: "OV", role: "Finisher", attrs: {bat:8,pow:10,fin:10,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Heinrich Klaasen", nationality: "OV", role: "Wicketkeeper", attrs: {bat:9,pow:10,fin:9,bowl:1,pace:1,spin:1,keep:8} },
  { name: "Kagiso Rabada", nationality: "OV", role: "Fast Bowler", attrs: {bat:3,pow:2,fin:1,bowl:9,pace:9,spin:1,keep:1} },
  { name: "Marco Jansen", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:7,fin:6,bowl:8,pace:9,spin:1,keep:1} },

  // New Zealand
  { name: "Kane Williamson", nationality: "OV", role: "Middle Order", attrs: {bat:9,pow:6,fin:6,bowl:1,pace:1,spin:2,keep:1} },
  { name: "Devon Conway", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:8,fin:7,bowl:1,pace:1,spin:1,keep:7} },
  { name: "Trent Boult", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:9,pace:9,spin:1,keep:1} },
  { name: "Mitchell Santner", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:5,fin:5,bowl:8,pace:2,spin:9,keep:1} },

  // Afghanistan
  { name: "Rashid Khan", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:7,fin:8,bowl:10,pace:1,spin:10,keep:1} },
  { name: "Mohammad Nabi", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:6,fin:7,bowl:8,pace:2,spin:9,keep:1} },
  { name: "Rahmanullah Gurbaz", nationality: "OV", role: "Wicketkeeper", attrs: {bat:8,pow:9,fin:7,bowl:1,pace:1,spin:1,keep:8} },

  // Sri Lanka
  { name: "Wanindu Hasaranga", nationality: "OV", role: "All-rounder", attrs: {bat:6,pow:7,fin:7,bowl:9,pace:1,spin:10,keep:1} },
  { name: "Matheesha Pathirana", nationality: "OV", role: "Fast Bowler", attrs: {bat:1,pow:1,fin:1,bowl:9,pace:10,spin:1,keep:1} },
  { name: "Maheesh Theekshana", nationality: "OV", role: "Spinner", attrs: {bat:3,pow:2,fin:1,bowl:8,pace:1,spin:9,keep:1} },

  // Pakistan / Bangladesh
  { name: "Babar Azam", nationality: "OV", role: "Opener", attrs: {bat:9,pow:7,fin:6,bowl:1,pace:1,spin:1,keep:1} },
  { name: "Shaheen Shah Afridi", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:9,pace:10,spin:1,keep:1} },
  { name: "Shakib Al Hasan", nationality: "OV", role: "All-rounder", attrs: {bat:8,pow:6,fin:6,bowl:8,pace:2,spin:9,keep:1} },
  { name: "Mustafizur Rahman", nationality: "OV", role: "Fast Bowler", attrs: {bat:2,pow:1,fin:1,bowl:8,pace:7,spin:1,keep:1} }
];

const ROLES = [
  { key: "Opener", icon: "🏏" },
  { key: "Middle Order", icon: "🏏" },
  { key: "Power Hitter", icon: "💥" },
  { key: "Finisher", icon: "🧨" },
  { key: "Wicketkeeper", icon: "🧤" },
  { key: "All-rounder", icon: "🔄" },
  { key: "Fast Bowler", icon: "⚡" },
  { key: "Spinner", icon: "🌀" },
];

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generatePlayerPool(count, basePrice, nationalityRule) {
  let pool = REAL_PLAYERS.slice();

  if (nationalityRule === "indian-only") {
    pool = pool.filter(p => p.nationality === "IN");
  } else if (nationalityRule === "overseas-only") {
    pool = pool.filter(p => p.nationality === "OV");
  }

  // Randomize the auction order, but do not invent player names.
  pool = shuffle(pool);

  // If the requested pool is larger than the available real players,
  // reuse the real database with a unique auction id.
  const selected = [];
  for (let i = 0; i < count; i++) {
    const template = pool[i % pool.length];
    const attrs = { ...template.attrs };
    const overall = Object.values(attrs).reduce((a, b) => a + b, 0) / 7;

    // Keep the user's configured base price, with a small star multiplier.
    const priceMultiplier =
      overall >= 8.5 ? 3 :
      overall >= 7.5 ? 2 : 1;

    selected.push({
      id: `p${i + 1}`,
      name: template.name,
      role: template.role,
      icon: ROLES.find(r => r.key === template.role)?.icon || "🏏",
      nationality: template.nationality,
      basePrice: basePrice * priceMultiplier,
      attrs,
      sold: false,
      soldTo: null,
      soldFor: null,
      unsold: false,
    });
  }

  return selected;
}

module.exports = { generatePlayerPool, ROLES };
