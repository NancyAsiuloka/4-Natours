const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.deleteOne({id: req.params.id});
    console.log(doc)
  if(!doc){
    return next(new AppError('No document found with that ID', 404))
  }

    // respond status code
    res.status(204).json({
      status: 'success',
      data: null
    });
});
