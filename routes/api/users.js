const express = require('express');

const { Router } = express;

const router = Router();
const userController = require('../../controllers/userController');

/**
 * GET / : Get all users
 */
router.get('/', userController.userList);

/**
 * PUT / : Add an user
 */
router.put('/', userController.addUser);

/**
 * GET / : Get a single user
 */
router.get('/:id', userController.getUser);

module.exports = router;
