const express = require('express');
const router = express.Router();
const friendsController = require('../controller/friendship_controller');

router.post('/', friendsController.connectFriend);
module.exports = router;