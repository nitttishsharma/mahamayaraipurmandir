export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { from, to, count = 100, skip = 0 } = req.query;

    const KEY_ID = process.env.RAZORPAY_KEY_ID;
    const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

    if (!KEY_ID || !KEY_SECRET) {
        return res.status(500).json({ error: 'Razorpay API credentials not configured in .env' });
    }

    try {
        const auth = Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString('base64');

        let url = `https://api.razorpay.com/v1/payments/?count=${count}&skip=${skip}`;
        if (from) url += `&from=${from}`;
        if (to) url += `&to=${to}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch payments from Razorpay' });
    }
}
