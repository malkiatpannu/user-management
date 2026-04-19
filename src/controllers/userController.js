const userService = require('../services/userService');

const getUsers = async (req, res) => {
    const users = await userService.getUsers(req.query);
    res.json({ success: true, data: users });
};

const getUser = async (req, res) => {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, data: user });
};

const updateUser = async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ success: true, data: user });
};

const deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id);
    res.json({ success: true, message: "User deleted" });
};

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser
};