const fs = require('fs');

const users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
  );

// ROUTE HANDLER FOR USERS
exports.getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

exports.getUser = (req, res) => {
    const id = req.params.id * 1; // Convert the parameter to a number
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
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
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