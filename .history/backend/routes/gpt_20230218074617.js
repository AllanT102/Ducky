const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const router = express.Router();

const token = process.env.OPENAI_API_KEY;

const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

const app = express();
const things = require('../server.js')
app.use('/message', things) // router???? wtf is this
app.use(bodyParser.json());
app.use(cors());

app.post('/message', (req, res) => {
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: req.body.prompt
    })

    response.then((data) => {
        res.send({message: data.data.choices[0].text});
    });
});
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

// async function runCompletion () {
//     const completion = await openai.createCompletion({
//     model: "text-davinci-003",
//     prompt: "How are you today?",
//     });
//     console.log(completion.data.choices[0].text);
// }

// runCompletion();
