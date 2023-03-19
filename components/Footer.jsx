import Link from "next/link";

const Footer = () => {
	return (
		<footer className='text-gray-400 bg-gray-900'>
			<div className='container px-4 py-8 mx-auto lg:px-24 xl:px-48'>
				<div className='flex flex-wrap -mx-4'>
					<div className='w-full px-4 mb-8 md:w-1/2 lg:w-1/3'>
						<h3 className='mb-4 text-xl font-bold'>About Us</h3>
						<p className='mb-4 text-sm'>
							We are Orbitia, a company dedicated to helping people achieve
							their dream of becoming astronauts. Our mission is to make space
							accessible to everyone.
						</p>
						<p className='text-sm'>&copy; 2023 Orbitia. All rights reserved.</p>
					</div>
					<div className='w-full px-4 mb-8 md:w-1/2 lg:w-1/3'>
						<h3 className='mb-4 text-xl font-bold'>Links</h3>
						<ul className='list-none'>
							<li className='mb-2'>
								<Link href='/' className='text-sm text-gray-400 hover:text-white'>
									Home
								</Link>
							</li>
							<li className='mb-2'>
								<Link
									href='/about'
									className='text-sm text-gray-400 hover:text-white'>
									About Us
								</Link>
							</li>
							<li className='mb-2'>
								<Link
									href='/#services'
									className='text-sm text-gray-400 hover:text-white'>
									Our Services
								</Link>
							</li>
							<li className='mb-2'>
								<Link
									href='/#contact'
									className='text-sm text-gray-400 hover:text-white'>
									Contact Us
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
