//insert profile into bd & check if user id already has profile
const profileServices = require("../services/profile.services");

//create profile
const createProfile = async (req, res) => {
  try {
    //sign the db name to be create into body(func), the ...req.body means shortcut to write all other profile db name to be create
    const body = { ...req.body, user_id: req.user.id };

    //creating new profile and send it to service throgh req & body(func)
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
    const { id } = req.params; //send req of profile id to change to service
    const body = req.body; //send req of new body that replace exist one to service

    //send a request of id & body to the service
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
    res.status(200).send({ data: isMatch });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
console.log(isMatch);

// export all the functions inside profile.controller
module.exports = {
  createProfile,
  editProfile,
  matchJobWithProfile,
};
