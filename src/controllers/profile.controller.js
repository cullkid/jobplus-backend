//import
const profileServices = require("../services/profile.services");

//create profile
const createProfile = async (req, res) => {
  try {
    const body = { ...req.body, user_id: req.user.id };

    const newProfile = await profileServices.createProfile(body);
    res
      .status(201)
      .send({ message: "Profile created successfully", newProfile });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//edit existdb profile
const editProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const editProfile = await profileServices.editProfile(id, body);
    res
      .status(200)
      .send({ message: "Profile updated successfully", editProfile });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// check if a job matches the user profile
const matchJobWithProfile = async (req, res) => {
  try {
    const job = req.body;
    const isMatch = await profileServices.matchJobWithProfile(job);
    console.log(isMatch);
    res.status(200).send({ data: isMatch });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// export
module.exports = {
  createProfile,
  editProfile,
  matchJobWithProfile,
};
