// main-server.js
const cors = require('cors');
const morgan = require('morgan');

const express = require('express');
const bodyParser = require('body-parser');

const PORT = 8081; // since Vue dev server defaults to 8080
const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json({ type: 'application/json' }))


app.listen(PORT);