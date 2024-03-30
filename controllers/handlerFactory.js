exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.deleteOne(req.params.id, req.body);

  if(!doc){
    return next(new AppError('No document found with that ID', 404))
  }

    // respond status code
    res.status(204).json({
      status: 'success',
      data: {
        tour,
      },
    });
});

