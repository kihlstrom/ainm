/* -------- ---- -- -  -    -
** AINM = Automatic Input Name Model
** Automatically creates a model with two-way binding based on input element
** names in the specified document. In order to display a value in another
** element use the attribute data-ainm with the name of an input element as
** attribute value.
** Example: <span data-ainm="username"></span>
** (As it happens "ainm" means "name" in Irish.)
** ---- -- -  -    -
*/
function Ainm( doc ) {

	var _ATTRIBUTE = 'data-ainm';
	var _model = {};
	var _doc = doc || document;



	function get( key ) {
		if( key && typeof key === 'string' ) {
			return _model[ key ];
		}
	}



	function set( key, value ) {
		if( key && typeof key === 'string' ) {
			_model[ key ] = value;
			render( key );
		}
	}



	function extend( object ) {
		for( var key in object ) {
			set( key, object[ key ] );
		}
	}



	function index( array, value ) {
		for( var i = 0; i < array.length && array[ i ] !== value; i++ ){}
		return i;
	}



	function isArray( value ) {
		return Object.prototype.toString.call( value ) === '[object Array]';
	}



	function renderElement( element, value ) {
		var i;
		var tag = element.tagName.toLowerCase();

		if( tag === 'input' ) {
			if( element.type === 'radio' ) {
				element.checked = ( element.value === value );
			} else if( element.type === 'checkbox' ) {
				if( isArray( value ) ) {
					i = index( value, element.value );
					element.checked = ( i < value.length );
				} else {
					element.checked = ( element.value === value );
				}
			} else {
				element.value = value;
			}
		} else {
			if( isArray( value ) ) {
				element.innerHTML = value.join( ', ' );
			} else {
				element.innerHTML = value;
			}
		}
	}



	function render( key ) {
		var element, elements, i;
		var value = get( key );

		if( _doc.querySelectorAll ) {
			elements = _doc.querySelectorAll( 'input[name="' + key + '"], [' + _ATTRIBUTE + '="' + key + '"]' );
		} else if( _doc.getElementsByTagName ) {
			elements = _doc.getElementsByTagName( '*' );
		} else {
			return;
		}

		for( i = 0; i < elements.length; i++ ) {
			element = elements[ i ];
			if( key === ( element.getAttribute( _ATTRIBUTE ) || element.name ) ) {
				renderElement( element, value );
			}
		}
	}



	function onChange( event ) {
		var i;
		var element = event.target;
		var value = element.value;
		var key = element.getAttribute( _ATTRIBUTE ) || element.name;

		if( element.type === 'checkbox' ) {
			_model[ key ] = _model[ key ] || [];
			i = index( _model[ key ], value );
			if( element.checked ) {
				_model[ key ][ i ] = value;
			} else if( i < _model[ key ].length ) {
				_model[ key ].splice( i, 1 );
			}
		} else {
			_model[ key ] = value;
		}

		render( key );
	}



	function addEvent( element, type, handler) {
		if( element.addEventListener ) {
			element.addEventListener( type, handler );
		} else if( element.attachEvent ) {
			element.attachEvent( 'on' + type, handler );
		}
	}



	function init() {
		var element, elements, i;

		if( _doc.getElementsByTagName ) {
			elements = _doc.getElementsByTagName( 'input' );
		} else {
			return;
		}

		for( i = 0; i < elements.length; i++ ) {
			element = elements[ i ];
			if( element.type === 'radio' ) {
				addEvent( element, 'click', onChange );
			} else {
				addEvent( element, 'change', onChange );
			}
		}
	}



	init();

	return {
		get: get,
		set: set,
		extend: extend
	};

}
