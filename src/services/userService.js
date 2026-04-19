const User = require('../models/User');

const getUsers = async (query) => {
    const { page = 1, limit = 10 } = query;

    return await User.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-password');
};

const getUserById = async (id) => {
    return await User.findById(id).select('-password');
};

const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};