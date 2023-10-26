const express = require('express');
const router = express.Router();
const tweetController = require('../Controllers/tweetController');
const auth = require('../Controllers/authController');

router.post('/create', auth.checkSignInStatus, tweetController.createTweet);
router.get('/tweets', tweetController.getAllTweets);
router.get('/tweets/:id', tweetController.getTweetById);
router.post('/delete', auth.checkSignInStatus, tweetController.deleteTweetById);
router.post('/update', auth.checkSignInStatus, tweetController.updateTweetById);

module.exports = router;


