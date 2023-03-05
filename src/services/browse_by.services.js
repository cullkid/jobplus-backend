//importing functions and packages from their roots
const db = require("../config/database");

// get all jobs in each sectors with count of total jobs in each sector
const getAllJobsInEachSectors = async () => {
  const sectors = await db.query(
    `SELECT s.id, s.name,
     COUNT(jobs.id) AS total_jobs
     
    FROM sectors s
    LEFT JOIN jobs ON jobs.sector_id = s.id
    GROUP BY s.id
    ORDER BY total_jobs ASC`
  );
  return sectors.rows;
};

//get all jobs in each locations with count of total jobs in each location
const getAllJobsInEachLocation = async () => {
  const locations = await db.query(
    `SELECT c.id, c.city, c.district, COUNT(jobs.id) AS total_jobs
    FROM companies c
    LEFT JOIN jobs ON jobs.company_id = c.id
    GROUP BY c.id
    ORDER BY total_jobs ASC`
  );
  return locations.rows;
};

// export all browse_by.service functions
module.exports = {
  getAllJobsInEachSectors,
  getAllJobsInEachLocation,
};
