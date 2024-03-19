const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const reviews = require('./../controllers/reviewController');

const router = express.Router();

// ROUTES FOR USERS
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch(
  '/updateMe',
  authController.protect,
  userController.updateMe
);

router.delete(
  '/deleteMe',
  authController.protect,
  userController.deleteMe
);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

  // POST /tour/2aedrteu7/reviews
  // GET /tour/2aedrteu7/reviews
  // GET /tour/2aedrteu7/reviews/4yu79i635

  router.route('/:id/reviews')

module.exports = router;
