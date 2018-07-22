// import config from '../config';
const config = require('../config');

async function getBikeActivities() {
	const bikeID = config.STRAVA_BIKE_ID;
	const apiKey = config.STRAVA_API_KEY;
	const after = config.BIKE_SINCE;
	const perPage = config.PER_PAGE;
	const baseURL = `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=${perPage}`;
	const res = await fetch(baseURL, {
		headers: {
			Authorization: `Bearer ${apiKey}`
		}
	});
	const activities = await res.json();
	const activitiesByBike = activities.filter(activity => {
		return activity.gear_id === bikeID && activity.type === 'Ride';
	});
	const summary = activitiesByBike.map(activity => {
		return {
			id: activity.id,
			name: activity.name,
			elevation: activity.total_elevation_gain,
			distance: activity.distance,
			time: activity.elapsed_time
		};
	});

	return summary;
}

module.exports.getBikeActivities = getBikeActivities;
