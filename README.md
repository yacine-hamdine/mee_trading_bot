# 🚀 Bitget Trading Bot

This is an **automated trading bot** for **Bitget**, built with Python. It monitors selected cryptocurrency pairs, buys when the price drops **10%**, sells when the price rises **20%**, and has a **stop loss at 30%**. Each coin has an independent **mini-bot**, ensuring **asynchronous** execution.

## 🌟 Features
- 📉 **Automatic Buy & Sell Orders** (10% drop -> Buy, 20% rise -> Sell)
- 🛑 **Stop Loss Protection** (Sells if price drops 30%)
- ⚡ **Asynchronous Trading** (Each coin trades independently)
- 📊 **Trade History Logging** (Stored in **Supabase**)
- 🌍 **FastAPI for Monitoring**
- 🖥️ **Web Dashboard** (Deployed on **Vercel**)

---

## 📌 1. Setup Supabase Database

1. Create an account on [Supabase](https://supabase.com/)
2. Create a new project
3. Create a **trades** table with these columns:

| Column Name | Type | Description |
|-------------|------|-------------|
| id | UUID | Primary Key (Auto-Generated) |
| action | TEXT | "BUY" or "SELL" |
| symbol | TEXT | Trading pair (e.g., BTCUSDT) |
| price | FLOAT | Execution price |
| amount | FLOAT | Coin amount |
| balance | FLOAT | Updated balance |
| timestamp | TIMESTAMP | Auto |

---

## 📌 2. Install Dependencies
Run the following command to install required libraries:

```sh
pip install fastapi uvicorn requests supabase pybit
```

---

## 📌 3. Environment Variables
Create a `.env` file with:

```sh
BITGET_API_KEY=your_api_key
BITGET_SECRET_KEY=your_secret_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

---

## 📌 4. Run the Trading Bot
Start the bot with:

```sh
uvicorn bot:app --host 0.0.0.0 --port 8000
```

The bot will now trade 24/7 and store results in Supabase.

---

## 📌 5. Deploy to Render
1. Create an account on [Render](https://render.com/)
2. Create a **new Python service**
3. Add environment variables from `.env`
4. **Start command:**
   ```sh
   uvicorn bot:app --host 0.0.0.0 --port 8000
   ```

---

## 📌 6. Web Dashboard (Vercel)
The dashboard is built with **Next.js** and deployed on **Vercel**.

### **API to Fetch Trades** (`pages/api/trades.js`)
```javascript
export default async function handler(req, res) {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;

    const response = await fetch(`${SUPABASE_URL}/rest/v1/trades`, {
        headers: { "apikey": SUPABASE_KEY }
    });
    const trades = await response.json();

    res.status(200).json(trades);
}
```

### **Frontend Table (`pages/index.js`)**
```javascript
import { useEffect, useState } from "react";

export default function Home() {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        fetch("/api/trades")
            .then(res => res.json())
            .then(data => setTrades(data));
    }, []);

    return (
        <div>
            <h1>Trading Bot Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {trades.map((trade, index) => (
                        <tr key={index}>
                            <td>{trade.action}</td>
                            <td>{trade.symbol}</td>
                            <td>{trade.price.toFixed(2)}</td>
                            <td>{trade.amount.toFixed(4)}</td>
                            <td>{trade.balance.toFixed(2)}</td>
                            <td>{trade.timestamp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
```

---

## 🎉 Summary
✅ **Trading Bot on Render**
✅ **Supabase for Data Storage**
✅ **Web Dashboard on Vercel**

🚀 Now your bot is **fully automated & monitored in real-time!** 🎯
