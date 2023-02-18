const API_KEY = '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';
const ENGINE_ID = 'davinci-codex';
const API_URL = `https://api.openai.com/v1/engines/${ENGINE_ID}/completions`;
const prompt = 'Hello, ChatGPT! Can you write a poem about the sunset?';
const temperature = 0.5;
const maxTokens = 50;
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
  body: JSON.stringify({
    'prompt': prompt,
    'temperature': temperature,
    'max_tokens': maxTokens,
  }),
};
fetch(API_URL, requestOptions)
  .then(response => response.json())
  .then(data => {
    const completions = data.choices;
    for (const completion of completions) {
      const poem = completion.text;
      console.log(poem);
    }
  })
  .catch(error => console.error('Error:', error));