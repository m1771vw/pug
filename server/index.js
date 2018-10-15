require('dotenv').config();

const express = require('express');

const chatkitRouter = require('./routes/chatkit');

const app = express();
const cors = require('cors')

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/chatkit', chatkitRouter);

app.listen(port, () => console.log(`PUG API listening on port ${port} 🐶 🍵!`));

module.exports = app;
