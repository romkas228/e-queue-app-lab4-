const express = require("express");
const router = express.Router();
const controller = require("../controllers/queueController");

router.get("/", controller.getHome);
router.post("/create", controller.postCreateQueue);
router.post("/join", controller.postJoinQueue);
router.post("/next", controller.postNext);
router.post("/remove-user", controller.postRemoveUser);
router.post("/close-queue", controller.postCloseQueue);
router.post("/check-my-place", controller.postCheckMyPlace);

module.exports = router;