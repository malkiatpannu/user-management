const authService = require('../services/authService');

const register = async (req, res) => {
    const user = await authService.register(req.body);
    res.json({ success: true, data: user });
};

const login = async (req, res) => {
    const result = await authService.login(req.body);
    res.json({ success: true, data: result });
};

module.exports = {
    register,
    login
};