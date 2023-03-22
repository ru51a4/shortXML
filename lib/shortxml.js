
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
let obj = JSON.parse(`{"obj":{"fizz":{"lol":"kek"},"buzz":{"lol":"kek"}},"obj2":{"fizz":{"lol":"kek"},"buzz":{"lol":"kek"},"fizzbuzz":{"lol":"kek"}}}
`);
createTree(obj);
let tracking = [];
let curr = [];
//step 2 find clone
let shorting = (node, curr) => {
    curr.push(node)
    node.childrens.forEach((item) => {
        shorting(item, curr);
    })
    let t = {};
    t.path = JSON.parse(JSON.stringify(curr));
    t.id = uuidv4();
    t.pointer = node;
    tracking.push(t);
    curr.pop();
};
let zaeb = (node) => {
    let curr = [];
    shorting(node, curr);
    node.childrens.forEach((item) => {
        zaeb(item);
    })
};
zaeb(stack[0])


tracking.forEach((item) => {
    tracking.forEach((curr) => {
        let find = false;
        for (let i = 0; i <= curr["path"].length - 1; i++) {
            if (curr["path"][i]?.id !== item["path"][i]?.id && (curr["path"][i]?.value === item["path"][i]?.value && curr["path"][i]?.key === item["path"][i]?.key)) {
                find = true;
            }
        }
        if (find) {
            item.var = true;
            curr.var = true;
        }
    });
})
console.log(tracking);






let buildXML = (node) => {
    node.childrens.forEach((item) => {
        buildXML(item);
    })
};
buildXML(stack[0])












