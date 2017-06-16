var path = require('path');
var webpack = require('webpack');
module.exports = {
	
		entry: [
		  // Set up an ES6-ish environment
		  'babel-polyfill',

		  // Add your application's scripts below
		  './src/renn_game.js',
	//		'index.html',
	//	'webpack-dev-server/client?http://localhost:8080'
		],

	
		output: {
		     path: path.resolve(__dirname, "build"), // string
		    filename: 'renn_game.bundle.js',
		  },
	
//  	debug: true,
 	 devtool: 'source-map',
    /* plugins: [
	   new webpack.LoaderOptionsPlugin({
	      debug: true
	   })
	  ],*/
	  module: {
  	  	rules: [
		  {
      	 	 // Only run `.js` and `.jsx` files through Babel
      	  	test: /\.jsx?$/,
  	   		include:  path.resolve(__dirname, 'src'),
      	 
		  	use: [
    	 	   	 {
      				 loader: "babel-loader",
		         	  // Options to configure babel with
		         	  options: {
		           	  	plugins: ['transform-runtime'],
		           	  	presets: ['es2015'],
		         	  }
		

      	   		  	// Skip any files outside of your project's `src` directory
      	   		 
			  }
			]
		}
		
  		]
	}

}