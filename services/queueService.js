const repo = require("../repositories/queueRepository");

function createQueue(name, ownerId) {
    const queue = {
        id: Date.now().toString(),
        name,
        ownerId,
        users: [],
        isOpen: true
    };
    repo.addQueue(queue);
    return queue;
}

function joinQueue(queueId, userId) {
    const queue = repo.getQueueById(queueId);
    if (queue && queue.isOpen) {
        queue.users.push({ userId, timestamp: Date.now() });
        return true;
    }
    return false;
}

function nextInQueue(queueId) {
    const queue = repo.getQueueById(queueId);
    if (queue && queue.users.length > 0) {
        queue.users.shift();
    }
}

module.exports = {
    createQueue,
    joinQueue,
    nextInQueue
};