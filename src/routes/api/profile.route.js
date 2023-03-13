/* eslint-disable prefer-destructuring */
import express from 'express';
import * as profiles from '../../controllers/profileController';


const profileRoute = express.Router();

profileRoute.patch('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  try {
    profiles.default.updateProfile(userId, req.body, res, next);
  } catch (error) {
    res.status(500).json({
      'Error Message:': 'An Error Has Occured, Try Again!',
      Error: error
    });
    next(error);
  }
});

profileRoute.get('/:userId', (req, res, next) => {
  const userId = req.params.userId;
  try {
    profiles.default.getProfile(userId, res, next);
  } catch (error) {
    res.status(500).json({
      'Error Message:': 'An Error Has Occured, Try Again!',
      Error: error
    });
    next(error);
  }
});
export default profileRoute;