const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const token = process.env.OPENAI_API_KEY;

const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/message', (req, res) => {
    const response = openai.createCompletion({
        model = 'text-dav'
    })
})

// async function runCompletion () {
//     const completion = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "How are you today?",
//     });
//     console.log(completion.data.choices[0].text);
// }

// runCompletion();
