const { profile } = require('../database/models');

const addProfile = async (newProfile) => {
  const Profile = await profile.create(newProfile);
  return Profile;
};
const findUserProfile = async (userId) => {
  const Profile = await profile.findOne({ where: { userId: `${userId}` } });
  if (Profile) {
    return Profile;
  }
};
const updateProfile = async (userId, data) => {
  const Profile = await profile.findOne({ where: { userId: `${userId}` } });
  Profile.country = data.country;
    Profile.gender = data.gender;
    Profile.birthDate= data.birthDate;
    Profile.businessName = data.businessName;
    Profile.location = data.location;
    Profile.state = data.state;
    Profile.city = data.city;
    Profile.businessAddress = data.businessAddress;
    Profile.taxIdNumber = data.taxIdNumber;
    Profile.typeOfProduct= data.typeOfProduct;
   

  await Profile.save();

  return Profile;
};
export { addProfile, findUserProfile, updateProfile };


