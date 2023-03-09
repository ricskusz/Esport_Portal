require('dotenv').config();
const express = require('express');
const app = express();
const connection = require('./db');

app.use(express.json());
app.use('/api/user', require('./routes/userRoutes'));
connection();

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
