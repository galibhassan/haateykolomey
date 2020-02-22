const path = require('path');

module.exports =  {
    entry: "./src/testIndex.js",
    output: {
        path: path.resolve(__dirname, 'build', 'aro', 'koyekta'),
        filename: 'amaderProthomBundle.js'
    },
}