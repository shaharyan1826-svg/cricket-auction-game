function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function playerSkill(player, key, fallback = 1) {
  return clamp(Number(player?.attrs?.[key] ?? fallback), 1, 10);
}

function weightedChoice(items, weightFn) {
  const weights = items.map(item => Math.max(0.01, weightFn(item)));
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < items.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return items[i];
  }
  return items[items.length - 1];
}

function makeBatterLine(player) {
  return { id: player.id, name: player.name, runs: 0, balls: 0, fours: 0, sixes: 0, out: false, dismissal: "not out" };
}

function makeBowlerLine(player) {
  return { id: player.id, name: player.name, balls: 0, runs: 0, wickets: 0, wides: 0, noBalls: 0 };
}

function oversText(balls) {
  return `${Math.floor(balls / 6)}.${balls % 6}`;
}

function simulateInnings(battingTeam, bowlingTeam, inningsNumber, target = null) {
  const batXI = battingTeam.lineup;
  const bowlXI = bowlingTeam.lineup;
  const batters = batXI.map(makeBatterLine);
  const bowlerLines = new Map(bowlXI.map(p => [p.id, makeBowlerLine(p)]));
  const fallOfWickets = [];
  const extras = { wides: 0, noBalls: 0, byes: 0, legByes: 0 };
  let total = 0, wickets = 0, legalBalls = 0, striker = 0, nonStriker = 1, nextBatter = 2;
  let lastBowlerId = null;
  const maxBalls = 120;

  function chooseBowler() {
    const available = bowlXI.filter(p => {
      const line = bowlerLines.get(p.id);
      return Math.floor(line.balls / 6) < 4 && p.id !== lastBowlerId;
    });
    const pool = available.length ? available : bowlXI.filter(p => Math.floor(bowlerLines.get(p.id).balls / 6) < 4);
    if (!pool.length) return null;
    return weightedChoice(pool, p => 1 + playerSkill(p, "bowl") * 0.45 + (p.role === "Fast Bowler" || p.role === "Spinner" ? 1 : 0));
  }

  while (legalBalls < maxBalls && wickets < 10 && (target == null || total < target)) {
    const overNumber = Math.floor(legalBalls / 6);
    const ballInOver = legalBalls % 6;
    if (!currentBowler) {
      var currentBowler = chooseBowler();
      if (!currentBowler) break;
      lastBowlerId = currentBowler.id;
    }
    const bowler = bowlerLines.get(currentBowler.id);
    const batter = batters[striker];
    const batSkill = playerSkill(batXI[striker], "bat");
    const power = playerSkill(batXI[striker], "pow");
    const finishing = playerSkill(batXI[striker], "fin");
    const bowlSkill = playerSkill(currentBowler, "bowl");
    const isDeath = overNumber >= 16;
    const pressure = target == null ? 0 : clamp((target - total) / Math.max(1, (maxBalls - legalBalls)) - 1, -0.5, 1.5);
    const wicketChance = clamp(0.055 + (bowlSkill - batSkill) * 0.008 + pressure * 0.012 + (isDeath ? 0.008 : 0), 0.025, 0.14);
    const wideChance = 0.025;
    const noBallChance = 0.012;

    if (Math.random() < wideChance) {
      total += 1; extras.wides += 1; bowler.runs += 1; bowler.wides += 1;
      continue;
    }
    if (Math.random() < noBallChance) {
      total += 1; extras.noBalls += 1; bowler.runs += 1; bowler.noBalls += 1;
      const freeHit = true;
      const batRuns = weightedChoice([0,1,2,3,4,6], r => r === 0 ? 4 : r === 1 ? 2 : r === 2 ? 1.2 : r === 3 ? 0.25 : r === 4 ? (batSkill + power) / 5 : (power + (isDeath ? finishing : batSkill)) / 5);
      total += batRuns; bowler.runs += batRuns; batter.runs += batRuns; batter.balls += 1;
      if (batRuns === 4) batter.fours++; if (batRuns === 6) batter.sixes++;
      if ([1,3].includes(batRuns)) [striker, nonStriker] = [nonStriker, striker];
      continue;
    }

    legalBalls++; bowler.balls++; batter.balls++;
    const outcome = Math.random();
    if (outcome < wicketChance) {
      wickets++; batter.out = true;
      const dismissal = Math.random() < 0.72 ? "c" : "b";
      batter.dismissal = dismissal === "c" ? `c ${weightedChoice(bowlXI, p => p.id === currentBowler.id ? 0.3 : 1).name} b ${currentBowler.name}` : `b ${currentBowler.name}`;
      bowler.wickets++;
      fallOfWickets.push({ wicket: wickets, score: total, over: oversText(legalBalls), batter: batter.name });
      if (nextBatter < batters.length) striker = nextBatter++;
      else break;
    } else {
      const run = weightedChoice([0,1,2,3,4,6], r => {
        if (r === 0) return 3.2 + bowlSkill * 0.12 - batSkill * 0.12;
        if (r === 1) return 3.1;
        if (r === 2) return 1.25 + batSkill * 0.04;
        if (r === 3) return 0.18;
        if (r === 4) return 0.75 + batSkill * 0.08;
        return 0.25 + power * 0.075 + (isDeath ? finishing * 0.025 : 0);
      });
      total += run; bowler.runs += run; batter.runs += run;
      if (run === 4) batter.fours++;
      if (run === 6) batter.sixes++;
      if (run % 2 === 1) [striker, nonStriker] = [nonStriker, striker];
    }
    if (legalBalls % 6 === 0) { [striker, nonStriker] = [nonStriker, striker]; currentBowler = null; }
  }

  const bowling = [...bowlerLines.values()].map(line => ({
    ...line, overs: oversText(line.balls), economy: line.balls ? Number((line.runs / (line.balls / 6)).toFixed(2)) : 0
  }));
  return {
    team: battingTeam.name, teamId: battingTeam.id, runs: total, wickets,
    balls: legalBalls, overs: oversText(legalBalls), extras,
    batting: batters.filter((b, i) => b.balls > 0 || b.out || i < Math.min(nextBatter, 2)),
    bowling, fallOfWickets, allOut: wickets === 10,
    completed: legalBalls >= maxBalls || wickets >= 10 || (target != null && total >= target)
  };
}

function simulateMatch(game, teamAId, teamBId) {
  if (!game) throw new Error("Start an auction first.");
  if (teamAId === teamBId) throw new Error("Choose two different teams.");
  const teamA = game.teams.find(t => t.id === teamAId);
  const teamB = game.teams.find(t => t.id === teamBId);
  if (!teamA || !teamB) throw new Error("Selected team was not found.");
  for (const team of [teamA, teamB]) {
    if (!Array.isArray(team.lineup) || team.lineup.length !== 11) {
      throw new Error(`${team.name} must have a saved Playing XI of exactly 11 players before the match.`);
    }
    if (team.lineup.filter(p => p.nationality === "OV").length > 4) {
      throw new Error(`${team.name} has more than 4 overseas players in its Playing XI.`);
    }
  }

  const tossWinner = Math.random() < 0.5 ? teamA : teamB;
  const decision = Math.random() < 0.5 ? "bat" : "bowl";
  const firstBatting = decision === "bat" ? tossWinner : (tossWinner.id === teamA.id ? teamB : teamA);
  const secondBatting = firstBatting.id === teamA.id ? teamB : teamA;
  const first = simulateInnings(firstBatting, secondBatting, 1);
  const second = simulateInnings(secondBatting, firstBatting, 2, first.runs + 1);
  let winner = null, result = "";
  if (second.runs > first.runs) {
    winner = secondBatting;
    result = `${winner.name} won by ${10 - second.wickets} wicket${10 - second.wickets === 1 ? "" : "s"}.`;
  } else if (second.runs < first.runs) {
    winner = firstBatting;
    result = `${winner.name} won by ${first.runs - second.runs} run${first.runs - second.runs === 1 ? "" : "s"}.`;
  } else {
    result = "Match tied.";
  }
  const allBatting = [...first.batting, ...second.batting];
  const allBowling = [...first.bowling, ...second.bowling];
  const playerOfMatch = allBatting
    .map(b => {
      const bowl = allBowling.find(x => x.id === b.id);
      return { name: b.name, team: first.batting.some(x => x.id === b.id) ? first.team : second.team,
        score: b.runs + (b.fours * 0.5) + (b.sixes * 1.2) + (bowl ? bowl.wickets * 18 - bowl.runs * 0.15 : 0) };
    })
    .sort((a,b) => b.score - a.score)[0] || null;
  return {
    format: "T20", oversPerInnings: 20,
    toss: { winner: tossWinner.name, decision },
    result, winner: winner ? winner.name : null,
    playerOfMatch: playerOfMatch ? playerOfMatch.name : null,
    innings: [first, second],
    teams: [{ id: teamA.id, name: teamA.name }, { id: teamB.id, name: teamB.name }],
    generatedAt: new Date().toISOString()
  };
}

module.exports = { simulateMatch };
