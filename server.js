const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const bundles = [
  { id: 1, name: 'Daily Bundle (100MB)', price: 10 },
  { id: 2, name: 'Weekly Bundle (500MB)', price: 50 },
  { id: 3, name: 'Monthly Bundle (5GB)', price: 300 }
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
  res.render('success', { name: req.body.name, bundleName: req.body.bundleName });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
