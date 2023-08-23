const fs = require('fs');

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
  );

// ROUTE HANDLER FOR USERS
exports.getAllUsers = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
      status: 'success',
      requestAt: req.requestTime,
      // do this whenever u are sending multiple objects
      results: users.length,
      data: {
        users: users,
      },
    });
};

exports.getUser = (req, res) => {
    const id = req.params.id * 1; // Convert the parameter to a number
    console.log('Searching for user with ID:', id);
    const user = users.find((el) => el.id === id);

    if (!user) {
        res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                user: user
            }
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
      }
    );
};

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};