import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { DocumentData } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { Movie } from '../typings';
import Thumbnail from './Thumbnail';

interface Props {
	title: string;
	// When using firebase
	movies: Movie[] | DocumentData[];
}

const Row = ({ title, movies }: Props) => {
	const rowRef = useRef<HTMLDivElement>(null);
	const [isMoved, setIsMoved] = useState(false);

	const handleClick = (direction: string) => {
		setIsMoved(true);

		if (rowRef.current) {
			//Determines the current position of the scrollbar
			const { scrollLeft, clientWidth } = rowRef.current;
			//Enables right scroll button if page has not been scrolled
			const scrollTo =
				direction === 'left'
					? scrollLeft - clientWidth //scroll back
					: scrollLeft + clientWidth; //scroll forward

			rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
		}
	};

	return (
		<div className='h-[60] md:space-y-2'>
			{/* Movie title dependent on the movie background */}
			<h2 className='w-56 cursor-pointer text-lg font-semibold text-[#e5e5e5] transition duration-200 mt-4 hover:text-white md:text-2xl'>
				{title}
			</h2>

			<div className='group relative'>
				{/* Left scroll button */}
				<ChevronLeftIcon
					className={`absolute t-0 bottom-[45%] left-2 z-40 m-auto h-9 w-9 md:h-16 md:w-16 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
						!isMoved && 'hidden'
					}`}
					onClick={() => handleClick('left')}
				/>

				{/* Maps through movies in the genre to display in the row */}
				<div
					ref={rowRef}
					className='flex items-center overflow-x-scroll scrollbar-hide space-x-1.5 md:space-x-2.5 md:p-2'
				>
					{movies.map((movie) => (
						<Thumbnail key={movie.id} movie={movie} />
					))}{' '}
				</div>

				{/* Right scroll button */}
				<ChevronRightIcon
					className={
						'absolute t-0 bottom-[45%] right-2 z-40 m-auto h-9 w-9 md:h-16 md:w-16 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100'
					}
					onClick={() => handleClick('right')}
				/>
			</div>
		</div>
	);
};

export default Row;
