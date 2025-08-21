const express = require('express');
const router = express.Router();
const followsCtrl = require('../../controllers/follows');

/*---------- Protected Routes ----------*/
router.post('/', followsCtrl.follow);
router.delete('/:userId', followsCtrl.unfollow);
router.get('/status/:userId', followsCtrl.getFollowStatus);

module.exports = router;