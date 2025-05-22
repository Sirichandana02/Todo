const axios = require('axios');

module.exports = async function sendToSlack(message) {
  try {
    await axios.post(process.env.SLACK_WEBHOOK_URL, { text: message });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
