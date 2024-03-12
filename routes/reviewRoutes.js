const express = require('express');
const reviewController = require('./../controllers/reviewController')

// 3: ROUTES FOR TOURS
const router = express.Router();

router
  .route('/')
  .get(authController.protect, reviewController.getAllReviews)
  .post(reviewController.createReview);


  module.exports = router;