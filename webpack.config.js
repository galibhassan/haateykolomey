const path = require('path');

module.exports =  {
    entry: "./src/testIndex.js",
    output: {
        path: path.resolve(__dirname, 'public', 'webpackBuild'),
        filename: 'brushBoard.js'
    },
}