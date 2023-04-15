require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
console.log("Loaded Stripe API Key:", process.env.STRIPE_SECRET_KEY);

const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1MfPdUENhWzysuixLb3wgYq6',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

const PORT = process.env.PORT || 4242;
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: 'wadabento-catering',
  host: '35.220.239.76',
  password: '~taAC;.GInB|p(MG',
  database: 'wadabento-catering'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
});

app.get('/api/lunchboxes', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to fetch lunch boxes');
    } else {
      res.json(results);

    }
  });
});

app.get('/api/workdays', (req, res) => {
  db.query('SELECT work_days.* FROM work_days ', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to fetch work days');
    } else {
      console.log('Query results:', results);
      res.json(results);
    }
  });
});

app.post('/api/orders', (req, res) => {
  const orders = req.body;
  const values = Object.entries(orders).map(([date, lunchBox]) => [date, lunchBox.id]);

  db.query(
      'INSERT INTO orders (date, lunch_box_id) VALUES ?',
      [values],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Failed to submit order');
        } else {
          res.status(201).send('Order submitted successfully');
        }
      }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});