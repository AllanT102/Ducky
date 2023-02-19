const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
    next()
  })
  // define the home page route
  router.post('/message', (req, res) => {
    res.send('got message ')
  })
  // define the about route
  router.get('/about', (req, res) => {
    res.send('About birds')
  })

module.exports = router;