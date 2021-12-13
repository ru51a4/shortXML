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

console.log(JSON.stringify(superxmltoobj.build(`
<glossary>
  <GlossDiv>
  <title>S</title>
   <GlossList>
    <GlossEntry ID="SGML" SortAs="SGML">
     <GlossTerm>Standard Generalized Markup Language</GlossTerm>
     <Acronym>SGML</Acronym>
     <Abbrev>ISO 8879:1986</Abbrev>
       <GlossSeeAlso>JSON</GlossSeeAlso>
      <GlossSeeAlso>XML</GlossSeeAlso>
    </GlossEntry>
   </GlossList>
    <GlossList>
    <GlossEntry ID="SGML" SortAs="SGML">
     <GlossTerm>Standard Generalized Markup Language</GlossTerm>
     <Acronym>SGML</Acronym>
     <Abbrev>ISO 8879:1986</Abbrev>
    </GlossEntry>
   </GlossList>
  </GlossDiv>
 </glossary>
`)));

module.exports = superxmltoobj;