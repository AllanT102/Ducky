// gets text, etc from frontend & just stores it in the Mongo database
// also parses text for main ideas (with gpt) if the main idea set is None in database, then stores set in db as well

const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const router = express.Router();

const token = process.env.OPENAI_API_KEY;

const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

 // router???? wtf is this

 // given big chunk of text, call gpt to summarize main points & store as an array if there's not already one there

router.post('/', (req, res) => {
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: req.body.prompt
    })

    response.then((data) => {
        res.send({message: data.data.choices[0].text});
    });
});

module.exports = router;