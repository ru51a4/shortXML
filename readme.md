xml code/decode library(with variables)  
example:  
input  
```js
{
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
        fizzbuzz: {
            lol: 'kek'
        }
    },
}
```
output  
```xml
<root>
    <obj>
        <fizz shortxml_print="true" shortxml_var="19">
            <lol shortxml_print="true" shortxml_var="24">
                kek
            </lol>
        </fizz>
        <buzz shortxml_print="true" shortxml_var="21">
            <lol shortxml_print="true" shortxml_var="24">
                kek
            </lol>
        </buzz>
    </obj>
    <obj2>
        <fizz shortxml_print="false" shortxml_var="19"/>
        <buzz shortxml_print="false" shortxml_var="21"/>
        <fizzbuzz>
            <lol shortxml_print="false" shortxml_var="24"/>
        </fizzbuzz>
    </obj2>
</root>
```
status: unstable(in development);
