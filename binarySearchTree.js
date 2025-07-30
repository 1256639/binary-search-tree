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
        node.right = this.buildTreeRec(arr, mid + 1, end);
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
            node.right = this.deleteRec(node.right, value);
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

    find(value) {
        let curr = this.root;
        while (curr) {
            if (value === curr.data) {
                return curr;
            }

            curr = value < curr.data ? curr.left : curr.right; 
        }
        return null;
    }

    levelOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback required");
        }

        const queue = [];
        if (this.root) {
            queue.push(this.root);
        }

        while (queue.length) {
            const node = queue.shift();
            callback(node);

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }
    }

    inOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback required");
        }
        function visit(node) {
            if (!node) {
                return;
            }
            visit(node.left);
            callback(node);
            visit(node.right);
        }
        visit(this.root);
    }

    preOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback required");
        }
        function visit(node) {
            if (!node) {
                return;
            }
            callback(node);
            visit(node.left);
            visit(node.right);
        }
        visit(this.root);
    }

    postOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback required");
        }
        function visit(node) {
            if (!node) {
                return;
            }
            visit(node.left);
            visit(node.right);
            callback(node);
        }
        visit(this.root);
    }

    height(value) {
        const node = this.find(value);
        if (!node) {
            return null;
        }
        return this.height2(node);
    }

    _height(node) {
        if (!node) {
            return -1;
        }
        return 1 + Math.max(this._height(node.left), this._height(node.right));
    }

    depth(value) {
        let curr = this.root;
        let depth = 0;
        while (curr) {
            if (value === curr.data) {
                return depth;
            }
            curr = value < curr.data ? curr.left : curr.right;
            depth++;
        }
        return null;
    }

    balanced() {
        return this.isBalanced(this.root);
    }

    isBalanced(node) {
        if (!node) {
            return true;
        }

        const lh = this.height(node.left);
        const rh = this.height(node.right);

        if (Math.abs(lh - rh) > 1) {
            return false;
        }

        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }

    rebalance() {
        const values = [];
        this.inOrderForEach(node => values.push(node.data));
        this.root = this.buildTree(values);
    }
}

function prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

module.exports = { Node, Tree, prettyPrint };