import Head from "next/head";
import React from "react";
import fetch from "isomorphic-unfetch";

export default class extends React.Component {
	static async getInitialProps({ req }) {
		const profileID = "bah";
		const API_KEY = "beh";

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

				<div>{this.props.elevation_gain}</div>
			</div>
		);
	}
}
