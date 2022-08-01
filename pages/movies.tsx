import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import { Movie } from '../typings';
import requests from '../utils/requests';
import Banner from '../components/Banner';
import Row from '../components/Row';

interface Props {
	netflixOriginals: Movie[];
	trendingNow: Movie[];
	topRated: Movie[];
	actionMovies: Movie[];
	comedyMovies: Movie[];
	horrorMovies: Movie[];
	romanceMovies: Movie[];
	documentaries: Movie[];
}

const Movies = ({
	netflixOriginals,
	actionMovies,
	comedyMovies,
	documentaries,
	horrorMovies,
	romanceMovies,
	topRated,
	trendingNow,
}: Props) => {
	console.log(netflixOriginals);

	return (
		<div className='relative h-screen bg-gradient-to-b lg:h-[140vh]'>
			<Head>
				<title>Movies | Netflix</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<main className='relative pl-10 lg:space-y-16 lg:pl-14 mt-20'>
				<section className='md:space-y-16 space-y-12'>
					<Row title='Action Thrillers' movies={actionMovies} />
					<Row title='Comedies' movies={comedyMovies} />
					<Row title='Scary Movies' movies={horrorMovies} />
					<Row title='Romance Movies' movies={romanceMovies} />
					<Row title='Documentaries' movies={documentaries} />
				</section>
			</main>
		</div>
	);
};

export default Movies;

export const getServerSideProps = async () => {
	const [
		netflixOriginals,
		actionMovies,
		comedyMovies,
		horrorMovies,
		romanceMovies,
		documentaries,
	] = await Promise.all([
		fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
		fetch(requests.fetchActionMovies).then((res) => res.json()),
		fetch(requests.fetchComedyMovies).then((res) => res.json()),
		fetch(requests.fetchHorrorMovies).then((res) => res.json()),
		fetch(requests.fetchRomanceMovies).then((res) => res.json()),
		fetch(requests.fetchDocumentaries).then((res) => res.json()),
	]);

	return {
		props: {
			netflixOriginals: netflixOriginals.results,
			actionMovies: actionMovies.results,
			comedyMovies: comedyMovies.results,
			horrorMovies: horrorMovies.results,
			romanceMovies: romanceMovies.results,
			documentaries: documentaries.results,
		},
	};
};
