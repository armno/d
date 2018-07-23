import * as functions from 'firebase-functions';
import getActivities from './getBikeActivities';

export const getBikeActivities = functions.https.onRequest(async (req, res) => {
	const summary = await getActivities();
	res.send(summary);
});
