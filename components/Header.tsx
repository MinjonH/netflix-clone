import React, { useEffect, useState } from 'react';
import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';

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
				<Link href='/'>
					<img
						src='https://rb.gy/ulxxee'
						width={100}
						height={100}
						className='cursor-pointer object-contain'
					/>
				</Link>
				<ul className='hidden space-x-4 md:flex'>
					<Link href='/'>
						<li className='headerLink'>Home</li>
					</Link>
					<Link href='/movies'>
						<li className='headerLink'>Movies</li>
					</Link>
					<Link href='/trending'>
						<li className='headerLink'>New & Popular</li>
					</Link>
				</ul>
			</div>

			{/* <div className='flex items-center space-x-4 text-sm font-light cursor-pointer'>
				<BellIcon className='hidden h-6 w-6 sm:inline cursor-pointer' />
				<SearchIcon className='h-6 w-6' />
			</div> */}
		</header>
	);
};

export default Header;
