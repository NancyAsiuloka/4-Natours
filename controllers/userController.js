const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach(el => {
    if(allowedFields.includes(el)) newObj[el] =obj[el]
  });
return newObj;
}

exports.deleteMe = catchAsync(async(req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {active: false})

  res.status(204).json({
    status: 'Success',
    data: null
  })
})

// ROUTE HANDLER FOR USERS
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // Send Response
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    // do this whenever u are sending multiple objects
    results: users.length,
    data: {
      users: users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update. Please use /updateMyPassword',
        400,
      ),
    );
  }
// 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 2) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.getUser = (req, res) => {
  const id = req.params.id * 1; // Convert the parameter to a number
  console.log('Searching for user with ID:', id);
  const user = users.find((user) => user.id === id);
  console.log(user);

  if (!user) {
    res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        user: user,
      },
    });
  }
};

exports.createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);

  users.push(newUser);

  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          user: newUser,
        },
      });
    },
  );
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
