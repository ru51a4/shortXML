const superxmlparser74 = require("superxmlparser74");

class node {
    childrens = [];
    attr = [];
    tag = '';
    value = '';
    key = '';
    variable;
    id = '';
}

class superxmltoobj {
    static code(obj) {
        let i = 0;
        let uuidv4 = () => {
            return i++;
        }
        //step 1 - create tree
        let start = new node();
        start.key = "root";
        let stack = [start];
        let createTree = (obj) => {
            for (let key in obj) {
                let el = new node();
                el.id = uuidv4();
                el.key = key;
                stack[stack.length - 1].childrens.push(el);
                if ((/boolean|number|string/).test(typeof obj[key])) {
                    el.value = obj[key];
                } else {
                    stack.push(el);
                    createTree(obj[key]);
                    stack.pop();
                }
            }
        }
        createTree(obj);
        //step 2 find clone
        let shorting = (node) => {
            let cNode = (node);
            let variable = uuidv4();
            let setVariable = (node) => {
                if (cNode.id !== node.id) {
                    function equal(a, b) {
                        if (a.childrens.length && b.childrens.length) {
                            for (let p in a.childrens) {
                                if (!equal(a.childrens[p], b.childrens[p])) {
                                    return false;
                                }
                            }
                        }
                        if (a.value === b.value) {
                            if (a.key === b.key) {
                                return true;
                            }
                        }
                        return false;
                    }

                    if (equal(node, cNode)) {
                        node.variable = variable;
                        cNode.variable = variable;
                    } else {
                        node.childrens.forEach((item) => {
                            setVariable(item);
                        });
                    }
                }

            };
            setVariable(stack[0]);
            node.childrens.forEach((item) => {
                shorting(item);
            })
        };
        shorting(stack[0]);

        //step 3 build xml
        let variable = [];
        let resXML = '';
        let buildXml = (node) => {
            if (variable[node.variable]) {
                if (variable[node.variable]) {
                    resXML += `<${node.key} superxmltoobj_print="false" superxmltoobj_var="${node.variable}"/>`;
                }
                return;
            }
            if (node.variable) {
                variable[node.variable] = true;
                resXML += `<${node.key} superxmltoobj_print="true" superxmltoobj_var="${node.variable}">`;
            } else {
                resXML += "<" + node.key + ">";
            }
            if (node.value) {
                resXML += node.value;
            }
            node.childrens.forEach((item) => {
                buildXml(item);
            });
            resXML += "</" + node.key + ">";
        }
        buildXml(stack[0])
        return resXML;
    }

    static decode(str) {
        //step 1 build dom
        let startNode = new node();
        let stack = [];
        stack.push(startNode);
        superxmlparser74.parse(str,
            (item) => {
                let el = new node();
                el.tag = item.tag.trim();
                el.attr = item.attr;
                stack[stack.length - 1].childrens.push(el);
                stack.push(el);
            },
            (item) => {
                stack[stack.length - 1].value = item.value.trim();
            },
            (item) => {
                stack.pop();
            });
        startNode = startNode.childrens[0];
        //step 2 build obj
        let obj = {};
        let variables = [];
        let deep = (node, tNode) => {
            let isVariable = node.attr.find((item) => item.key = "superxmltoobj_var")?.[0];
            let isPrintVariable = node.attr.find((item) => item.key = "superxmltoobj_print")?.[0];

            if (node.childrens.length) {
                let t = {};
                if (isVariable) {
                    if (isPrintVariable) {
                        variables[isVariable] = t;
                    } else {
                        t = variables[isVariable];
                        return;
                    }
                }
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
                if (isVariable) {
                    if (isPrintVariable) {
                        variables[isVariable] = node.value;
                    } else {
                        node.value = variables[isVariable];
                    }
                }
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

console.log((superxmltoobj.code({
    obj: {
        fizz: {
            lol: 'kek'
        },
        buzz: {
            lol: 'kek'
        },
    },
    obj2: {
        fizz: {
            lol: 'kek'
        },
        buzz: {
            lol: 'kek'
        },
    },
})))
module.exports = superxmltoobj;
