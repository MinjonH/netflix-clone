import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

interface Inputs {
	email: string;
	password: string;
}

function login() {
	const [login, setLogin] = useState(false);
	const { signIn, signUp } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
		if (login) {
			await signIn(email, password);
		} else {
			await signUp(email, password);
		}
	};

	return (
		<div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
			<Head>
				<title>Home | Netflix</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Image
				src='https://rb.gy/p2hphi'
				layout='fill'
				className='-z-10 !hidden opacity-60 sm:!inline'
				objectFit='cover'
			/>

			<img
				src='https://rb.gy/ulxxee'
				width={150}
				height={150}
				className='cursor-pointer object-contain absolute left-4 top-4 md:left-10 md:top-6'
			/>
			<form
				/* "handleSubmit" will validate your inputs before invoking "onSubmit" */
				onSubmit={handleSubmit(onSubmit)}
				className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
			>
				<h1 className='text-4xl font-semibold'>Sign In</h1>
				<div className='space-y-4'>
					<label className='inline-block w-full'>
						<input
							className='input'
							type='email'
							placeholder='Email'
							{...register('email', { required: true })}
						/>
						{errors.email && (
							<p className='p-1 text-[13px] font-light text-orange-500'>
								Please enter a valid email.
							</p>
						)}
					</label>
					<label className='inline-block w-full'>
						<input
							className='input'
							type='password'
							placeholder='Password'
							{...register('password', { required: true })}
						/>
						{errors.password && (
							<p className='p-1 text-[13px] font-light text-orange-500'>
								Your password must contain between 4 and 60 characters.
							</p>
						)}
					</label>
				</div>
				<button
					className='w-full rounded bg-[#e50914] py-3 font-semibold'
					onClick={() => setLogin(true)}
				>
					Sign In
				</button>

				<div className='text-[grey]'>
					New to Netflix?{' '}
					<button
						type='submit'
						className='text-white hover:underline'
						onClick={() => setLogin(false)}
					>
						Sign Up Now
					</button>
				</div>
			</form>
		</div>
	);
}

export default login;
function signIn(email: string, password: string) {
	throw new Error('Function not implemented.');
}

function signUp(email: string, password: string) {
	throw new Error('Function not implemented.');
}
