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
  aiDecision,
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
      unsoldTotal: g.unsoldList.filter(p => !p.sold).length,
      unsoldRounds: g.unsoldRounds || 0,
    },
    unsoldList: g.unsoldList.filter(p => !p.sold),
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
      humanVsComputer,
      humanTeamId,
      aiDifficulty,
    } = req.body;

    if (!Array.isArray(teamNames) || teamNames.length < 2) {
      return res.status(400).json({ error: "Provide at least 2 team names." });
    }
    if (!budget || !squadSize || !numPlayers || !basePrice) {
      return res.status(400).json({ error: "Missing required settings." });
    }
    const numericSettings = [Number(budget), Number(squadSize), Number(numPlayers), Number(basePrice)];
    if (numericSettings.some((value) => !Number.isFinite(value) || value <= 0)) {
      return res.status(400).json({ error: "Budget, squad size, player count, and base price must be positive numbers." });
    }
    if (Number(budget) < Number(squadSize) * Number(basePrice)) {
      return res.status(400).json({
        error: `Budget is too low to complete a squad. Each team needs at least $${Number(squadSize) * Number(basePrice)} (${squadSize} players × $${basePrice} minimum base price). Increase the budget or lower the squad size/base price.`,
      });
    }
    if (Number(overseasCap == null || overseasCap === "" ? 8 : overseasCap) < 0 || Number(overseasCap == null || overseasCap === "" ? 8 : overseasCap) > 8) {
      return res.status(400).json({ error: "Maximum overseas players per squad must be between 0 and 8." });
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
      overseasCap: overseasCap === "" || overseasCap == null ? 8 : Number(overseasCap),
      humanVsComputer: humanVsComputer === true,
      humanTeamId: Number(humanTeamId || 0),
      aiDifficulty: aiDifficulty || "professional",
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


app.post("/api/ai-decision", (req, res) => {
  try {
    const result = aiDecision();
    res.json({ ...serialize(), aiResult: result });
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
