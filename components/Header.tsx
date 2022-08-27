import React, { useEffect, useState } from 'react';
import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';

const Header = () => {
	const [scroll, setScroll] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			//Adds background colour to navbar when scrolled down
			if (window.scrollY > 0) {
				setScroll(true);
			} else {
				setScroll(false); //Removes background colour if at very top of page
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
				{/* Netflix Logo */}
				<Link href='/'>
					<img
						src='https://rb.gy/ulxxee'
						width={100}
						height={100}
						className='cursor-pointer object-contain'
					/>
				</Link>

				<ul className='hidden space-x-4 md:flex'>
					{/* Link to homepage */}
					<Link href='/'>
						<li className='headerLink'>Home</li>
					</Link>

					{/* Link to movies page */}
					<Link href='/movies'>
						<li className='headerLink'>Movies</li>
					</Link>

					{/* Link to trending movies page */}
					<Link href='/trending'>
						<li className='headerLink'>New & Popular</li>
					</Link>
				</ul>
			</div>

			<div className='flex items-center space-x-4 text-sm font-light cursor-pointer'>
				<SearchIcon className='h-6 w-6' />
				<BellIcon className='hidden h-6 w-6 sm:inline cursor-pointer' />
			</div>
		</header>
	);
};

export default Header;
