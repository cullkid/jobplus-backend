// const express = require("express");
// const router = express.Router();
// const webpush = require("web-push");

// // Set vapid details
// const vapidKeys = {
//   publicKey: process.env.VAPID_PUBLIC_KEY,
//   privateKey: process.env.VAPID_PRIVATE_KEY,
// };

// webpush.setVapidDetails(
//   "mailto:test@test.com",
//   vapidKeys.publicKey,
//   vapidKeys.privateKey
// );

// // Store all subscriptions
// const subscriptions = [];

// // Add new subscription
// router.post("/", (req, res) => {
//   const subscription = req.body;
//   subscriptions.push(subscription);
//   console.log(`New subscription added: ${subscription.endpoint}`);
//   res.status(201).json({});
// });

// // Send notification to all subscribers
// router.post("/send", (req, res) => {
//   const notificationPayload = {
//     notification: {
//       title: "New Job Listing",
//       body: "A new job has been posted!",
//       icon: "assets/images/logo.png",
//       vibrate: [100, 50, 100],
//       data: {
//         dateOfArrival: Date.now(),
//         primaryKey: 1,
//       },
//       actions: [
//         {
//           action: "explore",
//           title: "View Job",
//         },
//       ],
//     },
//   };

//   Promise.all(
//     subscriptions.map((subscription) =>
//       webpush.sendNotification(
//         subscription,
//         JSON.stringify(notificationPayload)
//       )
//     )
//   )
//     .then(() => {
//       res.status(200).json({});
//     })
//     .catch((err) => {
//       console.error("Error sending notification, reason: ", err);
//       res.sendStatus(500);
//     });
// });

// // Set up WebSocket connection to receive real-time updates
// router.ws("/", (ws, req) => {
//   console.log("WebSocket connection established.");
//   const intervalId = setInterval(() => {
//     ws.send(JSON.stringify({ message: "ping" }));
//   }, 60000);

//   ws.on("close", () => {
//     console.log("WebSocket connection closed.");
//     clearInterval(intervalId);
//   });
// });

// module.exports = router;
