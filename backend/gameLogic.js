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
    unsoldRoundPool: [],
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

function minimumReserveForTeam(team, afterBuying = false) {
  const slotsLeft = game.settings.squadSize - team.squad.length - (afterBuying ? 1 : 0);
  return Math.max(0, slotsLeft) * game.settings.basePrice;
}

// Maximum amount this team can bid while keeping enough money to fill
// every remaining squad slot at the configured minimum base price.
function maxAffordableBid(team) {
  const openSlots = game.settings.squadSize - team.squad.length;
  if (openSlots <= 0) return 0;
  return Math.max(0, team.remaining - minimumReserveForTeam(team, true));
}

function canTeamBuyPlayer(team, player) {
  if (team.squad.length >= game.settings.squadSize) return false;

  const cap = game.settings.overseasCap == null ? 8 : game.settings.overseasCap;
  if (cap != null && player.nationality === "OV" && team.overseasCount >= cap) {
    return false;
  }

  return maxAffordableBid(team) >= player.basePrice;
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
  game.unsoldList = game.unsoldList.filter(p => !p.sold);
  if (game.unsoldList.length === 0 || teamsWithOpenSlot().length === 0) {
    game.phase = "lineup";
    game.currentPlayer = null;
    return game;
  }
  game.phase = "unsold-round";
  game.unsoldRounds = (game.unsoldRounds || 0) + 1;
  game.unsoldRoundPool = game.unsoldList.filter(p => !p.sold);
  game.unsoldIndex = 0;
  game.currentPlayer = game.unsoldRoundPool[0] || null;
  return game;
}

function advanceUnsoldRound() {
  game.unsoldIndex += 1;
  const openTeams = teamsWithOpenSlot();
  if (game.unsoldIndex >= game.unsoldRoundPool.length || openTeams.length === 0) {
    game.phase = "lineup";
    game.currentPlayer = null;
  } else {
    game.currentPlayer = game.unsoldRoundPool[game.unsoldIndex];
  }
}

function placeBid(teamId, amount) {
  if (!game.currentPlayer) throw new Error("No player currently up for auction.");
  const team = game.teams.find((t) => t.id === teamId);
  if (!team) throw new Error("Unknown team.");
  if (team.squad.length >= game.settings.squadSize) {
    throw new Error(`${team.name} squad is already full.`);
  }
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("Enter a valid bid amount.");
  }
  const maxBid = maxAffordableBid(team);
  if (maxBid < game.currentPlayer.basePrice) {
    const slotsLeft = game.settings.squadSize - team.squad.length;
    throw new Error(
      `${team.name} cannot afford this player and still fill the squad. ` +
      `You have $${team.remaining}, need to reserve $${minimumReserveForTeam(team)} ` +
      `for ${slotsLeft} remaining slot(s), and can bid up to $${maxBid} on this player.`
    );
  }
  if (amount > maxBid) {
    throw new Error(
      `Maximum safe bid for ${team.name} is $${maxBid}. ` +
      `Keep at least $${minimumReserveForTeam(team, true)} for the remaining squad slots.`
    );
  }
  if (amount < game.currentPlayer.basePrice) {
    throw new Error(`Bid must be at least the base price ($${game.currentPlayer.basePrice}).`);
  }
  const cap = game.settings.overseasCap == null ? 8 : game.settings.overseasCap;
  if (!["IN", "OV"].includes(game.currentPlayer.nationality)) throw new Error("This player has unknown nationality; purchase blocked until the player data is corrected.");
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
    game.unsoldList = game.unsoldList.filter(p => p.id !== player.id);
    game.unsoldRoundPool = game.unsoldRoundPool.filter(p => p.id !== player.id);
    game.unsoldIndex -= 1;
    advanceUnsoldRound();
  }

  return game;
}

function markUnsold() {
  if (!game.currentPlayer) throw new Error("No player currently up for auction.");
  const player = { ...game.currentPlayer, unsold: true };

  if (game.phase === "main") {
    game.pool[game.poolIndex] = player;
    if (!game.unsoldList.some(p => p.id === player.id)) game.unsoldList.push(player);
    advanceMainAuction();
  } else if (game.phase === "unsold-round") {
    // Keep eligible unsold players for a later round; the round snapshot prevents repeats within this round.
    const listIndex = game.unsoldList.findIndex(p => p.id === player.id);
    if (listIndex >= 0) game.unsoldList[listIndex] = player;
    game.unsoldRoundPool[game.unsoldIndex] = player;
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
  const selectedLineup = lineup.length ? lineup : team.squad.slice(0, game.settings.xiSize || 11);
  if (selectedLineup.length > Math.min(11, game.settings.squadSize)) throw new Error(`Playing XI can contain at most ${Math.min(11, game.settings.squadSize)} players.`);
  const overseasInXI = selectedLineup.filter(p => p.nationality === "OV").length;
  if (overseasInXI > 4) throw new Error(`Playing XI can contain at most 4 overseas players (you selected ${overseasInXI}).`);
  team.lineup = selectedLineup;
  return team;
}

function avg(list, key) {
  if (!list.length) return 0;
  return list.reduce((s, p) => s + (p.attrs[key] || 0), 0) / list.length;
}

function computeRating(team) {
  const xi = team.lineup && team.lineup.length ? team.lineup : team.squad.slice(0, 11);
  const squad = team.squad || [];
  const avgAttr = (list, key, fallback = 0) => list.length ? avg(list, key) : fallback;
  const batters = xi.filter(p => p.attrs.bat >= 6);
  const bowlers = xi.filter(p => p.attrs.bowl >= 6);
  const finishers = xi.filter(p => p.attrs.fin >= 7 || p.role === "Finisher");
  const allrounders = xi.filter(p => p.role === "All-rounder");
  const keepers = xi.filter(p => p.attrs.keep >= 6 || p.role === "Wicketkeeper");
  const batting = avgAttr(xi, "bat");
  const bowling = avgAttr(xi, "bowl");
  const power = avgAttr(xi, "pow");
  const finishing = avgAttr(finishers, "fin", avgAttr(xi, "fin"));
  const allround = allrounders.length ? (avg(allrounders, "bat") + avg(allrounders, "bowl")) / 2 : 2;
  const keeping = avgAttr(keepers, "keep", 1);
  const pace = avgAttr(xi.filter(p => p.attrs.pace >= 5), "pace", 1);
  const spin = avgAttr(xi.filter(p => p.attrs.spin >= 5), "spin", 1);
  const scale10 = v => Math.max(0, Math.min(10, Math.round(v * 10) / 10));
  const depth = scale10(Math.min(10, batters.length / 5 * 10));
  const bowlingDepth = scale10(Math.min(10, bowlers.length / 5 * 10));
  const roleCoverage = scale10(Math.min(10, new Set(xi.map(p => p.role)).size / 6 * 10));
  const balance = (batting + bowling) / 2;
  const scores = {
    Batting: scale10(batting),
    Bowling: scale10(bowling),
    "Power Hitting": scale10(power),
    "Power Hitting & Finishing": scale10(power * 0.55 + finishing * 0.45),
    "All-round Ability": scale10(allround),
    "Squad Depth": scale10((depth + bowlingDepth) / 2),
    "Role Balance": scale10(roleCoverage),
    Wicketkeeping: scale10(keeping),
    "Pace Attack": scale10(pace),
    "Spin Attack": scale10(spin),
    "T20 Balance": scale10(balance),
  };
  // Weighted, role-aware estimate; incomplete squads receive a visible penalty.
  const weighted = batting * 0.25 + bowling * 0.25 + (power * 0.55 + finishing * 0.45) * 0.15 + allround * 0.10 + ((depth + bowlingDepth) / 2) * 0.10 + roleCoverage * 0.10 + keeping * 0.05;
  const completeness = Math.min(1, squad.length / Math.max(1, game?.settings?.squadSize || 11));
  const overall = Math.round(Math.max(0, Math.min(10, weighted * (0.75 + 0.25 * completeness))) * 10) / 10;
  const strengths = Object.entries(scores).sort((a,b)=>b[1]-a[1]).slice(0,2).map(x=>x[0]);
  const weaknesses = Object.entries(scores).sort((a,b)=>a[1]-b[1]).slice(0,2).map(x=>x[0]);
  const recommendations = [];
  if (!keepers.length) recommendations.push("Add a wicketkeeper");
  if (bowlers.length < 4) recommendations.push("Add more bowling options");
  if (finishers.length < 2) recommendations.push("Look for finishers");
  if (allrounders.length < 1) recommendations.push("Consider an all-rounder");
  if (squad.length < (game?.settings?.squadSize || 11)) recommendations.push(`Squad incomplete (${squad.length}/${game.settings.squadSize})`);
  return { team: team.name, scores, overall, complete: squad.length >= (game?.settings?.squadSize || 11), strengths, weaknesses, recommendations };
}

function aiDecision() {
  if (!game || !game.currentPlayer) throw new Error("No player currently up for auction.");
  if (!game.settings.humanVsComputer) return { bought: false, message: "Computer mode is disabled." };
  const p = game.currentPlayer;
  const difficulty = game.settings.aiDifficulty || "professional";
  const candidates = game.teams.filter(t => t.id !== Number(game.settings.humanTeamId || 0) && canTeamBuyPlayer(t, p));
  const scoreNeed = (team) => {
    const squad = team.squad;
    const roleCounts = role => squad.filter(x => x.role === role).length;
    let need = 1;
    if ((p.role === "Wicketkeeper" && !squad.some(x => x.role === "Wicketkeeper" || x.attrs.keep >= 7))) need += 2.8;
    if (["Fast Bowler", "Spinner"].includes(p.role) && squad.filter(x => x.attrs.bowl >= 6).length < 4) need += 1.8;
    if (["Opener", "Middle Order", "Finisher", "Power Hitter"].includes(p.role) && squad.filter(x => x.attrs.bat >= 6).length < 5) need += 1.4;
    if (p.role === "All-rounder" && !squad.some(x => x.role === "All-rounder")) need += 1.5;
    need += Math.max(0, 6 - roleCounts(p.role)) * 0.12;
    return need;
  };
  const rated = candidates.map(team => {
    const slots = game.settings.squadSize - team.squad.length;
    const reserve = Math.max(0, slots - 1) * game.settings.basePrice;
    const maxBid = Math.max(0, team.remaining - reserve);
    const playerQuality = (p.attrs.bat + p.attrs.pow + p.attrs.fin + p.attrs.bowl + p.attrs.keep) / 5;
    const need = scoreNeed(team);
    const value = p.basePrice * (1 + Math.max(0, playerQuality - 4) * 0.22) * Math.min(1.8, need / 2.2);
    const willingness = difficulty === "expert" ? 1.45 : difficulty === "beginner" ? 0.9 : 1.2;
    const bid = Math.min(maxBid, Math.max(p.basePrice, Math.floor(value * willingness)));
    return { team, maxBid, need, value, bid, priority: need * playerQuality + Math.random() * (difficulty === "beginner" ? 2.5 : 0.8) };
  }).sort((a,b)=>b.priority-a.priority);
  const choice = rated[0];
  if (!choice || choice.maxBid < p.basePrice || choice.value < p.basePrice * (difficulty === "expert" ? 0.65 : 0.9)) {
    game.log.push(`Computer passed on ${p.name}`);
    return { bought: false, message: `Computer passed on ${p.name}. You can bid or mark unsold.` };
  }
  placeBid(choice.team.id, Math.min(choice.bid, choice.maxBid));
  return { bought: true, message: `Computer bought ${p.name} for $${Math.min(choice.bid, choice.maxBid)} (${choice.team.name}).` };
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
  maxAffordableBid,
  minimumReserveForTeam,
  aiDecision,
};
