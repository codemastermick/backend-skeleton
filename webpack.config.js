const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const {
    NODE_ENV = 'production',
} = process.env;
module.exports = {
    entry: './src/index.ts',
    mode: NODE_ENV,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    devtool: 'inline-source-map',
    externals: [nodeExternals()],
    resolve: {
        alias: {
            '@/config/*': path.resolve(__dirname, 'src/configs/*'),
            '@/lib/*': path.resolve(__dirname, 'src/lib/*'),
            '@/middleware/*': path.resolve(__dirname, 'src/middleware/*'),
            '@/routes/*': path.resolve(__dirname, 'src/routes/*')
        },
        extensions: ['.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({ baseUrl: './src' })
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ]
            }
        ]
    },
    watch: NODE_ENV === 'development'
}