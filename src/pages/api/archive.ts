// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

interface ArchiveOptions {
	startAt: number;
	fetchNum: number;
}

async function fetchArchive(channelId: string, options: ArchiveOptions) {
	const startAt = options.startAt ?? 0;
	const fetchNum = options.fetchNum ?? 25;

	const fetchedMessages = await prisma.archivedMessage.findMany({
		where: {
			channelId,
		},
		skip: startAt,
		take: fetchNum,
	});

	return fetchedMessages;
}

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
	const messages = fetchArchive('', {
		startAt: 0,
		fetchNum: 100,
	});
	res.status(200).json(messages);
};

export default examples;
