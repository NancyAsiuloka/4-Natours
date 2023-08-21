const express = require('express');
const tourController = require('./../controllers/tourController');


// 3: ROUTES FOR TOURS

const router = express.Router();

router.param('id', tourController.checkID);

router
.route('/')
.get(tourController.getAllTours)
.post(tourController.createTour);

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = router;