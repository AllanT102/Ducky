// gets text, etc from frontend & just stores it in the Mongo database
// also parses text for main ideas (with gpt) if the main idea set is None in database, then stores set in db as well
const { client, createSession } = require('./dbConnection');
const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const router = express.Router();

const token = process.env.OPENAI_API_KEY;

const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

router.post('/', (req, res) => {
    const toSend = "Here is the text that I will reference: '"+req.body.prompt+"'. Please generate me a bullet pointed list of the main ideas of the text, in a Javascript array.";
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: toSend
    })
    response.then((data) => {
        // const response2 = openai.createCompletion({
        //     model: 'text-davinci-003',
        //     prompt: res
        // })
        const mainIdeas = data.data.choices[0].text;
        // store {text: req.body.prompt, mainIdeas: mainIdeas} in database
        router.post("http://localhost:3001/db", {txt: req.body.prompt, keyElemArray: mainIdeas}, headers: {'Content-Type:':'application/json'});
        res.send({mainIdeas: mainIdeas});
    });
});

module.exports = router;