const $ = (sel) => document.querySelector(sel);
const $all = (sel) => document.querySelectorAll(sel);

let state = null; // last known game state from the server
let lineupDraft = {}; // teamId -> array of player objects (working copy)

// ---------- Tabs ----------
function showView(name) {
  $all(".view").forEach((v) => v.classList.remove("active"));
  $all("nav.tabs button").forEach((b) => b.classList.remove("active"));
  const view = document.getElementById(`view-${name}`);
  if (view) view.classList.add("active");
  const btn = document.querySelector(`nav.tabs button[data-view="${name}"]`);
  if (btn) btn.classList.add("active");
}
function enableTab(name) {
  const btn = document.querySelector(`nav.tabs button[data-view="${name}"]`);
  if (btn) btn.disabled = false;
}
$all("nav.tabs button").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;
    showView(btn.dataset.view);
    if (btn.dataset.view === "teams") renderSquads();
    if (btn.dataset.view === "lineup") renderLineupBuilder();
    if (btn.dataset.view === "ratings") loadRatings();
  });
});

function showError(msg) {
  const box = $("#errorBox");
  box.textContent = msg;
  box.classList.add("show");
  setTimeout(() => box.classList.remove("show"), 5000);
}

async function api(path, method = "GET", body) {
  const res = await fetch(path, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

// ---------- Setup ----------
function renderTeamNameInputs() {
  const n = Math.max(2, Math.min(12, Number($("#numTeams").value) || 2));
  const humanSelect = $("#humanTeamId");
  if (humanSelect) {
    const old = humanSelect.value;
    humanSelect.innerHTML = Array.from({length:n}, (_, i) => `<option value="${i}">Team ${i + 1}</option>`).join("");
    humanSelect.value = Number(old) < n ? old : "0";
  }
  const box = $("#teamNamesList");
  const existing = Array.from(box.querySelectorAll("input")).map((i) => i.value);
  box.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Team ${i + 1}`;
    input.value = existing[i] || "";
    box.appendChild(input);
  }
}
$("#numTeams").addEventListener("input", renderTeamNameInputs);
renderTeamNameInputs();

$("#startBtn").addEventListener("click", async () => {
  try {
    const teamNames = Array.from($("#teamNamesList").querySelectorAll("input")).map(
      (i, idx) => i.value.trim() || `Team ${idx + 1}`
    );
    const payload = {
      teamNames,
      budget: Number($("#budget").value),
      squadSize: Number($("#squadSize").value),
      numPlayers: Number($("#numPlayers").value),
      basePrice: Number($("#basePrice").value),
      nationalityRule: $("#nationalityRule").value,
      overseasCap: $("#overseasCap").value === "" ? 8 : Number($("#overseasCap").value),
      humanVsComputer: $("#gameMode").value === "computer",
      humanTeamId: Number($("#humanTeamId").value || 0),
      aiDifficulty: $("#aiDifficulty").value,
    };
    state = await api("/api/start", "POST", payload);
    enableTab("auction");
    showView("auction");
    renderAuction();
  } catch (e) {
    showError(e.message);
  }
});

// ---------- Auction ----------
function flagFor(nat) {
  return nat === "IN" ? "🇮🇳" : "🌍";
}

function attrRowHTML(attrs) {
  const labels = { bat: "Batting", pow: "Power", fin: "Finishing", bowl: "Bowling", pace: "Pace", spin: "Spin", keep: "Keeping" };
  return `<div class="attr-row">${Object.entries(attrs)
    .filter(([k, v]) => v > 2)
    .map(
      ([k, v]) => `
      <div class="attr">
        <div class="lbl"><span>${labels[k]}</span><span>${v}</span></div>
        <div class="bar"><span style="width:${v * 10}%"></span></div>
      </div>`
    )
    .join("")}</div>`;
}

function renderLot() {
  const box = $("#lotBlock");
  const p = state.currentPlayer;
  if (!p) {
    box.innerHTML = `<div class="done-banner">🏁 All lots for this round have gone under the hammer.</div>`;
    return;
  }
  const total = state.phase === "unsold-round" ? state.progress.unsoldTotal : state.progress.mainTotal;
  const idx = state.phase === "unsold-round" ? state.progress.unsoldIndex : state.progress.mainIndex;
  box.innerHTML = `
    <div class="block">
      <div class="lot">🔨 LOT ${idx + 1} / ${total}${state.phase === "unsold-round" ? " · UNSOLD ROUND" : ""}</div>
      <div class="player-portrait">
       <img
          src="${p.imageUrl || p.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=5B1726&color=FFF8E7&size=256&bold=true`}"
          alt="${p.name}"
          loading="eager"
          onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=5B1726&color=FFF8E7&size=256';"
        />
      </div>
      <span class="role-icon">${p.icon}</span>
      <h3>${p.name}</h3>
      <div class="role-line"><span class="flag">${flagFor(p.nationality)}</span>${p.role}</div>
      <div class="base-price">Base price $${p.basePrice}</div>
      ${attrRowHTML(p.attrs)}
    </div>
  `;
}

function renderTeamBidGrid() {
  const grid = $("#teamBidGrid");
  const p = state.currentPlayer;
  grid.innerHTML = state.teams
    .map((t) => {
      const full = t.squad.length >= state.settings.squadSize;
      const slotsLeft = state.settings.squadSize - t.squad.length;
      const reserveAfterBuy = Math.max(0, slotsLeft - 1) * state.settings.basePrice;
      const maxBid = full ? 0 : Math.max(0, t.remaining - reserveAfterBuy);
      const canAffordCurrent = !!p && !full && maxBid >= p.basePrice;
      const isComputerTeam = state.settings.humanVsComputer && t.id !== Number(state.settings.humanTeamId || 0);
      const disabled = !canAffordCurrent || isComputerTeam;
      const defaultBid = p && canAffordCurrent ? p.basePrice : "";
      return `
      <div class="team-paddle ${full ? "full" : ""}">
        <div class="tp-name">${t.name} ${state.settings.humanVsComputer && t.id !== Number(state.settings.humanTeamId || 0) ? '<span class="tp-full-tag">COMPUTER</span>' : ""} ${full ? '<span class="tp-full-tag">FULL</span>' : ""}</div>
        <div class="tp-meta">${t.squad.length}/${state.settings.squadSize} players · $${t.remaining} left</div>
        ${!full ? `<div class="tp-meta">Max safe bid: $${maxBid} · Reserve after purchase: $${reserveAfterBuy}</div>` : ""}
        <div class="tp-bid-row">
          <input type="number" class="bid-amount" data-team="${t.id}" min="${p ? p.basePrice : 0}" max="${maxBid}" step="1" value="${defaultBid}" ${disabled ? "disabled" : ""} />
          <button class="btn small bid-btn" data-team="${t.id}" ${disabled ? "disabled" : ""}>Bid</button>
        </div>
      </div>`;
    })
    .join("");

  grid.querySelectorAll(".bid-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const teamId = btn.dataset.team;
      const amountInput = grid.querySelector(`.bid-amount[data-team="${teamId}"]`);
      try {
        state = await api("/api/bid", "POST", { teamId, amount: Number(amountInput.value) });
        onStateAdvance();
      } catch (e) {
        showError(e.message);
      }
    });
  });
}

function renderLiveTable() {
  const t = $("#liveTable");
  t.innerHTML = `
    <thead><tr><th>Team</th><th>Players</th><th>Spent</th><th>Budget left</th><th>Spots left</th></tr></thead>
    <tbody>
      ${state.teams
        .map(
          (team) => `<tr>
            <td>${team.name}</td>
            <td>${team.squad.length}/${state.settings.squadSize}</td>
            <td>$${team.spent}</td>
            <td>$${team.remaining}</td>
            <td>${state.settings.squadSize - team.squad.length}</td>
          </tr>`
        )
        .join("")}
    </tbody>
  `;
}

function renderAuction() {
  renderLot();
  renderTeamBidGrid();
  renderLiveTable();
  renderSquads();
  const aiBtn = $("#aiDecisionBtn");
  if (aiBtn) aiBtn.style.display = state.settings.humanVsComputer && state.currentPlayer ? "inline-block" : "none";
  const decisionPanel = $("#computerDecisionPanel");
  if (decisionPanel) decisionPanel.hidden = !state.settings.humanVsComputer;
}

$("#aiDecisionBtn").addEventListener("click", async () => {
  try {
    const result = await api("/api/ai-decision", "POST", {});
    state = result;
    $("#aiMessage").textContent = result.aiResult?.message || "Computer made its decision.";
    renderAuction();
    if (state.phase === "summary" || state.phase === "lineup") onStateAdvance();
  } catch (e) { showError(e.message); }
});

$("#unsoldBtn").addEventListener("click", async () => {
  try {
    state = await api("/api/unsold", "POST");
    onStateAdvance();
  } catch (e) {
    showError(e.message);
  }
});

function onStateAdvance() {
  renderAuction();
  enableTab("teams");
  if (state.phase === "summary" || state.phase === "lineup") {
    enableTab("teams");
    enableTab("summary");
    enableTab("lineup");
    enableTab("ratings");
    renderSummary();
    if (state.phase === "summary") showView("summary");
  }
}

// ---------- Squads ----------
function renderSquads() {
  const grid = $("#squadGrid");
  const cards = state.teams.map(t => {
    const overseas = t.squad.filter(p => p.nationality === "OV").length;
    const slots = state.settings.squadSize - t.squad.length;
    return `<div class="squad-card">
      <h4>${t.name} ${t.id === Number(state.settings.humanTeamId || 0) && state.settings.humanVsComputer ? "(You)" : (state.settings.humanVsComputer ? "(Computer)" : "")}</h4>
      <div class="stat-line">${t.squad.length}/${state.settings.squadSize} players · ${overseas}/${state.settings.overseasCap == null ? 8 : state.settings.overseasCap} overseas</div>
      <ol>${t.squad.map(p => `<li>${p.icon} ${p.name} <small>(${p.role}${p.nationality === "OV" ? " · Overseas" : " · Indian"})</small> — $${p.soldFor}</li>`).join("") || "<li>No players yet</li>"}</ol>
      <div class="stat-line">Spent $${t.spent} · Remaining $${t.remaining} · ${slots} slots left</div>
    </div>`;
  }).join("");
  grid.innerHTML = cards;
  const live = $("#liveSquadGrid");
  if (live) live.innerHTML = cards;
}

// ---------- Summary ----------
function renderSummary() {
  const t = $("#summaryTable");
  t.innerHTML = `
    <thead><tr><th>Team</th><th>Squad</th><th>Spent</th><th>Remaining</th></tr></thead>
    <tbody>
      ${state.teams
        .map(
          (team) => `<tr>
            <td>${team.name}</td>
            <td>${team.squad.length}/${state.settings.squadSize}</td>
            <td>$${team.spent}</td>
            <td>$${team.remaining}</td>
          </tr>`
        )
        .join("")}
    </tbody>
  `;
  const unsoldBox = $("#unsoldListBox");
  unsoldBox.innerHTML = state.unsoldList.length
    ? `<ol>${state.unsoldList.map((p) => `<li>${p.icon} ${p.name} (${p.role})</li>`).join("")}</ol>`
    : `<p style="color:var(--cream-dim);">No unsold players.</p>`;

  const needMore = state.teams.some((t) => t.squad.length < state.settings.squadSize);
  $("#startUnsoldRoundBtn").disabled = !(needMore && state.unsoldList.length > 0);
  $("#startUnsoldRoundBtn").textContent = state.progress && state.progress.unsoldRounds ? `Run unsold round ${state.progress.unsoldRounds + 1}` : "Run unsold player round";
}

$("#startUnsoldRoundBtn").addEventListener("click", async () => {
  try {
    state = await api("/api/start-unsold-round", "POST");
    if (state.phase === "unsold-round") {
      showView("auction");
      renderAuction();
    } else {
      showView("lineup");
    }
  } catch (e) {
    showError(e.message);
  }
});
$("#skipToLineupBtn").addEventListener("click", () => showView("lineup"));

// ---------- Lineup builder ----------
const roleTag = (role) => {
  const map = {
    Opener: "🏏 Opener",
    "Middle Order": "🏏 Middle",
    "Power Hitter": "💥 Hitter",
    Finisher: "🧨 Finisher",
    Wicketkeeper: "🧤 Keeper",
    "All-rounder": "🔄 All-round",
    "Fast Bowler": "⚡ Pace",
    Spinner: "🌀 Spin",
  };
  return map[role] || role;
};

function renderLineupBuilder() {
  const xiSize = Math.min(11, state.settings.squadSize);
  const box = $("#lineupBuilder");
  box.innerHTML = state.teams
    .map((t) => {
      if (!lineupDraft[t.id]) {
        const domestic = t.squad.filter(p => p.nationality !== "OV");
        const overseas = t.squad.filter(p => p.nationality === "OV").slice(0, 4);
        lineupDraft[t.id] = [...domestic, ...overseas].slice(0, xiSize);
      }
      return `
      <div class="squad-card" style="margin-bottom:1.2rem;">
        <h4>${t.name} — Choose up to ${xiSize} players for Playing XI</h4>
        <div class="xi-select">${t.squad.map(p => `<label class="xi-option"><input type="checkbox" class="xi-check" data-team="${t.id}" data-player="${p.id}" ${lineupDraft[t.id].some(x => x.id === p.id) ? "checked" : ""} /> ${p.icon} ${p.name} <small>${p.role}${p.nationality === "OV" ? " · Overseas" : " · Indian"}</small></label>`).join("")}</div>
        <p class="hint">Selected: ${lineupDraft[t.id].length}/${xiSize} · Overseas: ${lineupDraft[t.id].filter(p=>p.nationality === "OV").length}/4</p>
        <ol class="lineup-list" data-team="${t.id}">
          ${lineupDraft[t.id]
            .map(
              (p, i) => `
            <li data-idx="${i}">
              <span>${p.icon} ${p.name}<span class="role-tag">${roleTag(p.role)}</span></span>
              <span class="moves">
                <button class="btn small mv-up" data-team="${t.id}" data-idx="${i}">↑</button>
                <button class="btn small mv-down" data-team="${t.id}" data-idx="${i}">↓</button>
              </span>
            </li>`
            )
            .join("")}
        </ol>
        <button class="btn small save-lineup" data-team="${t.id}">Save this XI</button>
      </div>`;
    })
    .join("");

  box.querySelectorAll(".xi-check").forEach((check) => check.addEventListener("change", () => {
    const teamId = check.dataset.team;
    const team = state.teams.find(t => t.id === Number(teamId));
    const player = team?.squad.find(p => p.id === check.dataset.player);
    if (!player) return;
    const list = lineupDraft[teamId] || [];
    if (check.checked) {
      if (list.length >= Math.min(11, state.settings.squadSize)) { showError(`Select at most ${Math.min(11, state.settings.squadSize)} players.`); check.checked = false; return; }
      if (player.nationality === "OV" && list.filter(p => p.nationality === "OV").length >= 4) { showError("Playing XI can contain at most 4 overseas players."); check.checked = false; return; }
      if (!list.some(p => p.id === player.id)) list.push(player);
    } else {
      lineupDraft[teamId] = list.filter(p => p.id !== player.id);
    }
    renderLineupBuilder();
  }));
  box.querySelectorAll(".mv-up").forEach((b) =>
    b.addEventListener("click", () => moveLineup(b.dataset.team, Number(b.dataset.idx), -1))
  );
  box.querySelectorAll(".mv-down").forEach((b) =>
    b.addEventListener("click", () => moveLineup(b.dataset.team, Number(b.dataset.idx), 1))
  );
  box.querySelectorAll(".save-lineup").forEach((b) =>
    b.addEventListener("click", () => saveLineup(b.dataset.team))
  );
}

function moveLineup(teamId, idx, dir) {
  const list = lineupDraft[teamId];
  const j = idx + dir;
  if (j < 0 || j >= list.length) return;
  [list[idx], list[j]] = [list[j], list[idx]];
  renderLineupBuilder();
}

async function saveLineup(teamId) {
  try {
    const order = lineupDraft[teamId].map((p) => p.id);
    await api("/api/lineup", "POST", { teamId, order });
    showError("");
    const banner = document.createElement("div");
    banner.textContent = "✅ Lineup saved";
    banner.style.color = "var(--sold)";
    banner.style.fontSize = ".8rem";
    banner.style.marginTop = ".4rem";
    event.target.closest(".squad-card").appendChild(banner);
    setTimeout(() => banner.remove(), 2000);
  } catch (e) {
    showError(e.message);
  }
}

// ---------- Ratings ----------
async function loadRatings() {
  try {
    const { ratings } = await api("/api/ratings");
    renderRatings(ratings);
    renderCompare(ratings);
  } catch (e) {
    showError(e.message);
  }
}

function renderRatings(ratings) {
  const box = $("#ratingsBox");
  box.innerHTML = ratings
    .map(
      (r) => `
    <div class="panel rating-card">
      <span class="overall">${r.overall}/10</span>
      <span class="tp-full-tag">${r.complete ? "SQUAD COMPLETE" : "INCOMPLETE SQUAD"}</span>
      <h2 style="margin-bottom:0;">${r.team}</h2>
      <div class="rating-grid">
        ${Object.entries(r.scores)
          .map(
            ([label, val]) => `
          <div class="rating-item">
            <div class="lbl" style="display:flex;justify-content:space-between;">
              <span>${label}</span><span class="val">${val}</span>
            </div>
            <div class="bar"><span style="width:${Math.min(100, val * 10)}%"></span></div>
          </div>`
          )
          .join("")}
      </div>
      <p class="hint"><strong>Strengths:</strong> ${(r.strengths || []).join(", ") || "Building squad"}. <strong>Weaknesses:</strong> ${(r.weaknesses || []).join(", ") || "Not enough data"}.</p>
      ${(r.recommendations || []).length ? `<p class="hint"><strong>Recommendations:</strong> ${r.recommendations.join(" · ")}</p>` : ""}
    </div>`
    )
    .join("");
}

function strengthsFor(r) {
  const entries = Object.entries(r.scores).sort((a, b) => b[1] - a[1]);
  const best = entries.slice(0, 2).map((e) => e[0]);
  const worst = entries.slice(-2).map((e) => e[0]);
  return `Strengths: ${best.join(", ")}. Needs work: ${worst.join(", ")}.`;
}

function renderCompare(ratings) {
  const t = $("#compareTable");
  t.innerHTML = `
    <thead><tr><th>Team</th><th>Batting</th><th>Power</th><th>Bowling</th><th>All-round</th><th>Balance</th><th>Overall</th></tr></thead>
    <tbody>
      ${ratings
        .map(
          (r) => `<tr>
        <td>${r.team}</td>
        <td>${r.scores["Batting"]}</td>
        <td>${r.scores["Power Hitting"]}</td>
        <td>${r.scores["Bowling"]}</td>
        <td>${r.scores["All-round Ability"]}</td>
        <td>${r.scores["T20 Balance"]}</td>
        <td><strong>${r.overall}</strong></td>
      </tr>`
        )
        .join("")}
    </tbody>
  `;
  const notes = document.createElement("div");
  notes.className = "strengths";
  notes.innerHTML = ratings.map((r) => `<div><strong>${r.team}:</strong> ${strengthsFor(r)}</div>`).join("");
  const existingNotes = t.parentElement.parentElement.querySelector(".strengths");
  if (existingNotes) existingNotes.remove();
  t.parentElement.parentElement.appendChild(notes);
}
