const express = require("express");
const path = require("path");
const {
  newGame,
  getGame,
  placeBid,
  markUnsold,
  startUnsoldRound,
  setLineup,
  computeRating,
} = require("./gameLogic");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

function serialize() {
  const g = getGame();
  if (!g) return null;
  return {
    settings: g.settings,
    teams: g.teams,
    currentPlayer: g.currentPlayer,
    phase: g.phase,
    progress: {
      mainIndex: g.poolIndex,
      mainTotal: g.pool.length,
      unsoldIndex: g.unsoldIndex,
      unsoldTotal: g.unsoldList.length,
    },
    unsoldList: g.unsoldList,
    log: g.log.slice(-10),
  };
}

app.post("/api/start", (req, res) => {
  try {
    const {
      teamNames,
      budget,
      squadSize,
      numPlayers,
      basePrice,
      nationalityRule,
      overseasCap,
    } = req.body;

    if (!Array.isArray(teamNames) || teamNames.length < 2) {
      return res.status(400).json({ error: "Provide at least 2 team names." });
    }
    if (!budget || !squadSize || !numPlayers || !basePrice) {
      return res.status(400).json({ error: "Missing required settings." });
    }
    if (numPlayers < teamNames.length * squadSize) {
      return res.status(400).json({
        error: `Auction pool (${numPlayers}) is smaller than total squad slots (${teamNames.length * squadSize}). Increase player count.`,
      });
    }

    newGame({
      teamNames,
      budget: Number(budget),
      squadSize: Number(squadSize),
      numPlayers: Number(numPlayers),
      basePrice: Number(basePrice),
      nationalityRule: nationalityRule || "none",
      overseasCap: overseasCap ? Number(overseasCap) : null,
    });

    res.json(serialize());
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/state", (req, res) => {
  const state = serialize();
  if (!state) return res.status(404).json({ error: "No game in progress." });
  res.json(state);
});

app.post("/api/bid", (req, res) => {
  try {
    const { teamId, amount } = req.body;
    placeBid(Number(teamId), Number(amount));
    res.json(serialize());
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/unsold", (req, res) => {
  try {
    markUnsold();
    res.json(serialize());
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/start-unsold-round", (req, res) => {
  try {
    startUnsoldRound();
    res.json(serialize());
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.post("/api/lineup", (req, res) => {
  try {
    const { teamId, order } = req.body;
    const team = setLineup(Number(teamId), order || []);
    res.json({ team });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.get("/api/ratings", (req, res) => {
  const g = getGame();
  if (!g) return res.status(404).json({ error: "No game in progress." });
  const ratings = g.teams.map(computeRating);
  res.json({ ratings });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Cricket Auction server running at http://localhost:${PORT}`);
});
