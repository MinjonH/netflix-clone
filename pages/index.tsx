import Head from 'next/head';
import { getProducts, Product } from '@stripe/firestore-stripe-payments';
import { Movie } from '../typings';
import { useRecoilValue } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import Header from '../components/Header';
import requests from '../utils/requests';
import Banner from '../components/Banner';
import Row from '../components/Row';
import useAuth from '../hooks/useAuth';
import Modal from '../components/Modal';
import Plans from '../components/Plans';
import payments from '../lib/stripe';
import useSubscription from '../hooks/useSubscription';
import useList from '../hooks/useList';

interface Props {
	netflixOriginals: Movie[];
	trendingNow: Movie[];
	topRated: Movie[];
	actionMovies: Movie[];
	comedyMovies: Movie[];
	horrorMovies: Movie[];
	romanceMovies: Movie[];
	documentaries: Movie[];
	products: Product[];
}

const Home = ({
	netflixOriginals,
	actionMovies,
	comedyMovies,
	documentaries,
	horrorMovies,
	romanceMovies,
	topRated,
	trendingNow,
	products,
}: Props) => {
	const { user, loading } = useAuth();
	const showModal = useRecoilValue(modalState);
	const subscription = useSubscription(user);
	const movie = useRecoilValue(movieState);
	const list = useList(user?.uid);

	if (loading || subscription === null) return null;

	if (!subscription) return <Plans products={products} />;

	if (loading) return null;

	return (
		<div
			className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] ${
				showModal && '!h-screen overflow-hidden'
			}`}
		>
			<Head>
				<title>Home | Netflix</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />

			<main className='relative pl-5 lg:space-y-16 lg:pl-14'>
				<Banner netflixOriginals={netflixOriginals} />

				{/* Creates a row for each genre of movies */}
				<section className='md:space-y-6 space-y-6'>
					<Row title='Trending Now' movies={trendingNow} />
					<Row title='Top Rated' movies={topRated} />

					{/* My List component */}
					{list.length > 0 && <Row title='My List' movies={list} />}

					<Row title='Action Thrillers' movies={actionMovies} />
					<Row title='Comedies' movies={comedyMovies} />
					<Row title='Horror' movies={horrorMovies} />
					<Row title='Romance' movies={romanceMovies} />
					<Row title='Documentaries' movies={documentaries} />
				</section>
			</main>
			{showModal && <Modal />}
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const products = await getProducts(payments, {
		includePrices: true,
		activeOnly: true,
	})
		.then((res) => res)
		.catch((err) => console.log(err));

	const [
		netflixOriginals,
		trendingNow,
		topRated,
		actionMovies,
		comedyMovies,
		horrorMovies,
		romanceMovies,
		documentaries,
	] = await Promise.all([
		fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
		fetch(requests.fetchTrending).then((res) => res.json()),
		fetch(requests.fetchTopRated).then((res) => res.json()),
		fetch(requests.fetchActionMovies).then((res) => res.json()),
		fetch(requests.fetchComedyMovies).then((res) => res.json()),
		fetch(requests.fetchHorrorMovies).then((res) => res.json()),
		fetch(requests.fetchRomanceMovies).then((res) => res.json()),
		fetch(requests.fetchDocumentaries).then((res) => res.json()),
	]);

	return {
		props: {
			netflixOriginals: netflixOriginals.results,
			trendingNow: trendingNow.results,
			topRated: topRated.results,
			actionMovies: actionMovies.results,
			comedyMovies: comedyMovies.results,
			horrorMovies: horrorMovies.results,
			romanceMovies: romanceMovies.results,
			documentaries: documentaries.results,
			products,
		},
	};
};
