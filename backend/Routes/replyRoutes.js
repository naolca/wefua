const replyController = require('../Controllers/replyController');
const auth  = require('../Controllers/authController');
const express = require('express');
const router = express.Router();


router.post('/create',auth.checkSignInStatus,  replyController.addReply);
router.get('/replays/:tweetId', replyController.getRepliesForTweet);

module.exports = router;