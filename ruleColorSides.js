module.exports = function( getter ) {

	var numSamples = Math.floor( getter.qWidth * getter.qHeight * 0.5 ),
		r1 = 0, r2 = 0, b1 = 0, b2 = 0, g1 = 0, g2 = 0;

	while( numSamples-- ) {

		getter.set( Math.random() * 0.5, Math.random() );

		r1 += getter.getR() / 255;
		g1 += getter.getG() / 255;
		b1 += getter.getB() / 255;

		getter.set( Math.random() * 0.5 + 0.5, Math.random() );

		r2 += getter.getR() / 255;
		g2 += getter.getG() / 255;
		b2 += getter.getB() / 255;
	}

	console.log( r1, r2, g1, g2, b1, b2 );

	return Math.abs( r1 - r2 ) > 3 ||
		   Math.abs( g1 - g2 ) > 3 ||
		   Math.abs( b1 - b2 ) > 3;
};