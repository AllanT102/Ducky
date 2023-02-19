const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const router = express.Router();

const token = process.env.OPENAI_API_KEY;

const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

// given big chunk of text, call gpt to summarize main points & store as an array if there's not already one there
router.post('/', (req, res) => {
    const body = req.body;
    console.log(body);
    const toSend = "Here is the text that I will reference: '"+body+"'";
    console.log(toSend);
    console.log(botdy);
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: toSend.prompt
    })

    response.then((data) => {
        res.send({message: data.data.choices[0].text});
    });
});

// async function runCompletion () {
//     const completion = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "How are you today?",
//     });
//     console.log(completion.data.choices[0].text);
// }

// runCompletion();

module.exports = router;