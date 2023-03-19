const Contact = () => {
	return (
		<>
			<section id='contact' className='py-12 bg-gray-100'>
				<div className='container px-4 mx-auto lg:px-24 xl:px-48'>
					<div className='mb-12 text-center'>
						<h2 className='mb-2 text-4xl font-bold'>Contact Us</h2>
						<p className='text-gray-600'>We&apos;d love to hear from you!</p>
					</div>
					<div className='flex flex-wrap -mx-4'>
						<div className='w-full px-4 mb-8 lg:w-1/2'>
							<h3 className='mb-4 text-xl font-bold'>Get in Touch</h3>
							<p className='mb-4 text-sm'>
							If you have any questions or comments about our products or services, or if you just want to say hello, we&apos;d love to hear from you! Our team is always happy to help, and we&apos;ll do our best to get back to you as quickly as possible.
							</p>
							<p className='text-sm'>123 Main Street</p>
							<p className='text-sm'>Anytown, USA 12345</p>
							<p className='text-sm'>Phone: (555) 555-5555</p>
							<p className='text-sm'>Email: orbitia@techlion.dev</p>
						</div>
						<div className='w-full px-4 mb-8 lg:w-1/2'>
							<h3 className='mb-4 text-xl font-bold'>Office Hours</h3>
							<ul className='list-none'>
								<li className='mb-2'>
									<span className='text-sm font-bold'>Monday - Friday:</span>{' '}
									<span className='text-sm'>9:00am - 5:00pm</span>
								</li>
								<li className='mb-2'>
									<span className='text-sm font-bold'>Saturday:</span>{' '}
									<span className='text-sm'>10:00am - 3:00pm</span>
								</li>
								<li className='mb-2'>
									<span className='text-sm font-bold'>Sunday:</span>{' '}
									<span className='text-sm'>Closed</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Contact;
