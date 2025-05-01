const pool = require('../db');

async function getAllQueues() {
  const res = await pool.query('SELECT * FROM queues');
  return res.rows;
}

async function createQueue(name, ownerId) {
  return pool.query(
    'INSERT INTO queues (name, owner_id, is_open, users) VALUES ($1, $2, true, $3)',
    [name, ownerId, []]
  );
}

async function addUserToQueue(queueId, userId) {
  return pool.query(
    'UPDATE queues SET users = array_append(users, $1) WHERE id = $2 AND is_open = true',
    [userId, queueId]
  );
}

async function getUserPosition(queueId, userId) {
  const res = await pool.query('SELECT users FROM queues WHERE id = $1', [queueId]);
  const users = res.rows[0]?.users || [];
  return users.indexOf(userId) + 1 || null;
}

async function removeFirstUser(queueId) {
  return pool.query('UPDATE queues SET users = users[2:array_length(users, 1)] WHERE id = $1', [queueId]);
}

async function removeUser(queueId, userId) {
  return pool.query('UPDATE queues SET users = array_remove(users, $1) WHERE id = $2', [userId, queueId]);
}

async function closeQueue(queueId) {
  return pool.query('UPDATE queues SET is_open = false WHERE id = $1', [queueId]);
}

module.exports = {
  getAllQueues,
  createQueue,
  addUserToQueue,
  getUserPosition,
  removeFirstUser,
  removeUser,
  closeQueue,
};