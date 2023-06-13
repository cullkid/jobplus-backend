//importing functions and packages from their roots
const db = require("../config/database");

// create new user profile by assigning all the db profile name we are creating ...
//into the body(func) that is sent from controller
const createProfile = async (body) => {
  const { job_title, min_salary, job_type, experience, sector_id, user_id } =
    body;

  //insert profile into bd & check if user id already has profile
  const { rows } = await db.query("SELECT * FROM profiles WHERE user_id = $1", [
    user_id,
  ]);
  if (rows.length > 0) {
    //if the user id already have, then return error
    throw new Error("User already has a profile");
  }

  //insert db and create new profile if the user id don't have profile yet
  const profile = await db.query(
    "INSERT INTO profiles (job_title, min_salary, job_type, experience, sector_id, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [job_title, min_salary, job_type, experience, sector_id, user_id]
  );

  return profile.rows[0]; //return profile that is created
};

//edit profile
const editProfile = async (id, body) => {
  //sign in profile db name wanted to edit into body
  const { job_title, min_salary, job_type, experience, sector_id } = body;

  // check if profile id exists in profile db
  const { rows } = await db.query("SELECT * FROM profiles WHERE id = $1", [id]);
  if (!rows[0]) {
    throw new Error("Invalid id"); //return error if not exist
  }

  //insert the editing profile
  const { rows: editProfile } = await db.query(
    'UPDATE "profiles" SET job_title = $1, min_salary = $2, job_type = $3, experience = $4, sector_id = $5 WHERE id = $6 RETURNING *',
    [job_title, min_salary, job_type, experience, sector_id, id]
  );
  return editProfile[0]; //return the edited profile
};

// check if a job matches the user profile
const matchJobWithProfile = async (job) => {
  const { job_title, min_salary, job_type, experience, sector_id, user_id } =
    job;

  const { rows: profileRows } = await db.query(
    "SELECT * FROM profiles WHERE user_id = $1",
    [user_id]
  );

  if (profileRows.length === 0) {
    throw new Error("User doesn't have a profile");
  }

  const profile = profileRows[0];

  if (
    // profile.job_title === job_title &&
    profile.min_salary <= min_salary &&
    profile.job_type === job_type &&
    profile.experience <= experience &&
    profile.sector_id === sector_id
  ) {
    return true; // job matches the user profile
  } else {
    return false; // job doesn't match the user profile
  }
};

// export all the functions inside profile.service
module.exports = {
  createProfile,
  editProfile,
  matchJobWithProfile,
};
