// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';


const examples = async (req: NextApiRequest, res: NextApiResponse) => {
	const messages = await prisma.archivedMessage.findMany({});
	res.status(200).json(messages);
};

export default examples;
