const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const db = require('./database');

const app = express(); 

app.use(cors());
app.use(express.json());
app.use('/api', routes);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to database.');
});

module.exports = app;
