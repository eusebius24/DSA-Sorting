class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    push(val) {
        const newNode = new Node(val);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    pop() {
        if(!this.head) return undefined;
        let current = this.head;
        let newTail = current;

        while(current.next) {
            newTail = current;
            current = current.next;
        }
        this.tail = newTail;
        this.tail.next = null;
        this.length--;
        if(this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }

    shift() {
        if(!this.head) return undefined;
        let temp = this.head;
        this.head = temp.next;
        temp.next = null;
        this.length--;
        if(this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return temp;
    }

    unshift(val) {
        const newNode = new Node(val);
        if(this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    get(index) {
        if(index < 0 || index >= this.length) return undefined;
        let current = this.head;
        let counter = 0;
        while(counter !== index) {
            current = current.next;
            counter++;
        }
        return current;
    }
    
    set(index, val) {
        const newVal = this.get(index);
        if(!newVal) {
            return false;
        } else {
            newVal.val = val;
            return true;
        }
    }

    insert(index, val) {
        const newNode = new Node(val);
        if(index < 0 || index > this.length) return false;
        if(index === this.length - 1) return !!this.push(val);
        if(index === 0) return !!this.unshift(val);
        const pre = this.get(index - 1);
        const aft = pre.next;
        pre.next = newNode;
        newNode.next = aft;
        this.length++;
        return true;
    }

    remove(index) {
        if(index < 0 || index >= this.length) return false;
        if(index === this.length - 1) return !!this.pop();
        if(index === 0) return !!this.unshift();
        const pre = this.get(index - 1);
        const removedVal = pre.next;
        pre.next = removedVal.next;
        removedVal.next = null;
        this.length--;
        if(this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return removedVal;
    }

    reverse() {
        let node = this.head;
        this.head = this.tail;
        this.tail = node;
        var next;
        var prev = null;
    }
}

function sortList(node) {
    if(node === null || node.next === null) {
        return node;
    }
    let left;
    let right;
    let prev = null;
    let fast = node;
    let slow = node;

    while(fast !== null || fast.next !== null) {
        fast = fast.next.next;
        prev = slow;
        slow = slow.next;
    }

    prev.next = null;
    left = node;
    right = slow;

    left = sortList(left);
    right = sortList(right);
    return mergeList(left, right);
}

function mergeList(left, right) {
    let ls = new SinglyLinkedList;
    let current = ls;

    while(left !== null && right !== null) {
        if (left.val < right.val) {
            current.next = left;
            left = left.next;
        } else {
            current.next = right;
            right = right.next;
        }
        current = current.next;
    }

    current.next = (left === null) ? right : left;

    return ls.next;
}





