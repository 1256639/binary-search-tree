const { Tree, prettyPrint } = require('././binarySearchTree');

function randomArray(n) {
    return Array.from({ length: n }, () => Math.floor(Math.random() * 100));
}

function printAllOrders(tree) {
    const level = [];
    const pre = [];
    const post = [];
    const ino = [];
    tree.levelOrderForEach(n => level.push(n.data));
    tree.preOrderForEach(n => pre.push(n.data));
    tree.postOrderForEach(n => post.push(n.data));
    tree.inOrderForEach(n => ino.push(n.data));
    console.log("Level order:", level.join(", "));
    console.log("Preorder:   ", pre.join(", "));
    console.log("Postorder:  ", post.join(", "));
    console.log("Inorder:    ", ino.join(", "));
}

const arr = randomArray(15);
console.log("Initial array:", arr.join(", "));
const tree = new Tree(arr);

console.log("\nInitial tree:");
prettyPrint(tree.root);

console.log("Is balanced?", tree.isBalanced(tree.root));

printAllOrders(tree);

tree.insert(120);
tree.insert(130);
tree.insert(140);
tree.insert(200);

console.log("\nTree after inserting large numbers:");
prettyPrint(tree.root);
console.log("Is balanced?", tree.isBalanced(tree.root));