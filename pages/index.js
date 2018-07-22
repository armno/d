import Head from 'next/head';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import config from '../config';
import Link from 'next/link';

export default class extends React.Component {
	static async getInitialProps({ req }) {
		const profileID = config.STRAVA_PROFILE_ID;
		const bikeID = config.STRAVA_BIKE_ID;
		const API_KEY = config.STRAVA_API_KEY;
		const after = config.BIKE_SINCE;

		const baseURL = `https://www.strava.com/api/v3/athlete/activities?after=${after}&per_page=200`;
		const res = await fetch(baseURL, {
			headers: {
				Authorization: `Bearer ${API_KEY}`
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
		console.table(summary);
		return {
			// elevation_gain: json.all_ride_totals.elevation_gain
		};
	}

	render() {
		return (
			<div>
				<Head>
					<title>D, for Doi</title>
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>
				<style global jsx>{`
					body {
						font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
							Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
						background-color: #5395ff;
						color: #fff;
					}
				`}</style>
				<Link href="/about">
					<div
						style={{
							fontSize: '3rem',
							fontWeight: 'bold',
							textAlign: 'center'
						}}
					>
						{/* {this.props.elevation_gain} */}
					</div>
				</Link>
			</div>
		);
	}
}
