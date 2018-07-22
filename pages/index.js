import Head from 'next/head';
import React from 'react';
// import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import getBikeActivities from '../functions/getBikeActivities';

export default class extends React.Component {
	static async getInitialProps({ req }) {
		const summary = await getBikeActivities();
		console.table(summary);
		const sum = summary.map(s => s.elevation).reduce((prev, curr) => {
			return prev + curr;
		}, 0);
		console.log(`SUM: ${sum}`);
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
