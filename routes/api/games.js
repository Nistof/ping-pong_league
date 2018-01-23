const express = require('express');

const { Router } = express;

const router = Router();

/**
 * GET / : Get all games
 */
router.get('/', (req, res) => {

});

/**
 * PUT / : Add a game
 */
router.put('/', (req, res) => {
  
});

/**
 * GET / : Get a single game
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;

});

/**
 * POST / : Update a game
 */
router.post('/:id', (req, res) => {
  const { id } = req.params;

});

module.exports = router;
