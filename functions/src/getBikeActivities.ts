import config from './config';
import * as request from 'request-promise-native';

export default async function() {
	const bikeID = config.STRAVA_BIKE_ID;
	const apiKey = config.STRAVA_API_KEY;
	const after = config.BIKE_SINCE;
	const perPage = config.PER_PAGE;
	const baseURL = `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=${perPage}`;
	const requestOptions = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${apiKey}`
		},
		json: true,
		uri: baseURL
	};

	try {
		const activities = await request(requestOptions);
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

		return Promise.resolve(summary);
	} catch (error) {
		return Promise.reject(error);
	}
}
