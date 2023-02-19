const express = require('express');
const app = express();
const cors  = require('cors');
const bodyparser = requier('body-parser');
app.use(bodyParser.json());
app.use(cors());

const gptRouter = require('./routes/gpt.js');
app.use('/message', gptRouter);

const storeRouter = require('./routes/store.js');
app.use('/store', storeRouter);

app.listen(33001, () => {
  console.log('app is listening on port 3001')
})

module.exports = router;