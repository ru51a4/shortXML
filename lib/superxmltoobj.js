const superxmlparser74 = require("superxmlparser74");

class node {
    childrens = [];
    attr = [];
    tag = '';
    value = '';
}

class superxmltoobj {
    static build(str) {
        let stack = [];
        let obj = {};
        stack.push(obj);
        let tKey = '';
        let tAttr = [];
        let isObj = true;
        let isPop = false;
        superxmlparser74.parse(str,
            (item) => {
                tKey = item.tag.trim();
                tAttr = item.attr;
                isObj = true;
            },
            (item) => {
                if (Array.isArray(stack[stack.length - 1][tKey])) {
                    stack[stack.length - 1][tKey].push(item.value);
                } else if (stack[stack.length - 1][tKey]) {
                    stack[stack.length - 1][tKey] = [stack[stack.length - 1][tKey]];
                    stack[stack.length - 1][tKey].push(item.value);
                } else {
                    stack[stack.length - 1][tKey] = item.value;
                }
                isObj = false;
                isPop = false;
            },
            (item) => {
                if (isPop) {
                    stack.pop();
                }
                isPop = true;
            }, () => {
                if (!tKey || !isObj) {
                    return;
                }
                let t = {};
                console.log({tKey})
                tAttr.forEach((attr) => {
                    t[attr.key] = attr.value[0];
                });
                if (Array.isArray(stack[stack.length - 1][tKey])) {
                    stack[stack.length - 1][tKey].push(t);
                } else if (stack[stack.length - 1][tKey]) {
                    stack[stack.length - 1][tKey] = [stack[stack.length - 1][tKey]];
                    stack[stack.length - 1][tKey].push(t);
                } else {
                    stack[stack.length - 1][tKey] = t;
                }
                stack.push(t);
                isObj = true;
                isPop = false;
            });
        return stack[0];
    }
}


module.exports = superxmltoobj;