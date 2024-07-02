const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdmin } = require('../middleware/authMiddleware');

// Admin routes
router.post('/users', isAdmin, adminController.createUser);
router.get('/users', isAdmin, adminController.getUsers);
router.put('/users/:id', isAdmin, adminController.updateUser);
router.delete('/users/:id', isAdmin, adminController.deleteUser);

module.exports = router;
