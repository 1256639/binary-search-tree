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

    }
}