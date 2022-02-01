congst superxmlparser74 = require("superxmlparser74");

class node {
    childrens = [];
    attr = [];
    tag = '';
    value = '';
    key = '';
    variable;
    id = '';
    var;
    isArray = false;
}

class shortxml {
    static code(obj) {
        let i = 0;
        let uuidv4 = () => {
            return i++;
        }
        //step 1 - create tree
        let start = new node();
        start.key = "root";
        let stack = [start];
        let createTree = (obj, prevKey, prevIsArray = false) => {
            for (let key in obj) {
                let el = new node();
                el.id = uuidv4();
                el.key = (prevIsArray) ? prevKey : key;
                el.isArray = Array.isArray(obj[key]);
                stack[stack.length - 1].childrens.push(el);
                if ((/boolean|number|string/).test(typeof obj[key])) {
                    el.value = obj[key];
                } else {
                    stack.push(el);
                    createTree(obj[key], key, el.isArray);
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
                        if (a?.childrens.length !== b?.childrens.length) {
                            return false;
                        }
                        if (a?.childrens.length && b?.childrens.length) {
                            for (let p in a.childrens) {
                                if (!equal(a.childrens[p], b.childrens[p])) {
                                    return false;
                                }
                            }
                        }
                        if (a?.value === b?.value) {
                            if (a?.key === b?.key) {
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
                if (!item.variable) {
                    shorting(item);
                }
            })
        };
        shorting(stack[0]);

        //step 3 build xml
        let variable = [];
        let resXML = '';
        let buildXml = (node) => {
            if (variable[node.variable]) {
                if (variable[node.variable]) {
                    //not print var
                    resXML += `<${node.key} shortxml_var="${node.variable}" />`;
                }
                return;
            }
            if (node.variable) {
                variable[node.variable] = true;
                if (node.isArray) {
                    resXML += `<${node.key} shortxml_isarray="true" shortxml_var="${node.variable}">`;
                } else {
                    resXML += `<${node.key} shortxml_var="${node.variable}">`;
                }
            } else {
                if (!node.isArray) {
                    resXML += "<" + node.key + ">";
                }
            }
            if (node.value && !node.isArray) {
                resXML += node.value;
            }
            node.childrens.forEach((item) => {
                buildXml(item);
            });
            if (!node.isArray || node.variable) {
                resXML += "</" + node.key + ">";
            }
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
                let variable = item.attr.find((item) => item.key.includes("shortxml_var"))?.value[0];
                el.isarray = item.attr.find((item) => item.key === "shortxml_isarray")?.value[0];
                el.attr = item.attr.filter((item) => {
                    return !item.key.includes("shortxml")
                });
                el.var = variable;
                stack[stack.length - 1].childrens.push(el);
                stack.push(el);
            },
            (item) => {
                stack[stack.length - 1].value = item.value.trim();
            },
            (item) => {
                stack.pop();
            },
            () => {

            }, (item) => {
                let el = new node();
                el.tag = item.tag.trim();
                let variable = item.attr.find((item) => item.key.includes("shortxml_var"))?.value[0];
                el.attr = item.attr.filter((item) => {
                    return !item.key.includes("shortxml")
                });
                el.var = variable;
                stack[stack.length - 1].childrens.push(el);
            });
        startNode = startNode.childrens[0];
        //step 2 build obj
        let obj = {};
        let variables = [];

        let deep = (node, tNode, buildVar = false) => {
            let t = {};
            if (node.var && variables[node.var] && !buildVar) {
                t = JSON.parse(JSON.stringify(variables[node.var]))
            } else if (node.var && !variables[node.var] && !buildVar) {
                let cObjVar = {};
                if (node.isarray) {
                    cObjVar = node.childrens.map((elArrNode) => {
                        let c = {};
                        deep(elArrNode, c);
                        return c[elArrNode.tag];
                    });
                    variables[node.var] = cObjVar;
                } else {
                    deep(node, cObjVar, true);
                    variables[node.var] = cObjVar[node.tag];
                }
                t = JSON.parse(JSON.stringify(variables[node.var]))
            }
            if (node.childrens.length) {
                if (Array.isArray(tNode[node.tag])) {
                    tNode[node.tag].push(t);
                } else if (tNode[node.tag]) {
                    tNode[node.tag] = [tNode[node.tag]];
                    tNode[node.tag].push(t);
                } else {
                    tNode[node.tag] = t;
                }
                if (node.var && variables[node.var]) {
                    return;
                }
                node.attr.forEach((item) => {
                    t[item.key] = item.value[0];
                });
                node.childrens.forEach((item) => {
                    deep(item, t);
                });
            } else {
                if (node.var && variables[node.var]) {
                    node.value = t;
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
        ///
        deep(startNode, obj);
        return obj['root'];
    }
}
module.exports = shortxml;
