var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'dist');
module.exports = {
    entry: './src/js/tutorial.js',
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    output: {
      path: BUILD_DIR,
      filename: 'webpageInteractiveTutorial.js',
      libraryTarget: 'umd',
      library: 'webpageInteractiveTutorial'
    }
};