// maping through the matchingProfillesconst notificationJobs =
// matchingProfiles.map((profile) => ({
//   id: profile.id,
//   salary: profile.min_salary,
//   title: profile.job_title,
//   user_id: profile.user_id,
//   secto_id: profile.sector_id,
//   experience: profile.experience,
//   job_type: profile.job_type,
//   created_at: profile.created_at,
//   updated_at: profile.updated_at,
// }));
// console.log("matchedJobs", matchingProfiles, job);

//  const newNotificationJob = await notificationJobs.insertMany(
//     notificationJobs
// );

// // get all user profiles matching job
// const getAllMatchJobProfiles = async (job) => {
//   const { job_types, title, salary, sector_id } = job;

//   const profiles = await db.query(
//     `
//     SELECT *
//     FROM "profiles"
//     WHERE job_type @> $1
//     AND job_title iLIKE $2
//     AND min_salary <= $3
//     AND sector_id = $4
//     `,
//     [job_types, title, salary, sector_id]
//   );

//   return profiles.rows;
// };

// //sending a user profile a notification of jobs that matchs his/her profiles
// const sendMatchJobsToUserProfiles = async (job) => {
//   //asign profile to 'getAllMatchJobProfiles' which contains all matched jobs
//   const profiles = await getAllMatchJobProfiles(job);

//   //set 'Notification' as a 'job-type'
//   const type = "Notification";

//   //return nothing if there is no matched jobs
//   if (!profiles.length) {
//     return;
//   }

//   //maping throw all profiles matched job and return those values
//   const notifications = profiles.map((profile) => {
//     return `('${profile.user_id}', '${job.id}', '${"Notification"}')`;
//   });

//   //going into user-jobs db to get those db values to match the notifications values
//   await db.query(
//     `INSERT INTO "user_jobs" (user_id, job_id, type) VALUES ${notifications.join(
//       ", "
//     )}`
//   );
// };
