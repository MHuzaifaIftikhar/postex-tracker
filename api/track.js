
const axios = require('axios');

export default async function handler(req, res) {
  const { tracking } = req.query;

  if (!tracking) {
    return res.status(400).json({ error: 'Missing tracking number' });
  }

  try {
    const response = await axios.get(`https://api.postex.pk/services/integration/api/order/v1/track-order/${tracking}`, {
      headers: {
        token: process.env.POSTEX_TOKEN
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Tracking failed', detail: error.message });
  }
}
