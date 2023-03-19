import CHead from '@/components/CHead';
import DateCard from '@/components/DateCard';
import FlightTypeCard from '@/components/FlightTypeCard';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

import { getCookie, setCookie, getCookies, deleteCookie } from 'cookies-next';

const Flight = ({ users, flights, id, host, params }) => {
	const allFlights = flights.flights;
	const allUsers = users.users;
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

	let currF;
	for (let i = 0; i < allFlights.length; i++) {
		const flight = allFlights[i];
		if (flight.id === id) {
			currF = flight;
			break;
		}
	}

	return (
		<>
			<CHead title={'Flight Details'} />
			<Nav loggedIn={getCookie('loggedIn')} user={curr} />
			<div className=''>
				<div className='p-4 m-2'>
				{params?.ref ? (
					<a href={`/${params.ref}`} className=''>
						<button className='flex gap-2 p-2 m-2 font-bold text-blue-500 border border-blue-500 rounded-lg hover:text-blue-700 hover:border-blue-700 hover:gap-4'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
								class='feather feather-arrow-left'>
								<line x1='19' y1='12' x2='5' y2='12'></line>
								<polyline points='12 19 5 12 12 5'></polyline>
							</svg>
							Back
						</button>
					</a>
				) : (
					''
				)}

				<h1 className='m-2 text-2xl font-bold'>Flight Details</h1>
				<div className='grid grid-cols-1 gap-4 p-4 m-2 md:grid-cols-2 place-items-center'>
					<DateCard
						host={host}
						initId={id}
						initDate={currF.takeOff}
						initTitle={'Take Off'}
					/>
					<DateCard
						host={host}
						initId={id}
						initDate={currF.landing}
						initTitle={'Landing'}
					/>
					<div className='w-full h-full md:col-end-3 md:col-start-1'>
						<FlightTypeCard host={host} initId={id} type={currF.shipType} />
					</div>
				</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default Flight;

export async function getServerSideProps(context) {
	let fres = await fetch('https://orbitia.techlion.dev/api/flights', {
		method: 'GET',
	});
	let jres = await fres.json();
	let Ufres = await fetch('https://orbitia.techlion.dev/api/users', {
		method: 'GET',
	});
	let Ujres = await Ufres.json();
	return {
		props: {
			flights: jres,
			users: Ujres,
			id: context.query.id,
			params: context.query,
			host: context.req.headers.host,
		},
	};
}
