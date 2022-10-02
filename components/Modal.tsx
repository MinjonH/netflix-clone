import { useEffect, useState } from 'react';
import MuiModal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import ReactPlayer from 'react-player/lazy';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Movie, Element, Genre } from '../typings';
import {
	CheckIcon,
	PlusIcon,
	VolumeOffIcon,
	VolumeUpIcon,
	XIcon,
} from '@heroicons/react/solid';
import { BsHandThumbsUp, BsFillPlayFill } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	onSnapshot,
	setDoc,
} from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';

function Modal() {
	const { user } = useAuth();
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [movie, setMovie] = useRecoilState(movieState);
	const [trailer, setTrailer] = useState('');
	const [genres, setGenres] = useState<Genre[]>();
	const [muted, setMuted] = useState(true);
	const [addedToList, setAddedToList] = useState(false);
	const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);

	const toastStyle = {
		background: 'white',
		color: 'black',
		fontWeight: 'bold',
		fontSize: '16px',
		padding: '15px',
		borderRadius: '9999px',
		maxWidth: '1000px',
	};

	useEffect(() => {
		if (!movie) return;

		async function fetchMovie() {
			const data = await fetch(
				`https://api.themoviedb.org/3/${
					movie?.media_type === 'tv' ? 'tv' : 'movie'
				}/${movie?.id}?api_key=${
					process.env.NEXT_PUBLIC_API_KEY
				}&language=en-US&append_to_response=videos`
			)
				.then((response) => response.json())
				.catch((err) => console.log(err));

			if (data?.videos) {
				const index = data.videos.results.findIndex(
					(element: Element) => element.type === 'Trailer'
				);
				setTrailer(data.videos?.results[index]?.key);
			}
			if (data?.genres) {
				setGenres(data.genres);
			}
		}

		fetchMovie();
	}, [movie]);

	// Find all the movies in the user's list
	useEffect(() => {
		if (user) {
			return onSnapshot(
				collection(db, 'customers', user.uid, 'myList'),
				(snapshot) => setMovies(snapshot.docs)
			);
		}
	}, [db, movie?.id]);

	// Check if the movie is already in the user's list
	useEffect(
		() =>
			setAddedToList(
				movies.findIndex((result) => result.data().id === movie?.id) !== -1
			),
		[movies]
	);

	const handleList = async () => {
		if (addedToList) {
			await deleteDoc(
				doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!)
			);

			toast(
				`${movie?.title || movie?.original_name} was removed from My List`,
				{ duration: 5000, style: toastStyle }
			);
		} else {
			await setDoc(
				doc(db, 'customers', user!.uid, 'myList', movie?.id.toString()!),
				{ ...movie }
			);

			toast(
				`${movie?.title || movie?.original_name} has been added to My List`,
				{ duration: 5000, style: toastStyle }
			);
		}
	};

	const handleClose = () => {
		setShowModal(false);
	};

	return (
		<MuiModal
			open={showModal}
			onClose={handleClose}
			className='!top-7 mx-auto fixed w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide'
		>
			<>
				<Toaster position='bottom-center' />
				{/* Close modal button */}
				<button
					onClick={handleClose}
					className='modalButton absolute right-5 top-5 !z-40 h-9 w-9 bg-[#181818] border-none hover:scale-125 hover:bg-[#181818]'
				>
					<XIcon className='h-6 w-6' />
				</button>
				{/* Play YouTube video */}
				<div className='relative pt-[56.25%] '>
					<ReactPlayer
						url={`https://www.youtube.com/watch?v=${trailer}`}
						width='100%'
						height='100%'
						style={{ position: 'absolute', top: '0', left: '0' }}
						playing
						muted={muted}
					/>
					<div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
						{/* Play button */}
						<button className='bannerBtn bg-white text-black'>
							<BsFillPlayFill className='h-5 w-5  text-black md:h-8 md:w-8' />
							Play
						</button>
						{/* Toggle sound button */}
						<button
							className='flex-col justify-center items-center'
							onClick={() => setMuted(!muted)}
						>
							{muted ? (
								<VolumeOffIcon className='w-7 h-7' />
							) : (
								<VolumeUpIcon className='w-7 h-7' />
							)}
						</button>
					</div>
				</div>

				{/* Bottom part */}
				<div className='flex space-x-16 rounded-b-md bg-gradient-to-t  from-[#181818] to-black px-10 pb-16'>
					<div className='space-y-6 text-lg'>
						{/* small details */}
						<div className='flex items-center space-x-2 text-sm'>
							<p className='font-semibold text-green-400'>
								{movie?.vote_average * 10}% Match
							</p>
							<p className='font-light'>
								{movie?.release_date || movie?.first_air_date}
							</p>
							<div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 py-2 text-sm'>
								HD
							</div>
						</div>

						{/* movie title */}
						<div>
							<h1 className='text-4xl font-bold'>{movie?.title}</h1>
						</div>

						{/* about movie */}
						<div className='flex gap-x-10 gap-y-4 font-light md:flex-row'>
							<p>{movie?.overview}</p>
						</div>
						<div className='flex flex-col text-md space-y-3'>
							<div>
								<span className='text-[gray]'>Genres: </span>
								{genres?.map((genre) => genre.name).join(', ')}
							</div>
						</div>
						<div className='flex space-x-2'>
							{/* my list button */}
							<button
								className='flex-col justify-center items-center mr-16'
								onClick={handleList}
							>
								{addedToList ? (
									<CheckIcon className='w-14 h-14' />
								) : (
									<PlusIcon className='w-14 h-14' />
								)}
								My List
							</button>

							{/* Like button */}
							<button className='flex-col justify-center items-center mr-16'>
								<BsHandThumbsUp className='w-14 h-14' />
								Rate
							</button>
						</div>
					</div>
				</div>
			</>
		</MuiModal>
	);
}

export default Modal;
