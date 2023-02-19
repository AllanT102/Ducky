const express = require('express');
// import express from "express";
const app = express();
const cors  = require('cors');
// import cors from "cors";
const bodyParser = require('body-parser');
// import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(cors());

const gptRouter = require('./routes/gpt.js');
// import gptRouter from './routes/gpt.js';
app.use('/message', gptRouter);

const storeRouter = require('./routes/store.js');
// import storeRouter from './routes/store.js';
app.use('/store', storeRouter);

const pdfRouter = require('./routes/pdfToTextRoute');
app.use('/pdfToText', pdfRouter);

const dbRouter = require('./routes/dbConnection.js');
app.use('/db', dbRouter);

app.listen(3001, () => {
  console.log('app is listening on port 3001')
})
