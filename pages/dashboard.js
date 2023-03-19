import CHead from '@/components/CHead';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Table from '@/components/Table';

import { getCookie, setCookie, getCookies, deleteCookie } from 'cookies-next';

const Dashboard = ({ users, flights, host }) => {
	if (typeof window !== 'undefined') {
		if (getCookie('loggedIn') !== true) {
			window.location.href = '/';
		}
	}

	const allUsers = users.users;
	const allFlights = flights.flights;
	let curr;
	if (getCookie('loggedIn')) {
		for (let i = 0; i < allUsers.length; i++) {
			const user = allUsers[i];
			if (user.id === getCookie('userId')) {
				curr = user;
				break;
			}
		}
	} else {
		curr = undefined;
	}
	let currFlights = [];
	return (
		<>
			<CHead title={'Astronaut Dashboard'} />
			<Nav loggedIn={getCookie('loggedIn')} user={curr} />
			<div className=''>
				<div className='p-4 m-2 h-[60vh]'>
					<h1 className='text-2xl font-bold'>Dashboard</h1>
					<div className='flex gap-6 my-4'>
						{/* Dashboard Action buttons */}
						<a href='apply'>
							<button className='px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700'>
								New Flight
							</button>
						</a>
					</div>
					<div>
						<div className='flex flex-col gap-4 m-2'>
							{/* Table Of Flights */}
							{allFlights.map((flight) => {
								if (flight.astronautId === curr?.id) {
									currFlights.push(flight);
								}
							})}
							{currFlights.length > 0 ? (
								<>
									<h1 className='text-xl font-semibold'>My Flights</h1>
									<div className='overflow-x-auto rounded-lg'>
										<Table rows={currFlights} />
									</div>
								</>
							) : (
								''
							)}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Dashboard;

export async function getServerSideProps(context) {
	let Ufres = await fetch('https://orbitia.techlion.dev/api/users', {
		method: 'GET',
	});
	let Ujres = await Ufres.json();
	let Ffres = await fetch('https://orbitia.techlion.dev/api/flights', {
		method: 'GET',
	});
	let Fjres = await Ffres.json();
	return {
		props: {
			users: Ujres,
			flights: Fjres,
			host: context.req.headers.host,
		},
	};
}
