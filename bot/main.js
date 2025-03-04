require('dotenv').config();

const express = require('express');
const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 8000;

// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Bitget API config
const API_KEY = process.env.BITGET_API_KEY;
const SECRET_KEY = process.env.BITGET_SECRET_KEY;
const PASSPHRASE = process.env.BITGET_PASSPHRASE;
const BASE_URL = 'https://api.bitget.com';

// List of coins to trade
const COINS = ['SOLUSDT', 'ADAUSDT'];
const botState = {};

class MiniBot {
    constructor(symbol) {
        this.symbol = symbol;
        this.entryPrice = null;
    }

    async getPrice() {
        try {
            const response = await axios.get(`${BASE_URL}/api/spot/v1/market/ticker?symbol=${this.symbol}`);
            return parseFloat(response.data.data.close);
        } catch (error) {
            console.error(`Error fetching price for ${this.symbol}:`, error);
            return null;
        }
    }

    async trade() {
        const price = await this.getPrice();
        if (!price) return;

        if (!this.entryPrice) {
            this.entryPrice = price;
            return;
        }

        const drop = ((this.entryPrice - price) / this.entryPrice) * 100;
        const rise = ((price - this.entryPrice) / this.entryPrice) * 100;

        if (drop >= 10) {
            await this.placeOrder('BUY', price);
            this.entryPrice = price;
        }
        if (rise >= 20) {
            await this.placeOrder('SELL', price);
            this.entryPrice = null;
        }
        if (drop >= 30) {
            await this.placeOrder('SELL', price, true);
            this.entryPrice = null;
        }
    }

    async placeOrder(side, price, stopLoss = false) {
        console.log(`${side} order placed for ${this.symbol} at ${price}`);

        await supabase.from('trades').insert([
            { action: side, symbol: this.symbol, price, timestamp: new Date().toISOString() }
        ]);
    }
}

async function runBot() {
    for (let coin of COINS) {
        if (!botState[coin]) botState[coin] = new MiniBot(coin);
        botState[coin].trade();
    }
}

setInterval(runBot, 10000); // Run every 10 seconds

app.get('/', (req, res) => res.send('Trading Bot Running'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
