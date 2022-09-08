import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Movie } from '../typings';
import { baseUrl } from '../constants/movie';
import { BsInfoCircleFill, BsFillPlayFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';

interface Props {
	netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
	const [movie, setMovie] = useState<Movie | null>(null);
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

	useEffect(() => {
		//Sets a random movie from the API as the backdrop image - changes with each reload
		setMovie(
			netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
		);
	}, [netflixOriginals]);

	console.log(movie);

	return (
		<div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>
			{/* Background image of a random movie */}
			<div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
				<Image
					layout='fill'
					src={`${baseUrl}${movie?.backdrop_path}`}
					objectFit='cover'
				/>
			</div>

			{/* Movie title */}
			<h1 className='text-2xl font-bold md:text-3xl lg:text-6xl'>
				{movie?.title || movie?.name || movie?.original_name}
			</h1>

			{/* Movie description */}
			<p className='max-w-xs text-xs text-shadow-md md:max-w-lg md:text-sm lg:max-w-2xl lg:text-xl'>
				{movie?.overview}
			</p>

			<div className='flex space-x-3'>
				<button className='bannerBtn bg-white text-black'>
					<BsFillPlayFill className='h-5 w-5  text-black md:h-8 md:w-8' />
					Play
				</button>
				<button
					className='bannerBtn bg-gray-500/50'
					onClick={() => {
						setCurrentMovie(movie);
						setShowModal(true);
					}}
				>
					More Info
					<BsInfoCircleFill className='h-4 w-4 md:h-6 md:w-6' />
				</button>
			</div>
		</div>
	);
};

export default Banner;
