// pages/api/salesforce/fetch.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, instance_url } = req.query;

  try {
    const leads = await axios.get(`${instance_url}/services/data/v59.0/query?q=SELECT+Id,FirstName,LastName+FROM+Lead`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    res.status(200).json({ leads: leads.data.records });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data', details: error });
  }
}
