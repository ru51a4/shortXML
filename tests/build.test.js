const superxmltoobj = require('./../lib/superxmltoobj');

test('1', () => {
    let str = `<glossary><title>example glossary</title>
  <GlossDiv><title>S</title>
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
 </glossary>`;
    let obj = JSON.parse(`
    { "glossary" : {
   "title": "example glossary",
   "GlossDiv": {
      "title": "S",
      "GlossList": [
         {
            "GlossEntry": {
               "ID": "SGML",
               "SortAs": "SGML",
               "GlossTerm": "Standard Generalized Markup Language",
               "Acronym": "SGML",
               "Abbrev": "ISO 8879:1986",
               "GlossSeeAlso": [
                  "JSON",
                  "XML"
               ]
            }
         },
         {
            "GlossEntry": {
               "ID": "SGML",
               "SortAs": "SGML",
               "GlossTerm": "Standard Generalized Markup Language",
               "Acronym": "SGML",
               "Abbrev": "ISO 8879:1986"
            }
         }
      ]
   }
}
}
    `);
    expect(superxmltoobj.build(str)).toEqual(obj);
});