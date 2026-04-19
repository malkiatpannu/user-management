const AppError = require('../utils/AppError');
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("Forbidden, require role:"+roles, 403)); 
        }
        next();
    };
};

module.exports = authorize;