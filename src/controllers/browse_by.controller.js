//importing functions and packages from their roots
const browseByServices = require("../services/browse_by.services");

const getAllJobsInEachSectors = async (req, res) => {
  try {
    const sectors = await browseByServices.getAllJobsInEachSectors();
    res.status(200).json({ data: sectors });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /browse-by/locations
const getAllJobsInEachLocation = async (req, res) => {
  try {
    const locations = await browseByServices.getAllJobsInEachLocation();
    res.status(200).json({ data: locations });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export all browse-by.controller functions
module.exports = {
  getAllJobsInEachSectors,
  getAllJobsInEachLocation,
};
