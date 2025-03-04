# Bitget Trading Bot (Node.js)

This is a custom crypto trading bot built with **Node.js**, using **Bitget API** for spot trading and **Supabase** for logging trades. The bot buys coins when their price drops by 10%, sells when they rise by 20%, and implements a stop-loss at -30%.

## Features
- Trades multiple coins asynchronously.
- Executes market orders based on price movements.
- Logs all trades in Supabase for monitoring.
- Runs continuously on a server with automatic execution.

## Tech Stack
- **Node.js** (Backend)
- **Bitget API** (Trading)
- **Supabase** (Database for trade logs)
- **Render** (Hosting for the bot)
- **Vercel** (Web dashboard for trade monitoring)

## Installation

### 1. Clone the repository
```sh
git clone https://github.com/your-repo/trading-bot-nodejs.git
cd trading-bot-nodejs
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up environment variables
Create a `.env` file with your API keys:
```
BITGET_API_KEY=your_api_key
BITGET_SECRET_KEY=your_secret_key
BITGET_PASSPHRASE=your_passphrase
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PORT=8000
```

### 4. Deploy to Render
1. Create a new **Web Service** in Render.
2. Connect your GitHub repository.
3. Set environment variables in Render's dashboard.
4. Deploy and run the service.

### 5. Database Setup (Supabase)
1. Create a new **Supabase** project.
2. Go to **SQL Editor** and run:
```sql
CREATE TABLE trades (
  id SERIAL PRIMARY KEY,
  action TEXT,
  symbol TEXT,
  price FLOAT,
  timestamp TIMESTAMP DEFAULT NOW()
);
```
3. Get your Supabase **URL** and **API Key** and add them to `.env`.

### 6. Running Locally
```sh
node index.js
```

## Dashboard (Vercel)
You can build a **Vercel-hosted dashboard** to view live trades. Steps:
1. Create a new Next.js app (`npx create-next-app@latest`).
2. Fetch trade data from Supabase and display it.
3. Deploy to **Vercel**.

## License
MIT License. Feel free to contribute!

---

🚀 **Happy Trading!**
