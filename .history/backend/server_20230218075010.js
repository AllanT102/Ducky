const express = require('express');
const app = express();
const cors  = require('cors');
const bodyparser = requier('body-parser');
app.use(bodyParser.json());
app.use(cors());

const gptRouter = require('./routes/gpt.js')



// middleware that is specific to this router
router.use((req, res, next) => {
    next()
  })
  // define the home page route
  router.post('/message', (req, res) => {
    res.send('got message from user')
  })
  // define the about route
  router.post('/store', (req, res) => {
    res.send('storing info in db')
  })

module.exports = router;