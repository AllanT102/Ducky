// gets text, etc from frontend & just stores it in the database
// also parses text for main ideas if the main idea set is None in database
// 

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

app.post('/store', (req, res) => {
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
