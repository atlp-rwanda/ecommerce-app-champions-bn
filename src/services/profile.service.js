/* istanbul ignore file */
const { Buyer } = require('../database/models');

const findUserProfile = async (userId) => {
  const Profile = await  Buyer.findOne({ where: { UserId: userId } });
  if (!Profile) {
    throw new Error(`Profile not found for userId ${userId}`);
  }
  return Profile;
};

const updateProfile = async (userId, data) => {
  const Profile = await  Buyer.findOne({ where: { UserId: userId } });
  if (!Profile) {
    throw new Error(`Profile not found for userId ${userId}`);
  }

  const updatedProfile = {
    ...Profile.toJSON(),
    ...data,
  };

  try {
    await Profile.update(updatedProfile);
    return await findUserProfile(userId);
  } catch (error) {
    throw new Error(`Failed to update profile for userId ${userId}: ${error.message}`);
  }
};

export { findUserProfile, updateProfile };
