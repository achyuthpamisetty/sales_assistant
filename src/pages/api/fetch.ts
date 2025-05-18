import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = Array.isArray(req.query.token) ? req.query.token[0] : req.query.token;
  let instance_url = Array.isArray(req.query.instance_url) ? req.query.instance_url[0] : req.query.instance_url;

  if (!token || !instance_url) {
    return res.status(400).json({ error: 'Missing token or instance_url query params' });
  }

  instance_url = decodeURIComponent(instance_url);

  try {
    const leadsResponse = await axios.get(
      `${instance_url}/services/data/v59.0/query?q=SELECT+Id,FirstName,LastName+FROM+Lead`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.status(200).json({ leads: leadsResponse.data.records });
  } catch (error: any) {
    console.error('Error fetching leads from Salesforce:', error.response?.data || error.message || error);
    res.status(500).json({
      error: 'Failed to fetch data',
      details: error.response?.data || error.message || 'Unknown error',
    });
  }
}
