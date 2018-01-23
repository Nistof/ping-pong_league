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

/**
 * GET /win/id : Get number of win
 */
router.get('/win/:id', userController.getWin);

/**
 * GET /lose/id : Get number of lose
 */
router.get('/lose/:id', userController.getLose);

/**
 * GET /points/id : Get number of points
 */
router.get('/points/:id', userController.getUserPoints);

module.exports = router;
