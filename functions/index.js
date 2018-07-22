const functions = require('firebase-functions');
const getBikeActivities = require('./getBikeActivities');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.getBikeActivities = functions.https.onRequest((req, res) => {
	const summary = await getBikeActivities();
	res.send(summary)
});
