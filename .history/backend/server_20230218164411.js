// const express = require('express');
import express from "express";
const app = express();
// const cors  = require('cors');
import cors from "cors";
// const bodyParser = require('body-parser');
import bodyParser from "body-parser";
app.use(bodyParser.json());
app.use(cors());

const gptRouter = require('./routes/gpt.js');
app.use('/message', gptRouter);

const storeRouter = require('./routes/store.js');
app.use('/store', storeRouter);

app.listen(3001, () => {
  console.log('app is listening on port 3001')
})
