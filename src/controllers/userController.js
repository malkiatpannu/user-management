const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const userService = require('../services/userService');

const getUsers = asyncHandler(async (req, res) => {
    const users = await userService.getUsers(req.query);
    res.json({ success: true, data: users });
});

const getUser = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    res.json({ success: true, data: user });
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    res.json({ success: true, data: user });
});

const deleteUser = asyncHandler(async (req, res) => {
    const deleted = await userService.deleteUser(req.params.id);

    if (!deleted) {
        throw new AppError("User not found", 404);
    }
    res.json({ success: true, message: "User deleted" });
});

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
};