# 🏏 Cricket Auction Game

A web-based cricket auction game where users can create teams, manage budgets, bid on cricket players, and build their squads.

## 🎮 Play the Game

👉 [Play Cricket Auction Game](https://cricket-auction-game-eios.onrender.com/)

## ✨ Features

- 🏏 Cricket player auction
- 💰 Team budget management
- 🔨 Bidding system
- 👥 Squad management
- 📊 Auction summary
- ⭐ Player ratings
- ⚙️ Custom auction settings

## 🛠️ Technologies

- HTML
- CSS
- JavaScript
- Node.js
- Express.js

## 🚀 Deployment

Hosted on Render.
# Auction Night — Custom T20 Cricket Auction Game

A full, self-hosted implementation of your custom T20 auction: a Node/Express
backend that runs the auction rules (random player pool, bidding, budgets,
squad limits, unsold round, playing-XI builder, and team ratings) and a
themed HTML/CSS/JS frontend — no external services or accounts required.

## What's inside

```
cricket-auction/
├── backend/
│   ├── server.js       Express server + REST API, also serves the frontend
│   ├── gameLogic.js     Auction rules & state machine
│   ├── players.js       Random player pool generator (roles, attributes)
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── style.css        Stadium/auction-house visual theme
│   └── app.js           All client-side interaction logic
└── README.md
```

## Run it locally

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
cd cricket-auction/backend
npm install
npm start
```

Then open **http://localhost:3000** in your browser. That's it — the
Express server serves both the API and the static frontend from the same
port.

## Hosting it for others to use

Any Node-friendly host works, since this is a plain Express app with no
database (game state lives in memory while the server runs):

- **Render / Railway / Fly.io** — point them at the `backend/` folder,
  build command `npm install`, start command `npm start`.
- **A VPS** — copy the folder up, `npm install`, then run with `pm2` or a
  `systemd` service so it survives reboots.
- **Replit / Glitch** — import the folder, it will detect `package.json`
  automatically.

The server reads the port from `process.env.PORT`, falling back to `3000`,
so it will work out of the box on hosts that inject their own port.

> Note: this build keeps one auction "in progress" at a time in server
> memory (simplest possible setup for one host running one live auction).
> If you want multiple simultaneous auctions or persistence across
> restarts, the natural next step is adding a `gameId` per session and a
> small database — ask and it can be extended.

## How to play

1. **Setup tab** — enter number of teams, team names, budget, squad size,
   number of players in the auction, configured base price, and any nationality rules.
2. **Auction tab** — one player appears at a time with role, nationality,
   configured base price and skill bars. Type a bid amount next to a team and click
   **Bid**, or click **Mark unsold**. The live table updates after every
   sale.
3. **Squads tab** — see every team's full roster and spend at any time.
4. **Summary tab** — once all lots are done, see final squads and the
   unsold list, then optionally run an **unsold player round** for teams
   still short of players.
5. **Playing XI tab** — reorder each squad into a batting order; roles
   (opener, finisher, keeper, etc.) are tagged automatically.
6. **Ratings tab** — batting/bowling/power/finishing/balance scores per
   team, an overall T20 rating, and a side-by-side comparison table.\n\n
## Budget safety rule

The auction now reserves enough money for a team's remaining squad slots at the configured minimum configured base price. For example, with a budget of $8, a squad size of 2, and a minimum configured base price of $2, a team's first winning bid cannot exceed $6. The interface displays the maximum safe bid and the amount reserved for the remaining slot. The server validates this rule too, so it cannot be bypassed by editing the bid field.



## Included in this build

- Responsive dark-green and gold auction interface.
- Live squad cards available during the auction, including budgets, squad slots, roles, and overseas counts.
- Human-vs-computer mode with beginner, professional, and expert computer decision settings.
- Computer evaluates squad needs, player quality, remaining purse, and squad-slot reserve before buying or passing.
- IPL-inspired maximum of 8 overseas players per squad and 4 in the Playing XI; both are validated by the server.
- Manual overseas classification: enter exact player names separated by commas in setup. These players are included in the selected pool when possible and treated as overseas for this game.
- Randomly selected, role-balanced auction pool without duplicate player names. If the selected player count exceeds the unique database available under the chosen nationality rule, the game shows an error instead of repeating players.
- Safe-bid reserve protects the base-price amount needed to fill remaining squad slots.
- Purchased players are removed from future unsold rounds. Players who remain unsold can be offered again in a later unsold round.
- Manual Playing XI selection, with maximum 11 players and no more than 4 overseas players.
- Weighted team-rating estimate, strengths, weaknesses, and squad recommendations. Attribute ratings are for this game simulation, not official player statistics.

## Run locally

1. Install Node.js (LTS recommended).
2. Open a terminal in the `backend` folder.
3. Run `npm install`.
4. Run `npm start`.
5. Open `http://localhost:3000`.

This app keeps the active game in server memory. Restarting the server resets the current auction; save/resume persistence is not included in this build.

