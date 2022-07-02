const path = require('path'); // core Node module to manipulate file paths
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: path.join(__dirname, './src/index.js'),
	// where we want our outputted JS to go
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
	},
	mode: 'development',
	devServer: {
		static: {
      publicPath: '/dist/',
			directory: path.join(__dirname, 'index.html')
		},
		compress: true,
		port: 8080
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: "./src/img/favicon.ico",
			hash: true
		}),
    new MiniCssExtractPlugin({
      filename:"styles.css",
  })
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				},
      },
      {
        test:/\.css$/,
        use:[
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader"
        ]
			},
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
		]
	},
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};