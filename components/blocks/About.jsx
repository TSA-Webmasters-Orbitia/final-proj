import React from 'react';

const About = () => {
	return (
		<section className="py-8 text-lg bg-white">
      <div className="container flex flex-col items-center px-4 mx-auto lg:px-24 xl:px-48">
        <h2 className="mb-4 text-4xl font-bold">About Orbitia</h2>
        <p className="max-w-xl mb-8 text-center text-gray-600">
          Orbitia is a company that provides astronaut services, including astronaut training, space tourism, and astronaut recruitment.
        </p>
        <p className="max-w-xl mb-8 text-center text-gray-600">
          Our mission is to make space accessible to everyone, and we believe that with the right training and expertise, anyone can become an astronaut.
        </p>
        <p className="max-w-xl mb-8 text-center text-gray-600">
          Our team includes experienced astronauts, engineers, and space enthusiasts who are passionate about exploring the final frontier.
        </p>
      </div>
    </section>
	);
};

export default About;
