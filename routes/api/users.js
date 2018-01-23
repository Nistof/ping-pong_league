const express = require('express');

const { Router } = express;

const router = Router();

/**
 * GET / : Get all users
 */
router.get('/', (req, res) => {

});

/**
 * PUT / : Add an user
 */
router.put('/', (req, res) => {
  
});

/**
 * GET / : Get a single user
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;

});

module.exports = router;
