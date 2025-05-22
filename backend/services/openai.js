const axios = require('axios');

module.exports = async function summarizeTodos(todos) {
  const content = `Summarize these tasks:\n${todos.map(t => `- ${t.title}`).join('\n')}`;
  
  const res = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content }],
  }, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
  });

  return res.data.choices[0].message.content;
}
