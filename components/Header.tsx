import React, { useEffect, useState } from 'react';
import { BellIcon, SearchIcon } from '@heroicons/react/solid';

const Header = () => {
	const [scroll, setScroll] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<header className={`${scroll && 'bg-[#141414]'}`}>
			<div className='flex items-center space-x-2 md:space-x-10'>
				<img
					src='https://rb.gy/ulxxee'
					width={100}
					height={100}
					className='cursor-pointer object-contain'
				/>
				<ul className='hidden space-x-4 md:flex'>
					<li className='headerLink'>Home</li>
					<li className='headerLink'>TV Shows</li>
					<li className='headerLink'>Movies</li>
					<li className='headerLink'>New & Popular</li>
				</ul>
			</div>

			<div className='flex items-center space-x-4 text-sm font-light'>
				<BellIcon className='hidden h-6 w-6 sm:inline' />
				<SearchIcon className='h-6 w-6' />
			</div>
		</header>
	);
};

export default Header;
