class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const noDuplicatesArray = [...new Set(array)];
        const sortedArray = noDuplicatesArray.sort((a, b) => a - b);
        return this.sortedArrayToTree(sortedArray);
    }

    sortedArrayToTree(array) {
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.sortedArrayToTree(array.slice(0, mid));
        root.right = this.sortedArrayToTree(array.slice(mid + 1));

        return root;
    }

    insert(value) {
        const insertNode = (node, value) => {
            if (node === null) {
                return new Node(value);
            }

            if (value < node.data) {
                node.left = insertNode(node.left, value);
            } else if (value > node.data) {
                node.right = insertNode(node.right, value);
            }

            return node;
        };

        this.root = insertNode(this.root, value);
    }

    deleteItem(value) {
        const deleteNode = (node, value) => {

            if (node === null) return null;

            if (value < node.data) {
                node.left = deleteNode(node.left, value);
            } else if (value > node.data) {
                node.right = deleteNode(node.right, value);
            } else {
                if (node.left === null) {
                    return node.right;
                } else if (node.right === null) {
                    return node.left;
                }

                node.data = this.minValue(node.right);
                node.right = deleteNode(node.right, node.data);
            }
            return node;
        }

        this.root = deleteNode(this.root, value);

    }

    minValue(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }

    find(value) {
        const findNode = (node, value) => {
            if (node === null) {
                return null;
            }

            if (value === node.data) {
                return node;
            }

            if (value < node.data) {
                return findNode(node.left, value);
            } else {
                return findNode(node.right, value);
            }
        };

        return findNode(this.root, value);
    }

    levelOrder(callback) {
        if (!callback) {
            throw new Error("Callback function is required");
        }

        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();

            if (node === null) continue;

            callback(node);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    inOrder(callback) {
        if (!callback) {
            throw new Error("Callback function is required");
        }

        const inOrderTraversal = (node) => {
            if (node === null) return;

            inOrderTraversal(node.left);
            callback(node);
            inOrderTraversal(node.right);
        };

        inOrderTraversal(this.root);
    }

    preOrder(callback) {
        if (!callback) {
            throw new Error("Callback function is required");
        }

        const preOrderTraversal = (node) => {
            if (node === null) return;

            callback(node);
            preOrderTraversal(node.left);
            preOrderTraversal(node.right);
        };

        preOrderTraversal(this.root);
    }

    postOrder(callback) {
        if (!callback) {
            throw new Error("Callback function is required");
        }

        const postOrderTraversal = (node) => {
            if (node === null) return;

            postOrderTraversal(node.left);
            postOrderTraversal(node.right);
            callback(node);
        };

        postOrderTraversal(this.root);
    }

    height(node) {
        if (node === null) {
            return -1;
        }

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        let depth = 0;

        const findDepth = (currentNode, targetNode, currentDepth) => {
            if (currentNode === null) return -1;

            if (currentNode === targetNode) return currentDepth;

            const leftDepth = findDepth(currentNode.left, targetNode, currentDepth + 1);
            if (leftDepth !== -1) return leftDepth;

            return findDepth(currentNode.right, targetNode, currentDepth + 1);
        };

        return findDepth(this.root, node, depth);
    }

    isBalanced() {
        const checkBalance = (node) => {
            if (node === null) return 0;

            const leftHeight = this.height(node.left);
            const rightHeight = this.height(node.right);

            if (Math.abs(leftHeight - rightHeight) > 1) {
                return -1;
            }

            return Math.max(leftHeight, rightHeight) + 1;
        };

        return checkBalance(this.root) !== -1;
    }

    rebalance() {
        const sortedValues = [];
        this.inOrder(node => sortedValues.push(node.data));
        this.root = this.buildTree(sortedValues);
    }


}

export { Tree };