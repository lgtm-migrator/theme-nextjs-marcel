import { getPrezlyApi } from '@prezly/theme-kit-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function fetchStories(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405);
        return;
    }

    const { page, pageSize, category, include } = req.body;

    try {
        const api = getPrezlyApi(req);

        const { stories } = await (category
            ? api.getStoriesFromCategory(category, { page, pageSize, include })
            : api.getStories({ page, pageSize, include }));

        res.status(200).json({ stories });
    } catch (err: any) {
        res.status(500).send({
            message: err.message,
        });
    }
}
