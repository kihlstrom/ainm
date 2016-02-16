# Ainm
## Automatic Input Name Model
Ainm automatically creates a model with two-way binding based on input element names in an html document. In order to display a value in another element use the attribute `data-ainm` with the name of an input element as attribute value. (As it happens "ainm" means "name" in Irish.)

## Example use
HTML:

    <input type="text" name="username">
    ...
    <p>Hello <span data-ainm="username">unknown</span>!</p>
    <p>Today it is <span data-ainm="weekday">any day</span>.</p>

JavaScript:

    var model = new Ainm();
    model.set( 'weekday', 'thursday' );

Make sure you load ainm.js before use, for instance by putting the following in `<head>`:

    <script type="text/javascript" src="ainm.js"></script>

## Limit scope
An optional root element can be specified in order to limit the scope of affected elements. If no root element is specified all matching elements in the current document will be used.

HTML:

    <form id="login" method="post" action=".">
        <input type="text" name="username">
        <input type="password" name="password">
    </form>

JavaScript:

    var form = document.getElementById( 'login' );
    var model = new Ainm( form );

## What doesn't work?
Select elements and textarea elements are currently not supported.
