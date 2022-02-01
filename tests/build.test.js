const shortxml = require('./../lib/shortxml');

test('simple', () => {
    let str = `
<root>
    <obj>
        <fizz shortxml_var="14">
            <lol shortxml_var="15">
                kek
            </lol>
        </fizz>
        <buzz shortxml_var="16">
            <lol shortxml_var="15"/>
        </buzz>
    </obj>
    <obj2>
        <fizz shortxml_var="14"/>
        <buzz shortxml_var="16"/>
        <fizzbuzz>
            <lol shortxml_var="15"/>
        </fizzbuzz>
    </obj2>
</root>
`;
    let obj = JSON.parse(`{"obj":{"fizz":{"lol":"kek"},"buzz":{"lol":"kek"}},"obj2":{"fizz":{"lol":"kek"},"buzz":{"lol":"kek"},"fizzbuzz":{"lol":"kek"}}}
    `);
    expect(shortxml.decode(str)).toEqual(obj);
});
test('array', ()=>{
    let obj = JSON.parse(`{"a":["1",{"a":"lol"},"1","1"]}`);
    let str =`<root>
    <a shortxml_print="true" shortxml_var="12">1</a>
        <a>
            <a>
                lol
            </a>
        </a>
    <a shortxml_print="false" shortxml_var="12"/>
    <a shortxml_print="false" shortxml_var="12"/>
    </root>`
    expect(shortxml.decode(str)).toEqual(obj);
});
test('simple2', ()=>{
    let obj = JSON.parse(`{
    "glossary": {
        "title": "example glossary",
        "GlossSeeAlso": ["GML", "XML"],
\t\t"GlossDiv": {
            "title": "S",
\t\t\t"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
\t\t\t\t\t"SortAs": "SGML",
\t\t\t\t\t"GlossTerm": "Standard Generalized Markup Language",
\t\t\t\t\t"Acronym": "SGML",
\t\t\t\t\t"Abbrev": "ISO 8879:1986",
\t\t\t\t\t"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
\t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]
                    },
\t\t\t\t\t"GlossSee": "markup"
                }
            }
        }
    }
}`);
    expect(shortxml.decode(shortxml.code(obj))).toEqual(obj);
});
test('arr arr', ()=>{
  let obj = {
    kek: [{
      kek: ["1","1","1"]
    },
    {
      kek: ["1","1","1"]
    }],
    lol: [{
      kek: ["1","1","1"]
    },
    {
      kek: ["1","1","1"]
    }]
  };
   /* <root>
        <kek shortxml_var="24">
            <kek shortxml_isarray="true" shortxml_var="25">
                <kek shortxml_var="26">1</kek>
                <kek shortxml_var="26" />
                <kek shortxml_var="26" />
            </kek>
        </kek>
        <kek shortxml_var="24" />
        <lol shortxml_var="28">
            <kek shortxml_var="25" />
        </lol>
        <lol shortxml_var="28" />
    </root>*/

  expect(shortxml.decode(shortxml.code(obj))).toEqual(obj);
});
