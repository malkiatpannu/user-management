const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

const {
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.get('/', auth, authorize('admin'), getUsers);
router.get('/:id', auth, getUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, authorize('admin'), deleteUser);

module.exports = router;