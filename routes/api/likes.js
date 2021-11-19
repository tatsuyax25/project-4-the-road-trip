const express = require('express');
const router = express.Router();
const likesCtrl = require('../../controllers/likes');

router.get('/:id', likesCtrl.create)
router.delete('/:id', likesCtrl.deleteLike)

module.exports = router;