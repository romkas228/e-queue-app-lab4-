const service = require("../services/queueService");
const repo = require("../repositories/queueRepository");

function getHome(req, res) {
    const queues = repo.getAllQueues();
    res.render("index", { queues, userInfo: null });
}

function postCreateQueue(req, res) {
    const { name, ownerId } = req.body;
    service.createQueue(name, ownerId);
    res.redirect("/");
}

function postJoinQueue(req, res) {
    const { queueId, userId } = req.body;
    service.joinQueue(queueId, userId);
    res.redirect("/");
}

function postNext(req, res) {
    const { queueId, ownerId } = req.body;
    const queue = repo.getQueueById(queueId);
    if (queue && queue.ownerId === ownerId) {
        service.nextInQueue(queueId);
    }
    res.redirect("/");
}

function postRemoveUser(req, res) {
    const { queueId, userId, ownerId } = req.body;
    const queue = repo.getQueueById(queueId);
    if (queue && queue.ownerId === ownerId) {
        repo.removeUser(queueId, userId);
    }
    res.redirect("/");
}

function postCloseQueue(req, res) {
    const { queueId, ownerId } = req.body;
    const queue = repo.getQueueById(queueId);
    if (queue && queue.ownerId === ownerId) {
        queue.isOpen = false;
    }
    res.redirect("/");
}

function postCheckMyPlace(req, res) {
  const { queueId, userId } = req.body;
  const queue = repo.getQueueById(queueId);

  let position = null;
  if (queue) {
      // Зрівнюємо як строки — на всяк випадок
      const normalizedUsers = queue.users.map(u => String(u).trim());
      const normalizedUserId = String(userId).trim();
      position = normalizedUsers.indexOf(normalizedUserId);
      if (position !== -1) position += 1;
      else position = null;
  }

  const queues = repo.getAllQueues();
  res.render("index", { queues, userInfo: { userId, queueId, position } });
}


module.exports = {
    getHome,
    postCreateQueue,
    postJoinQueue,
    postNext,
    postRemoveUser,
    postCloseQueue,
    postCheckMyPlace
};