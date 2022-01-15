const superxmltoobj = require('./../lib/superxmltoobj');

test('simple', () => {
    let str = `
<root>
    <obj>
        <fizz superxmltoobj_print="true" superxmltoobj_var="19">
            <lol superxmltoobj_print="true" superxmltoobj_var="24">
                kek
            </lol>
        </fizz>
        <buzz superxmltoobj_print="true" superxmltoobj_var="21">
            <lol superxmltoobj_print="true" superxmltoobj_var="24">
                kek
            </lol>
        </buzz>
    </obj>
    <obj2>
        <fizz superxmltoobj_print="false" superxmltoobj_var="19"/>
        <buzz superxmltoobj_print="false" superxmltoobj_var="21"/>
        <fizzbuzz>
            <lol superxmltoobj_print="false" superxmltoobj_var="24"/>
        </fizzbuzz>
    </obj2>
</root>`;
    let obj = JSON.parse(`{"obj":{"fizz":{"lol":"kek"},"buzz":{"lol":"kek"}},"obj2":{"fizz":{"lol":"kek"},"buzz":{"lol":"kek"},"fizzbuzz":{"lol":"kek"}}}
    `);
    expect(superxmltoobj.decode(str)).toEqual(obj);
});
test('array', ()=>{
    let obj = JSON.parse(`{"a":["1",{"a":"lol"},"1","1"]}`);
    let str =`
<root>
    <a superxmltoobj_print="true" superxmltoobj_var="12">1</a>
        <a>
            <a>
                lol
            </a>
        </a>
    <a superxmltoobj_print="false" superxmltoobj_var="12"/>
    <a superxmltoobj_print="false" superxmltoobj_var="12"/>
    </root>`
});
