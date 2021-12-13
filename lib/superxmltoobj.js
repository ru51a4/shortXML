const superxmlparser74 = require("superxmlparser74");

class node {
    childrens = [];
    attr = [];
    tag = '';
    value = '';
}

class superxmltoobj {
    static build(str) {
        //step 1 build dom
        let startNode = new node();
        let stack = [];
        stack.push(startNode);
        superxmlparser74.parse(str,
            (item) => {
                if (item.tag.trim().length && item.tag.trim() !== "\n") {
                    let el = new node();
                    el.tag = item.tag.trim();
                    el.attr = item.attr;
                    stack[stack.length - 1].childrens.push(el);
                    stack.push(el);
                }
            },
            (item) => {
                if (item.value.trim().length && item.value.trim() !== "\n") {
                    stack[stack.length - 1].value = item.value.trim();
                }
            },
            (item) => {
                stack.pop();
            });
        startNode = startNode.childrens[0];
        //step 2 build obj
        let obj = {};
        let deep = (node, tNode) => {
            if (node.childrens.length) {
                let t = {};
                if (Array.isArray(tNode[node.tag])) {
                    tNode[node.tag].push(t);
                } else if (tNode[node.tag]) {
                    tNode[node.tag] = [tNode[node.tag]];
                    tNode[node.tag].push(t);
                } else {
                    tNode[node.tag] = t;
                }
                node.attr.forEach((item) => {
                    t[item.key] = item.value[0];
                });
                node.childrens.forEach((item) => {
                    deep(item, t);
                });
            } else {
                if (Array.isArray(tNode[node.tag])) {
                    tNode[node.tag].push(node.value);
                } else if (tNode[node.tag]) {
                    tNode[node.tag] = [tNode[node.tag]];
                    tNode[node.tag].push(node.value);
                } else {
                    tNode[node.tag] = node.value;
                }
            }
        }
        deep(startNode, obj);
        return obj;
    }
}

module.exports = superxmltoobj;