const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const bundles = [
  { id: 1, name: 'Daily Airtime - 10 KES', price: 10 },
  { id: 2, name: 'Weekly Airtime - 50 KES', price: 50 },
  { id: 3, name: 'Monthly Airtime - 300 KES', price: 300 }
];

app.get('/', (req, res) => {
  res.render('index', { bundles });
});

app.post('/checkout', (req, res) => {
  const bundleId = parseInt(req.body.bundleId);
  const bundle = bundles.find(b => b.id === bundleId);
  if (!bundle) return res.send('Bundle not found.');
  res.render('checkout', { bundle });
});

app.post('/pay', (req, res) => {
  const { name, bundleName } = req.body;
  res.render('success', { name, bundleName });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
