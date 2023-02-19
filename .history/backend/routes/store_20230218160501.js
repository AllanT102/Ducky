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

router.post('/', (req, res) => {
    const toSend = "Here is the text that I will reference: '"+req.body.prompt+"'";
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: toSend
    })
    response.then((data) => {
        const response2 = openai.createCompletion({
            model: 'text-davinci-003',
            prompt: toSend
        })
        res.send({message: data.data.choices[0].text});
    });
});

module.exports = router;