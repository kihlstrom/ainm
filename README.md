# ainm
## Automatic Input Name Model
Ainm automatically creates a model with two-way binding based on input element names in the specified html document. In order to display a value in another element use the attribute `data-ainm` with the name of an input element as attribute value. (As it happens "ainm" means "name" in Irish.)

## Example use
HTML:
    &lt;input type="text" name="username"&gt;
    ...
    &lt;p&gt;Hello &lt;span data-ainm="username"&gt;unknown&lt;/span&gt;!&lt;/p&gt;
    &lt;p&gt;Today it is &lt;span data-aim="weekday"&gt;any day&lt;/span&gt;.&lt;/p&gt;
    ...
    &lt;script type="text/javascript" src="ainm.js"&gt;&lt;/script&gt;

JavaScript:
    var model = new Ainm( document );
    model.set( 'weekday', 'thursday' );

## What doesn't work?
Select elements or textares elements are currently not supported.
