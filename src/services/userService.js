const User = require('../models/User');
const redis = require('../config/redis');

const getUsers = async (query) => {
    const cacheKey = `users:${JSON.stringify(query)}`;
    const cached = await redis.get(cacheKey);
    if (cached){
        console.log('Cache hit');
        return JSON.parse(cached);
    } 
    console.log('Cache miss');

    const { page = 1, limit = 10 } = query;

    const users = await User.find()
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .select('-password');

    await redis.set(cacheKey, JSON.stringify(users), 'EX', 60);
    return users;
};

const getUserById = async (id) => {
    return await User.findById(id).select('-password');
};

const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

const deleteUser = async (id) => {
    const deleted = await User.findByIdAndDelete(id);
    await redis.flushall();
    return deleted;
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};