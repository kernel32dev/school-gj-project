const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_env, argv) => {
    const production = argv.mode === 'production';
    return {
        entry: './src/script.tsx',
        mode: production ? 'production' : 'development',
        output: {
            filename: 'script.js',
            path: path.resolve(__dirname, '../public'),
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', {
                        loader: "sass-loader",
                        options: { sourceMap: !production, sassOptions: { charset: false } },
                    }],
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js']
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.css',
            }),
        ],
        optimization: {
            usedExports: true,
        },
        devtool: production ? false : 'inline-source-map',
    };
};
