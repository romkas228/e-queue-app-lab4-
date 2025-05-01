const express = require('express');
const router = express.Router();
const controller = require('../controllers/queueController');

router.get('/', controller.index);
router.post('/create', controller.createQueue);
router.post('/add', controller.addUser);
router.post('/position', controller.getUserPosition);
router.post('/next', controller.removeFirst);
router.post('/remove', controller.removeUser);
router.post('/close', controller.closeQueue);

module.exports = router;
