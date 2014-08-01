var cg = require( 'canvasgrayscale' );
var imageareas = require( '../index' );

var canvas = document.createElement( 'canvas' ),
	img = new Image(),
	ctx = null;

img.onload = function() {

	canvas.width = img.width;
	canvas.height = img.height;

	ctx = canvas.getContext( '2d' );
	ctx.drawImage( img, 0, 0 );

	var imageData = ctx.getImageData( 0, 0, canvas.width, canvas.height );

	var out = [];
	var colour = 0;

	// imageareas( out, imageData, canvas.width, canvas.height, require( '../ruleSameColor' ) );
	imageareas( out, imageData, canvas.width, canvas.height, require( '../ruleColorSides' ) );

	ctx.fillRect( 0, 0, canvas.width, canvas.height );

	for( var i = 0, len = out.length; i < len; i++ ) {

		var midX = Math.round( out[ i ].x + out[ i ].width * 0.5 ),
			midY = Math.round( out[ i ].y + out[ i ].height * 0.5 );

		var i4 = ( midY * canvas.width + midX ) * 4;

		ctx.strokeStyle = 'rgba( 0, 0, 0, 0.1 )';
		ctx.fillStyle = 'rgba( ' + imageData.data[ i4 ] + ', ' + imageData.data[ i4 + 1 ] + ', ' + imageData.data[ i4 + 2 ] + ', 1 )';
		ctx.fillRect( out[ i ].x, out[ i ].y, out[ i ].width, out[ i ].height );
		ctx.strokeRect( out[ i ].x, out[ i ].y, out[ i ].width, out[ i ].height );
	}
};

img.src = '/test/western.jpg';

document.body.appendChild( img );
document.body.appendChild( canvas );