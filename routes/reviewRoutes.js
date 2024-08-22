const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

//  3: ROUTES FOR TOURS
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview,
  );

router.route('/:id')
.get(reviewController.getReview)
.patch(reviewController.updateReview)
.delete(reviewController.deleteReview);

module.exports = router;
