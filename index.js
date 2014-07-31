var colourGetter = {

	setup: function( data, qX, qY, qWidth, qHeight, cWidth, cHeight ) {

		this.data = data;
		this.qX = qX;
		this.qY = qY;
		this.qWidth = qWidth;
		this.qHeight = qHeight;
		this.cWidth = cWidth;
		this.cHeight = cHeight;

		return this;
	},

	set: function( u, v ) {

		var x = Math.floor( u * this.qWidth ) + this.qX,
			y = Math.floor( v * this.qHeight ) + this.qY;

		this.i4 = ( y * this.cWidth + x ) * 4;
	},

	getR: function() {

		return this.data[ this.i4 ];
	},

	getG: function() {

		return this.data[ this.i4 + 1 ];
	},

	getB: function() {

		return this.data[ this.i4 + 2 ];
	},

	getA: function() {

		return this.data[ this.i4 + 3 ];
	}
};



function quad( sampleOut, imageData, x, y, width, height, totalWidth, totalHeight, test ) {

	var continueQuading = test( colourGetter.setup( imageData.data, x, y, width, height, totalWidth, totalHeight ) );

	if( continueQuading ) {

		var halfWidth = width * 0.5,
			halfHeight = height * 0.5,
			xHalf = Math.floor( x + halfWidth ),
			yHalf = Math.floor( y + halfHeight );

		halfWidth = Math.round( halfWidth );
		halfHeight = Math.round( halfHeight );

		if( halfWidth > 1 || halfHeight > 1 ) {

			quad( sampleOut, imageData, x, y, halfWidth, halfHeight, totalWidth, totalHeight, test );
			quad( sampleOut, imageData, xHalf, y, halfWidth, halfHeight, totalWidth, totalHeight, test );
			quad( sampleOut, imageData, x, yHalf, halfWidth, halfHeight, totalWidth, totalHeight, test );
			quad( sampleOut, imageData, xHalf, yHalf, halfWidth, halfHeight, totalWidth, totalHeight, test );
		} else {

			sampleOut.push( { x: x, y: y, width: width, height: height } );
		}
	} else {

		sampleOut.push( { x: x, y: y, width: width, height: height } );
	}
}


module.exports = function( sampleOut, imageData, width, height, test ) {

	quad( sampleOut, imageData, 0, 0, width, height, width, height, test );
};