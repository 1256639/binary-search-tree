class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree([...array]);
    }

    buildTree(array) {
        const sorted = [...new Set(array)].sort((a, b) => a - b);

        if (!sorted.length) {
            return null;
        }

        return this.buildTreeRec(sorted, 0, sorted.length - 1);
    }

    buildTreeRec(arr, start, end) {
        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);
        node.left = this.buildTreeRec(arr, start, mid - 1);
        node.rigth = this.buildTreeRec(arr, mid + 2, end);
        return node;
    }

    insert(value) {
        this.root = this.insertRec(this.root, value);
    }

    insertRec(node, value) {
        if (!node) {
            return new Node(value);
        }

        if (value === node.data) {
            return node;
        }

        if (value < node.data) {
            node.left = this.insertRec(node.left, value);
        } else {
            node.right = this.insertRec(node.right, value);
        }
        return node;
    }

    deleteItem(value) {
        this.root = this.deleteRec(this.root, value);
    }

    deleteRec(node, value) {
        if (!node) {
            return null;
        }

        if (value < node.data) {
            node.left = this.deleteRec(node.left, value);
            return node;
        } else if (value > node.data) {
            node.right = this.deleteRec(node.rigth, value);
            return node;
        }

        if (!node.left && !node.right) {
            return null;
        }

        if (!node.left) {
            return node.right;
        }

        if (!node.right) {
            return node.left;
        }

        let succParent = node;
        let succ = node.right;
        while (succ.left) {
            succParent = succ;
            succ = succ.left;
        }

        if (succParent !== node) {
            succParent.left = succ.right;
        } else {
            succParent.right = succ.right;
        }

        node.data = succ.data;
        return node;
    }
}