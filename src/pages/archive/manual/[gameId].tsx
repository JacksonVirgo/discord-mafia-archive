import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { prisma } from '../../../server/db/client';

/* 

Add some authentication here probably.

*/

export default function Home({ users }: ServerSideProps) {
	return (
		<>
			<Head>
				<title>Discord Mafia Archive</title>
				<meta name="description" content="Description here" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			{/* 
				Slots
					- All players that are known under this slot.
					- Their role
						- Alignment
						- Subalignment
						- Role name
						- Rolecard
				Votes
					- Input
					- Output
					- Timestamp

				Game
					- Player Count
					- Mechanics
			*/}

			<main className="align-center flex h-screen w-screen flex-col bg-zinc-800 text-center">
				<h1 className="p-3 text-3xl font-bold text-white underline decoration-red-300">Game Archive</h1>
				<div className="flex flex-grow flex-row ">
					<div className="bg-zinc-700 p-8">
						<h2 className="text-xl font-bold text-white underline">Players</h2>
						<ul>
							{Object.keys(users).map((userId) => (
								<li key={userId} className="text-gray-300">
									{users[userId]}
								</li>
							))}
						</ul>
					</div>
					<div className="flex-grow bg-zinc-600"></div>
					<div className="flex-grow bg-zinc-700"></div>
				</div>
			</main>
		</>
	);
}

interface ServerSideProps {
	users: Record<string, string>;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { query } = ctx;
	const { gameId } = query;
	if (!gameId || typeof gameId != 'string') {
		return {
			redirect: {
				permanent: false,
				destination: '/404',
			},
			props: {},
		};
	}

	const allUsers: Record<string, string> = {};

	const channel = await prisma.archivedChannel.findUnique({
		where: {
			discordChannelId: gameId,
		},
		include: {
			messages: {
				include: {
					author: true,
				},
			},
		},
	});

	if (!channel) {
		return {
			redirect: {
				permanent: false,
				destination: '/404',
			},
			props: {},
		};
	}

	for (const message of channel.messages) {
		if (!allUsers[message.author.discordId]) allUsers[message.author.discordId] = message.author.username;
	}

	console.log(allUsers);

	return {
		props: {
			users: allUsers,
		},
	};
};
