export default async function handler(req, res) {
  const { tracking } = req.query;
  const token = process.env.POSTEX_TOKEN;

  res.setHeader('content-type', 'application/json');

  const debug = {
    tracking: tracking || null,
    tokenFound: !!token,
    tokenPreview: token ? `${token.slice(0, 5)}...` : null
  };

  if (!tracking) return res.status(400).json({ error: 'Missing tracking number', debug });

  if (!token) return res.status(500).json({ error: 'POSTEX_TOKEN missing', debug });

  try {
    const axios = require('axios');
    const response = await axios.get(
      `https://api.postex.pk/services/integration/api/order/v1/track-order/${tracking}`,
      { headers: { token } }
    );
    return res.status(200).json({ debug, data: response.data });
  } catch (error) {
    return res.status(500).json({
      error: 'PostEx call failed',
      detail: error.message,
      fromPostEx: error?.response?.data || null,
      debug
    });
  }
}
