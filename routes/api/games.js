const express = require('express');

const { Router } = express;

const router = Router();
const gameController = require('../../controllers/gameController');

/**
 * GET / : Get all games
 */
router.get('/', gameController.gameList);

/**
 * PUT / : Add a game
 */
router.put('/', gameController.addGame);

/**
 * GET /id : Get a single game
 */
router.get('/:id', gameController.getGame);

/**
 * POST /id : Update a game
 */
router.post('/:id', gameController.updateGame);

/**
 * DELETE /id : Delete a game
 */
router.delete('/:id', gameController.deleteGame);

module.exports = router;
