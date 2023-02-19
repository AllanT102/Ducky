const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const router = express.Router();

const token = process.env.OPENAI_API_KEY;

const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

router.post('/', (req, res) => {
    console.log(req.body.prompt);
    const got = axios.get("http://localhost:3001/db");
    const toSend = "Here is the text that I will reference: '"+got.text+"'. I know that a list of the main ideas of this text are" + got.keyElemArray + "."
     + "I also know that " + req.body.prompt + ". I know that physics is a branch of science that studies matter and its motion, if it's in the list of main ideas of the text, can you cross it out and regenerate the list of main ideas of the text?";
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: toSend
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