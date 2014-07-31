module.exports = function( getter ) {

	getter.set( 0.5, 0.5 );

	var numSamples = Math.floor( getter.qWidth * getter.qHeight * 0.25 ),
		r = getter.getR(),
		g = getter.getG(),
		b = getter.getB(),
		rVal = false;

	while( numSamples-- && !rVal ) {

		getter.set( Math.random(), Math.random() );

		rVal = getter.getR() != r ||
			   getter.getG() != g ||
			   getter.getB() != b;
	}

	return rVal;
};