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
```
status: unstable(in development);
