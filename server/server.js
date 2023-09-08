const express = require('express');
const cors = require('cors');
const yahooFinance = require('yahoo-finance2').default;
const app = express();


const validate_results = { validateResult: false }

const formatDate = dt => {
  dt = new Date(dt);
  const year = dt.toLocaleString('default', { year: 'numeric' });
  const month = dt.toLocaleString('default', { month: '2-digit' });
  const day = dt.toLocaleString('default', { day: '2-digit' });
  return `${year}-${month}-${day}`;
}

app.use(cors());
app.use(express.json());

app.get('/get_symbol', async(req, res) => {
  const opts = { return: req.query.type || 'array' }
  const results = await yahooFinance.quote(req.query.symbol, opts, validate_results);

  return res.json(results);
});

app.get('/get_trending', async(req, res) => {
  const opts = {
    count: req.query.count || 15,
    lang: 'en-US'
  }
  const trending = await yahooFinance.trendingSymbols('US', opts, validate_results);
  const symbols = trending.quotes.map(d => d.symbol);  
  const results = await yahooFinance.quote(symbols, { return: 'array'}, validate_results);

  return res.json(results);
});

app.get('/get_historical', async(req, res) => {
  const formatDate = dt => {
    dt = new Date(dt);
    const year = dt.toLocaleString('default', { year: 'numeric' });
    const month = dt.toLocaleString('default', { month: '2-digit' });
    const day = dt.toLocaleString('default', { day: '2-digit' });
    return `${year}-${month}-${day}`;
  }
  const sd_date = new Date();
  const ed_date = new Date();
  const sd = formatDate(sd_date.setDate(sd_date.getDate() - 2));
  const ed = formatDate(ed_date.setDate(ed_date.getDate() - 1));
  const symbol = req.query.symbol || 'AAPL';
  const opts = {
    period1: req.query.start || sd,
    period2: req.query.start || ed,
    interval: req.query.interval || '1d'
  }
  const results = await yahooFinance.historical(symbol, opts, validate_results);

  return res.json(results);
});

app.get('/get_chart', async(req, res) => {
  const today = new Date();
  const opts = {
    period1: req.query.sd || formatDate(today.setDate(today.getDate() - 5)),
    // period2: req.query.ed || formatDate(today), // not needed, we always want to pull data up to today
    interval: req.query.interval || '1m'
  }
  const results = await yahooFinance._chart(req.query.symbol, opts, validate_results);

  return res.json(results.quotes);
});

app.get('/get_insights', async(req, res) => {
  const count = 10;
  const symbol = req.query.symbol || 'AAPL';
  const opts = {
    reportsCount: req.query.start || count,
    region: 'US',
    lang: 'en-US'
  }
  const results = await yahooFinance.insights(symbol, opts, validate_results);

  return res.json(results);
});

app.get('/search', async(req, res) => {
  const results = await yahooFinance.search(req.query.q, {}, validate_results);

  return res.json(results);
});

app.get('/get_recommendations', async(req, res) => {
  const results = await yahooFinance.recommendationsBySymbol(req.query.symbol, {}, validate_results);

  return res.json(results);
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});