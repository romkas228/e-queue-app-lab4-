const path = require("path");
const { readFileSync, readFileCallback, readFilePromise, readFileAsyncAwait } = require("../utils/fileReader");

let queues = [];

function loadQueuesSync() {
    queues = readFileSync(path.join(__dirname, "../data/queues.json"));
}

function loadQueuesWithCallback(callback) {
    readFileCallback(path.join(__dirname, "../data/queues.json"), (data) => {
        queues = data;
        callback();
    });
}

function loadQueuesWithPromise() {
    return readFilePromise(path.join(__dirname, "../data/queues.json"))
        .then(data => queues = data);
}

async function loadQueuesAsync() {
    queues = await readFileAsyncAwait(path.join(__dirname, "../data/queues.json"));
}

function getAllQueues() {
    return queues;
}

function getQueueById(id) {
    return queues.find(q => q.id === id);
}

function addQueue(queue) {
    queues.push(queue);
}

function removeUser(queueId, userId) {
    const queue = getQueueById(queueId);
    if (queue) {
        queue.users = queue.users.filter(u => u.userId !== userId);
    }
}

module.exports = {
    loadQueuesSync,
    loadQueuesWithCallback,
    loadQueuesWithPromise,
    loadQueuesAsync,
    getAllQueues,
    getQueueById,
    addQueue,
    removeUser
};