import { Tree } from "./classes.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function arrayGenerator(size) {
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
}

const randomArray = arrayGenerator(10);
const tree = new Tree(randomArray);

console.log("Initial Tree:");
console.log("Is balanced? ", tree.isBalanced());

console.log("Level Order:");
tree.levelOrder(node => console.log(node.data));

console.log("Pre-order:");
tree.preOrder(node => console.log(node.data));

console.log("Post-order:");
tree.postOrder(node => console.log(node.data));

console.log("In-order:");
tree.inOrder(node => console.log(node.data));

tree.insert(200);
tree.insert(300);
tree.insert(400);
tree.insert(500);
tree.insert(600);

console.log("Tree after adding numbers > 100:");
console.log("Is balanced? ", tree.isBalanced());

console.log("Level Order");
tree.levelOrder(node => console.log(node.data));

console.log("Pre-order");
tree.preOrder(node => console.log(node.data));

console.log("Post-order");
tree.postOrder(node => console.log(node.data));

console.log("In-order");
tree.inOrder(node => console.log(node.data));

tree.rebalance();

console.log("Tree after rebalancing:");
console.log("Is balanced? ", tree.isBalanced());

console.log("Level Order");
tree.levelOrder(node => console.log(node.data));

console.log("Pre-order");
tree.preOrder(node => console.log(node.data));

console.log("Post-order");
tree.postOrder(node => console.log(node.data));

console.log("In-order");
tree.inOrder(node => console.log(node.data));

