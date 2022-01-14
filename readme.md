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
</root>
```
status: unstable(in development);
