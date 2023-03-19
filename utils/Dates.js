import moment from "moment/moment";

/**
 *
 * @param {Date} start The Date That The Countdown Should Start From
 * @param {Date} end   The Date That The Countdown Should End At
 */
export function getHumanFriendlyDateDifferance(start, end) {
	let diff = timeDiff(start, end);
	let local = localize(...diff);
	return local;
}

/**
 * Calculate the difference between two dates.
 * @param {Date} date1 first date
 * @param {Date} date2 second date
 * @return {[number, string]} array containing the difference and the time unit of measure
 */
function timeDiff(date1, date2) {
	const timeIntervals = [31536000, 2628000, 604800, 86400, 3600, 60, 1];
	const intervalNames = [
		'year',
		'month',
		'week',
		'day',
		'hour',
		'minute',
		'second',
	];
	const diff = Math.abs(date2.getTime() - date1.getTime()) / 1000;
	const index = timeIntervals.findIndex((i) => diff / i >= 1);
	const n = Math.floor(diff / timeIntervals[index]);
	const interval = intervalNames[index];
	let fut = date1 < date2;
	return [n, interval, fut];
}
/**
 * Format a date difference into a string.
 * @param {number} value numeric value
 * @param {string} str time unit
 * @return {string} value and unit, taking plurals into account
 */
function localize(value, str, fut) {
	if (value != 1) str += 's';

	return fut ? `in ${value} ${str}` : `${value} ${str} ago`;
}

export function getFormattedDate(JSON_DATE) {
  const relative = moment(JSON_DATE).fromNow();
  let formatted = moment(JSON_DATE).format("MMMM D, YYYY @ hh:mm A");
	return (
		<div className='flex flex-col items-center justify-center gap-4 group'>
			<p>{relative}</p>
			<span className='fixed hidden p-2 text-sm text-gray-100 transition-opacity bg-gray-800 rounded-md group-hover:flex'>
				{formatted}
			</span>
		</div>
	);
}
