const express = require('express');
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const router = express.Router();

const token = process.env.OPENAI_API_KEY;

const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
    const got = await axios.get("http://localhost:3001/db");
    const data = got.data;
    const item = data.message[0]
    console.log(item)
    // const toSend = "Here is the text that I will reference: '"+item.text+"'. I know that a list of the main ideas of this text are" + item.keyElemArray + "."
    //  + "Secondly, I also know that " + req.body.prompt + ". If that is in the list of main ideas of the text I gave you, can you remove it from the list and regenerate the list of main ideas of the text?";
    const toSend = `Here is the information that I am studying and referencing from: ${item.text}. The list of main ideas of this text are ${item.keyElemArray}.
    I want to practice my active recall, so please listen to the information I tell you and tell me if I am wrong. Please ask me some questions and give me some information too. Don't ask me questions consecutively though.
    You could build off of my information or you could ask me about something else. My last was: ${req.body.newMessage} and please answer in full sentences, have at least 2 sentences, and don't repeat your sentences!`
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        max_tokens: 50,
        prompt: toSend
    })

    // also need to prompt if there's still stuff in array

    response.then((data) => {
        console.log(data.data.choices)
        res.send({message: data.data.choices[0].text});
    });
});


module.exports = router;