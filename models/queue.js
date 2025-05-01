class Queue {
    constructor(id, name, ownerId, users = [], isOpen = true) {
        this.id = id;
        this.name = name;
        this.ownerId = ownerId;
        this.users = users;
        this.isOpen = isOpen;
    }
}

module.exports = Queue;