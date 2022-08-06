import Image from 'next/image';
import React from 'react';
import { Movie } from '../typings';

interface Props {
	movie: Movie;
}

//Individual movie posters
const Thumbnail = ({ movie }: Props) => {
	return (
		<div className='relative h-[270px] min-w-[180px] cursor-pointer transition duration-200 ease-out md:min-w-[260px] md:h-[390px] lg:hover:scale-95 md:hover:scale-95 hover:scale-95 '>
			{/* Movie posters */}
			<Image
				src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
				className='rounded-sm object-cover md:rounded'
				layout='fill'
			/>
		</div>
	);
};

export default Thumbnail;
