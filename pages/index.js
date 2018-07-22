import Head from 'next/head';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import config from '../config';
import Link from 'next/link';

export default class extends React.Component {
	static async getInitialProps({ req }) {
		const profileID = config.STRAVA_PROFILE_ID;
		const API_KEY = config.STRAVA_API_KEY;

		const baseURL = `https://www.strava.com/api/v3/athletes/${profileID}/stats`;
		const res = await fetch(baseURL, {
			headers: {
				Authorization: `Bearer ${API_KEY}`
			}
		});
		const json = await res.json();
		return {
			elevation_gain: json.all_ride_totals.elevation_gain
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
					}
				`}</style>
				<Link href="/about">
					<div
						style={{
							fontSize: '3rem',
							fontWeight: 'bold',
							color: '#444',
							textAlign: 'center'
						}}
					>
						{this.props.elevation_gain}
					</div>
				</Link>
			</div>
		);
	}
}
