//importing functions and packages from their roots
const db = require("../config/database");

// get all user profiles matching job
const getAllMatchJobProfiles = async (job) => {
  const { job_types, title, salary, sector_id } = job;

  const profiles = await db.query(
    //to get a created jobs that matches the user profile jobs which wil send the user ..
    //a job notification, we have to go into user profile and select all user profile ..
    //db will have things in common with the getAllMatchJobProfiles db by : ..
    //if the gAMJP job-type db match/contain(@>) one of the profiles job-type db values;
    //if the gAMJP job-tittle db is like/exactly(iLIKE) the profiles job-tittle db value;
    //if gAMJP salary db is (<=) the profiles min-salary db value;
    //if gAMJP sectorid is (=) the profile sectorid db value carrying others correct values;
    //then it means a user match job is found/created
    `
    SELECT * 
    FROM "profiles" 
    WHERE job_type @> $1 
    AND job_title iLIKE $2 
    AND min_salary <= $3 
    AND sector_id = $4
    `,
    [job_types, title, salary, sector_id]
  );

  return profiles.rows;
};

//sending a user profile a notification of jobs that matchs his/her profiles
const sendMatchJobsToUserProfiles = async (job) => {
  //asign profile to 'getAllMatchJobProfiles' which contains all matched jobs
  const profiles = await getAllMatchJobProfiles(job);

  //set 'Notification' as a 'job-type'
  const type = "Notification";

  //return nothing if there is no matched jobs
  if (!profiles.length) {
    return;
  }

  //maping throw all profiles matched job and return those values
  const notifications = profiles.map((profile) => {
    return `('${profile.user_id}', '${job.id}', '${"Notification"}')`;
  });

  //going into user-jobs db to get those db values to match the notifications values
  await db.query(
    `INSERT INTO "user_jobs" (user_id, job_id, type) VALUES ${notifications.join(
      ", "
    )}`
  );
};

//export all notification.services functions
module.exports = {
  getAllMatchJobProfiles,
  sendMatchJobsToUserProfiles,
};
