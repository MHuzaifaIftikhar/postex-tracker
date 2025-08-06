import axios from 'axios';

export default async function handler(req, res) {
  const { tracking } = req.query;
  const token = process.env.POSTEX_TOKEN;

  if (!tracking) {
    return res.status(400).json({ error: 'Missing tracking number' });
  }

  if (!token) {
    return res.status(500).json({ error: 'POSTEX_TOKEN missing' });
  }

  try {
    const response = await axios.get(
      `https://api.postex.pk/services/integration/api/order/v1/track-order/${tracking}`,
      { headers: { token } }
    );

    return res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    return res.status(500).json({
      error: 'PostEx API call failed',
      reason: error?.response?.data || error.message,
    });
  }
}
