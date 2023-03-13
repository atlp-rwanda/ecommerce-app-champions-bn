/* eslint-disable consistent-return */
import * as profileService from '../services/profile.service';
import createProfile from '../validations/profileValidation';


const updateProfile = async (userId, req, res, next) => {
  try {
    const validate = createProfile.validate(req.body);
    if (!validate.error) {
      const profile = await profileService.findUserProfile(userId);
      if (profile) {
        const updatedProfile = await profileService.updateProfile(
          userId,
          req.Body
        );
        if (updatedProfile) {
          return res.status(200).json({
            status: 200,
            data: { Message: 'Profile updated successfully' }
          });
        }
      } else {
        return res.status(401).json({
            status: 404,
            data: { Message: 'Profile not found' }
          });
      }
    } 
  }
  catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
 
};

const getProfile = async (userId, res, next) => {
  try {
    const profile = await profileService.findUserProfile(userId);
    if (profile) {
      res.json({ message: 'Profile Found', data: profile });
    } else {
      res.json({ message: 'Cant find profile of the user' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

export default { updateProfile, getProfile };