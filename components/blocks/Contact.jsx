import emailjs from "@emailjs/browser";
const Contact = () => {
    async function sendContactEmail(e) {
        e.preventDefault();

    emailjs
      .send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Jeremiah",
          from_email: form.email,
          to_email: "jeremiahis@techlion.dev",
          message: form.message,
        },
        process.env.EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Thank you. I will get back to you as soon as possible.");
        },
        (error) => {
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
    }
	return (
		<>
			<section className='py-20 '>
				<div className='container px-4 mx-auto lg:px-24 xl:px-48'>
					<h2 className='mb-8 text-4xl font-bold text-center'>Contact Us</h2>
					<div className='flex flex-wrap -mx-4'>
						<div className='w-full px-4 mb-8 md:w-1/2'>
							<h3 className='mb-4 text-2xl font-bold'>Get in Touch</h3>
							<p className='mb-4 text-gray-600 '>
								If you have any questions about our services or would like to
								learn more about becoming an astronaut, please fill out the form
								below and we&apos;ll get back to you as soon as possible.
							</p>
							<form onSubmit={sendContactEmail}>
								<div className='mb-4'>
									<label htmlFor='name' className='block mb-2 text-gray-600'>
										Name
									</label>
									<input
										type='text'
										id='name'
										name='name'
										className='w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500'
									/>
								</div>
								<div className='mb-4'>
									<label htmlFor='email' className='block mb-2 text-gray-600'>
										Email
									</label>
									<input
										type='email'
										id='email'
										name='email'
										className='w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500'
									/>
								</div>
								<div className='mb-4'>
									<label htmlFor='message' className='block mb-2 text-gray-600'>
										Message
									</label>
									<textarea
										id='message'
										name='message'
										className='w-full p-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500'></textarea>
								</div>
								<div className='text-center'>
									<button
										type='submit'
										className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'>
										Submit
									</button>
								</div>
							</form>
						</div>
						<div className='w-full px-4 md:w-1/2'>
							<h3 className='mb-4 text-2xl font-bold'>Visit Us</h3>
							<p className='mb-4 text-gray-600'>
								You can also visit our headquarters in Houston, Texas to learn
								more about our services and meet our team of astronauts and
								space enthusiasts.
							</p>
							<p className='mb-4 text-gray-600'>
								<strong>Address:</strong> 123 Main St, Houston, TX 77002
							</p>
							<p className='mb-4 text-gray-600'>
								<strong>Phone:</strong> 555-123-4567
							</p>
							<p className='mb-4 text-gray-600'>
								<strong>Email:</strong> orbitia@techlion.dev
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Contact;
