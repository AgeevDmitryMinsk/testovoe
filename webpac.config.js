// const path = require('path');
// module.exports = {
//     entry: './src/index.tsx',
//     output: {
//         path: path.resolve('dist'),
//         filename: 'main.tsx'
//     }
// };


module.exports = function (api) {
    return {
        plugins: ['macros'],
    }
}

module.exports = {
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    mode: "development",
    entry: "./src/index.tsx",
    devServer: {
        static: "./public",
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ]
                    }
                }
            },
            {
                test: /\.(css|scss)$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            }
        ]
    }
}
