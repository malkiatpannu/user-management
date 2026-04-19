const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (data) => {
    const existing = await User.findOne({ email: data.email });
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await User.create({
        ...data,
        password: hashed
    });

    return user;
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    return { user, token };
};

module.exports = {
    register,
    login
};