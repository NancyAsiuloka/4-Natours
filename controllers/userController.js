// ROUTE HANDLER FOR USERS
exports.getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
    });
};

exports.getUser = (req, res) => {
    const id = req.params.id * 1; //converting strings to number
    const user = user.find((el) => el.id === id);

    // if (!tour) {
    //     return res.status(404).json({
    //       status: 'fail',
    //       message: 'Invalid id',
    //     });
    if(!user) {
        res.status(500).json({
            status: 'error',
            message: 'This route is not yet defined!'
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