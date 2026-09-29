const { generatePlayerPool } = require("./players");

// Single in-memory game (this app is designed for one host running one
// auction at a time — simplest possible backend for self-hosting).
let game = null;

function newGame(settings) {
  const {
    teamNames,
    budget,
    squadSize,
    numPlayers,
    basePrice,
    nationalityRule, // "none" | "indian-only" | "overseas-only"
    overseasCap, // max overseas players per squad, or null
  } = settings;

  const teams = teamNames.map((name, i) => ({
    id: i,
    name,
    budget,
    spent: 0,
    remaining: budget,
    squad: [],
    overseasCount: 0,
    full: false,
  }));

  const pool = generatePlayerPool(numPlayers, basePrice, nationalityRule);

  game = {
    settings: { ...settings },
    teams,
    pool, // full ordered pool for the main auction
    poolIndex: 0,
    unsoldList: [],
    unsoldIndex: 0,
    phase: "main", // main -> summary -> unsold-round -> lineup -> ratings
    currentPlayer: pool[0] || null,
    log: [],
  };

  return game;
}

function getGame() {
  return game;
}

function teamsWithOpenSlot() {
  return game.teams.filter((t) => t.squad.length < game.settings.squadSize);
}

function canTeamBuyPlayer(team, player) {
  // Team is already full
  if (team.squad.length >= game.settings.squadSize) {
    return false;
  }

  // Not enough money
  if (team.remaining < player.basePrice) {
    return false;
  }

  // User-defined overseas limit
  const cap = game.settings.overseasCap;

  if (
    cap != null &&
    player.nationality === "OV" &&
    team.overseasCount >= cap
  ) {
    return false;
  }

  return true;
}

function advanceMainAuction() {
  game.poolIndex += 1;

  // Stop auction if all teams have completed their squads
  if (teamsWithOpenSlot().length === 0) {
    game.phase = "summary";
    game.currentPlayer = null;
    return;
  }

  if (game.poolIndex >= game.pool.length) {
    // Main auction done.
    maybeStartUnsoldRoundOrSummary();
  } else {
    game.currentPlayer = game.pool[game.poolIndex];
  }
}



function maybeStartUnsoldRoundOrSummary() {
  const needMore = teamsWithOpenSlot().length > 0 && game.unsoldList.length > 0;
  if (needMore) {
    game.phase = "summary"; // show summary first, host triggers unsold round explicitly
  } else {
    game.phase = "summary";
  }
  game.currentPlayer = null;
}

function startUnsoldRound() {
  if (game.unsoldList.length === 0 || teamsWithOpenSlot().length === 0) {
    game.phase = "lineup";
    game.currentPlayer = null;
    return game;
  }
  game.phase = "unsold-round";
  game.unsoldIndex = 0;
  game.currentPlayer = game.unsoldList[0];
  return game;
}

function advanceUnsoldRound() {
  game.unsoldIndex += 1;
  const openTeams = teamsWithOpenSlot();
  if (game.unsoldIndex >= game.unsoldList.length || openTeams.length === 0) {
    game.phase = "lineup";
    game.currentPlayer = null;
  } else {
    game.currentPlayer = game.unsoldList[game.unsoldIndex];
  }
}

function placeBid(teamId, amount) {
  if (!game.currentPlayer) throw new Error("No player currently up for auction.");
  const team = game.teams.find((t) => t.id === teamId);
  if (!team) throw new Error("Unknown team.");
  if (team.squad.length >= game.settings.squadSize) {
    throw new Error(`${team.name} squad is already full.`);
  }
  if (amount > team.remaining) {
    throw new Error(`${team.name} does not have enough budget ($${team.remaining} left).`);
  }
  if (amount < game.currentPlayer.basePrice) {
    throw new Error(`Bid must be at least the base price ($${game.currentPlayer.basePrice}).`);
  }
  const cap = game.settings.overseasCap;
  if (cap != null && game.currentPlayer.nationality === "OV" && team.overseasCount >= cap) {
    throw new Error(`${team.name} has reached its overseas player limit (${cap}).`);
  }

  const player = { ...game.currentPlayer, sold: true, soldTo: team.name, soldFor: amount };
  team.squad.push(player);
  team.spent += amount;
  team.remaining = team.budget - team.spent;
  if (player.nationality === "OV") team.overseasCount += 1;
  team.full = team.squad.length >= game.settings.squadSize;

  game.log.push(`${player.name} -> ${team.name} for $${amount}`);

  // Reflect the sale in the source list (pool or unsold list) too.
  if (game.phase === "main") {
    game.pool[game.poolIndex] = player;
    advanceMainAuction();
  } else if (game.phase === "unsold-round") {
    game.unsoldList[game.unsoldIndex] = player;
    advanceUnsoldRound();
  }

  return game;
}

function markUnsold() {
  if (!game.currentPlayer) throw new Error("No player currently up for auction.");
  const player = { ...game.currentPlayer, unsold: true };

  if (game.phase === "main") {
    game.pool[game.poolIndex] = player;
    game.unsoldList.push(player);
    advanceMainAuction();
  } else if (game.phase === "unsold-round") {
    // Still unsold after the extra round; drop from further offers.
    game.unsoldList[game.unsoldIndex] = player;
    advanceUnsoldRound();
  }
  game.log.push(`${player.name} -> UNSOLD`);
  return game;
}

function setLineup(teamId, order) {
  const team = game.teams.find((t) => t.id === teamId);
  if (!team) throw new Error("Unknown team.");
  // order is an array of player ids in the user's chosen order.
  const byId = Object.fromEntries(team.squad.map((p) => [p.id, p]));
  const lineup = order.map((id) => byId[id]).filter(Boolean);
  team.lineup = lineup.length ? lineup : team.squad.slice(0, game.settings.xiSize || 11);
  return team;
}

function avg(list, key) {
  if (!list.length) return 0;
  return list.reduce((s, p) => s + (p.attrs[key] || 0), 0) / list.length;
}

function computeRating(team) {
  const xi = team.lineup && team.lineup.length ? team.lineup : team.squad.slice(0, 11);
  const bowlers = xi.filter((p) => p.attrs.bowl >= 5);
  const batting = avg(xi, "bat");
  const power = avg(xi, "pow");
  const finishing = avg(xi.filter((p) => p.attrs.fin >= 5).length ? xi.filter((p) => p.attrs.fin >= 5) : xi, "fin");
  const bowling = avg(bowlers.length ? bowlers : xi, "bowl");
  const pace = avg(xi.filter((p) => p.attrs.pace >= 5).length ? xi.filter((p) => p.attrs.pace >= 5) : xi, "pace");
  const spin = avg(xi.filter((p) => p.attrs.spin >= 5).length ? xi.filter((p) => p.attrs.spin >= 5) : xi, "spin");
  const allround = avg(xi.filter((p) => p.role === "All-rounder"), "bat") ? 
    (avg(xi.filter((p) => p.role === "All-rounder"), "bat") + avg(xi.filter((p) => p.role === "All-rounder"), "bowl")) / 2 
    : 3;
  const keeping = Math.max(...xi.map((p) => p.attrs.keep), 1);
  const battingDepth = xi.filter((p) => p.attrs.bat >= 5).length;
  const bowlingDepth = bowlers.length;
  const roleCoverage = new Set(xi.map((p) => p.role)).size;
  const balance = (batting + bowling) / 2;

  const scale10 = (v, max) => Math.max(1, Math.min(10, Math.round((v / max) * 10)));

  const scores = {
    Batting: Math.round(batting * 10) / 10,
    "Power Hitting": Math.round(power * 10) / 10,
    Finishing: Math.round(finishing * 10) / 10,
    Bowling: Math.round(bowling * 10) / 10,
    "Pace Attack": Math.round(pace * 10) / 10,
    "Spin Attack": Math.round(spin * 10) / 10,
    "All-round Ability": Math.round(allround * 10) / 10,
    Wicketkeeping: Math.round(keeping * 10) / 10,
    "Batting Depth": scale10(battingDepth, 7),
    "Bowling Depth": scale10(bowlingDepth, 5),
    "Role Coverage": scale10(roleCoverage, 7),
    "T20 Balance": Math.round(balance * 10) / 10,
  };

  const overall =
    Math.round(
      (Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length) * 10
    ) / 10;

  return { team: team.name, scores, overall };
}

module.exports = {
  newGame,
  getGame,
  placeBid,
  markUnsold,
  startUnsoldRound,
  setLineup,
  computeRating,
  teamsWithOpenSlot,
};
