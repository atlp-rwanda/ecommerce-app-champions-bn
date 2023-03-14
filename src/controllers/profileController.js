import { Router } from 'express';
import * as profiles from '../services/profile.service';
import profileValidation from '../validations/profileValidation';

const profilerouter = Router();

profilerouter.put('/profiles/:userId', profileValidation, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const requestBody = req.body;
    const profile = await profiles.findUserProfile(userId);
    if (profile) {
      const updatedProfile = await profiles.updateProfile(userId, requestBody);
      if (updatedProfile) {
        return res.status(200).json({ status: 200, data: { Message: 'Profile updated successfully' } });
      } 
    } else {
      return res.status(401).json({ status: 404, data: { Message: 'Profile not found' } });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
});

profilerouter.get('/profiles/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const profile = await profiles.findUserProfile(userId);
    if (profile) {
      res.json({ message: 'Profile Found', data: profile });
    } else {
      res.json({ message: 'Cant find profile of the user' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
});

export default profilerouter;
