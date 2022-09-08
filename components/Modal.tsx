import { useEffect, useState } from 'react';
import MuiModal from '@mui/material/Modal';
import ReactPlayer from 'react-player/lazy';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Movie, Element, Genre } from '../typings';
import {
	PlusIcon,
	VolumeOffIcon,
	VolumeUpIcon,
	XIcon,
} from '@heroicons/react/solid';
import { BsHandThumbsUp, BsFillPlayFill } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';

function Modal() {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [movie, setMovie] = useRecoilState(movieState);
	const [trailer, setTrailer] = useState('');
	const [genres, setGenres] = useState<Genre[]>();
	const [muted, setMuted] = useState(true);

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

	console.log(trailer);

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

				{/* Bottom part of modal */}
				<div className='flex space-x-16 rounded-b-md bg-gradient-to-t  from-[#181818] to-black px-10 pb-16'>
					<div className='space-y-6 text-lg'>
						{/* small details */}
						<div className='flex items-center space-x-2 text-sm'>
							<p className='font-semibold text-green-400'>
								{movie?.vote_average * 10}% match
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
							<button className='flex-col justify-center items-center mr-16'>
								<PlusIcon className='w-14 h-14' />
								My List
							</button>

							{/* Like button */}
							<button className='flex-col justify-center items-center mr-16'>
								<BsHandThumbsUp className='w-14 h-14' />
								Rate
							</button>

							{/* download button */}
							<button className=''>
								<HiDownload className='w-14 h-14 mx-16' />
								Download
							</button>
						</div>
					</div>
				</div>
			</>
		</MuiModal>
	);
}

export default Modal;
