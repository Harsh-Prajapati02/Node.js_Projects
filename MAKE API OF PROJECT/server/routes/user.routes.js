const express = require('express');
const auth = require('../middleware/auth');
const { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/user.controllers');
const role = require('../middleware/role');
const log = require('../middleware/log');
const router = express.Router();

router.use(log)
// User routes
router.post('/register',registerUser);
router.post('/login', loginUser);

// Protected routes (Admin-only)
router.use(auth,role);
router.get('/admin', getAllUsers);
router.get('/admin/:id',getUserById);
router.patch('/admin/:id', updateUser);
router.delete('/admin/:id', deleteUser);

module.exports = router;
