const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'https://siege-swe.vercel.app/' }));

const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

module.exports = app;