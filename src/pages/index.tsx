import Head from 'next/head';
import { NextPage, GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { Server } from 'http';
import { useEffect } from 'react';

export default function Home(props: ServerSideProps) {
	useEffect(() => {
		console.log(props);
	}, []);

	return (
		<>
			<Head>
				<title>Discord Mafia Archive</title>
				<meta name="description" content="Description here" />
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<main className="bg-red-400">
				<h1>Discord Mafia Archive</h1>
				<br />
				<p>{props.data}</p>
			</main>
		</>
	);
}

interface ServerSideProps {
	data: string;
}

export async function getServerSideProps() {
	const props: ServerSideProps = {
		data: 'This runs on the server, and will appear in the document.',
	};

	return {
		props: props,
	};
}
