const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const auth = (req, res, next) => {
    const header = req.headers.authorization;


    if (!header || !header.startsWith('Bearer ')) {
        return next(new AppError("Unauthorized, no token", 401));
    }

    const token = header.split(' ')[1];
    if (!token) {
        return next(new AppError("Unauthorized, malformed token", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach user info
        next();
    } catch (err) {
        return next(new AppError("Unauthorized, invalid token", 401));
    }
};

module.exports = auth;