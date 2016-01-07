# ainm
## Automatic Input Name Model
Ainm automatically creates a model with two-way binding based on input element names in the specified html document. In order to display a value in another element use the attribute `data-ainm` with the name of an input element as attribute value. (As it happens "ainm" means "name" in Irish.)

## Example use
HTML:

    <input type="text" name="username">
    ...
    <p>Hello <span data-ainm="username">unknown</span>!</p>
    <p>Today it is <span data-aim="weekday">any day</span>.</p>
    ...
    <script type="text/javascript" src="ainm.js"></script>

JavaScript:

    var model = new Ainm( document );
    model.set( 'weekday', 'thursday' );

## What doesn't work?
Select elements or textarea elements are currently not supported.
