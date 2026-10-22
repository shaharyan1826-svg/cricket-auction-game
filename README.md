# 🏏 Auction Night — Custom T20 Cricket Auction Game

A web-based cricket auction game inspired by the IPL auction format. Create teams, manage budgets, bid on players, build balanced squads, select your Playing XI, and compare team ratings.

## 🎮 Play the Game

👉 [Play Cricket Auction Game](https://cricket-auction-game-eios.onrender.com/)

## ✨ Features

- 🏏 **Custom Cricket Auction:** Configure teams, team names, squad sizes, budgets, base prices, and the number of auction players.
- 🔨 **Manual Auction by Default:** Control bidding for all teams without computer participation.
- 🤖 **Optional Computer Auction:** Choose Human vs Computer mode when you want computer-controlled bidding.
- ⚙️ **Computer Difficulty:** Select Beginner, Professional, or Expert difficulty in Human vs Computer mode.
- 💰 **Budget Management:** Track team budgets, winning bids, and remaining purse.
- 🛡️ **Safe Bidding:** Reserve enough money to fill remaining squad slots at the minimum base price.
- 👥 **Live Squad Tracking:** View purchased players, player roles, squad counts, budgets, and overseas counts during the auction.
- 🌍 **Automatic Overseas Detection:** Determine overseas status from player nationality in `backend/players.js`; no manual overseas-name entry is required.
- 📏 **Overseas Limits:** Enforce a maximum of 8 overseas players per squad and 4 in the Playing XI, with backend validation.
- 🎲 **Balanced Player Pool:** Randomly select players across roles while preventing duplicate player names in an auction.
- 🔁 **Unsold Player Rounds:** Give eligible unsold players another chance to be purchased without returning already-purchased players to the unsold pool.
- 🏆 **Squad Management:** Review teams and their players throughout the auction.
- 📋 **Auction Summary:** Review sold and unsold players after the main auction.
- 🧢 **Playing XI Builder:** Arrange players into a team of up to 11 players, respecting the overseas-player limit.
- ⭐ **Team Ratings:** Compare batting, bowling, power hitting, finishing, squad balance, strengths, weaknesses, and recommendations.
- 📱 **Responsive Interface:** Dark stadium-inspired theme with green and gold accents.

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js

## 📁 Project Structure

```text
cricket-auction-game/
├── backend/
│   ├── server.js
│   ├── gameLogic.js
│   ├── players.js
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── README.md
```

## 🚀 Run Locally

### Requirements

Install [Node.js](https://nodejs.org/) version 18 or later.

### Installation

1. Clone or download this repository.
2. Open a terminal in the `backend` folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open your browser at:

   ```text
   http://localhost:3000
   ```

The Express server serves the frontend and provides the API.

## ☁️ Deployment on Render

The project can be hosted on [Render](https://render.com/).

Configure the web service as follows:

- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

The server uses `process.env.PORT` when provided by the hosting platform and falls back to port `3000` for local development.

Live website: [Cricket Auction Game](https://cricket-auction-game-eios.onrender.com/)

## 🎯 How to Play

1. **Setup:** Choose the number of teams, budgets, squad sizes, auction player count, base price, and nationality rules.
2. **Choose a mode:** Use Manual Auction by default, or select Human vs Computer to enable computer bidding settings.
3. **Auction:** Review each player and submit bids for teams, or mark a player unsold.
4. **Track squads:** Monitor team rosters, remaining budgets, player roles, and overseas counts.
5. **Review results:** Check the auction summary and eligible unsold players.
6. **Build the Playing XI:** Select and arrange up to 11 players while respecting the overseas limit.
7. **Compare teams:** Review team ratings, strengths, weaknesses, and squad-balance recommendations.

## 💰 Budget Safety

The game reserves enough money to fill the remaining squad slots at the minimum configured base price.

For example, if a team has a budget of `$8`, a squad size of `2`, and a minimum base price of `$2`, the maximum safe bid for the first player is `$6`, leaving `$2` to fill the remaining slot.

The backend must validate bids as well as the frontend to prevent invalid purchases.

## 🌍 Overseas-Player Rules

- Player nationality is maintained in `backend/players.js`.
- Overseas status is determined from the nationality data rather than manually entered player names.
- Each squad can contain up to 8 overseas players.
- A Playing XI can contain no more than 4 overseas players.
- Both the interface and backend should enforce these restrictions.

## 📊 Team Ratings

Team ratings provide a simulated assessment of squad quality based on player attributes and team composition. Ratings can include batting, bowling, power hitting, finishing, squad depth, role balance, wicketkeeping, strengths, weaknesses, and recommendations.

These ratings are estimates for the game and are not official player statistics or predictions of actual match results.

## ⚠️ Notes and Limitations

- The active auction is stored in server memory; restarting the server resets the current game.
- Persistent save/resume functionality and a database are not included in this build.
- The game is an independent cricket auction simulation and is not an official IPL product.
- Features described in this README depend on the corresponding frontend and backend implementations being present and working.

## 👨‍💻 Project

**Cricket Auction Game — Auction Night**

Built with HTML, CSS, JavaScript, Node.js, and Express.js.

