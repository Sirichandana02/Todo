const express = require('express');
const router = express.Router();
const { supabase } = require('../db/supabaseClient');
const summarizeTodos = require('../services/openai');
const sendToSlack = require('../services/slack');

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*');
  if (error) return res.status(500).send(error);
  res.send(data);
});

router.post('/', async (req, res) => {
  const { title } = req.body;
  const { data, error } = await supabase.from('todos').insert([{ title }]);
  if (error) return res.status(500).send(error);
  res.send(data);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) return res.status(500).send(error);
  res.send({ success: true });
});

router.post('/summarize', async (req, res) => {
  const { data: todos } = await supabase.from('todos').select('*');
  const summary = await summarizeTodos(todos);
  const slackRes = await sendToSlack(summary);
  res.send({ summary, slack: slackRes });
});

module.exports = router;
