import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import { Movie } from '../typings';
import requests from '../utils/requests';
import Row from '../components/Row';

interface Props {
	netflixOriginals: Movie[];
	trendingNow: Movie[];
	topRated: Movie[];
}

const Trending = ({ netflixOriginals, topRated, trendingNow }: Props) => {
	console.log(netflixOriginals);

	return (
		<div className='relative h-screen bg-gradient-to-b lg:h-[140vh]'>
			<Head>
				<title>New and Trending | Netflix</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<main className='relative pl-5 lg:space-y-16 lg:pl-14 mt-20'>
				{/* Creates a row for each genre of movies */}
				<section className='space-y-12'>
					<Row title='Trending Now' movies={trendingNow} />
					<Row title='Top Rated' movies={topRated} />
				</section>
			</main>
		</div>
	);
};

export default Trending;

export const getServerSideProps = async () => {
	const [trendingNow, topRated] = await Promise.all([
		fetch(requests.fetchTrending).then((res) => res.json()),
		fetch(requests.fetchTopRated).then((res) => res.json()),
	]);

	return {
		props: {
			trendingNow: trendingNow.results,
			topRated: topRated.results,
		},
	};
};
