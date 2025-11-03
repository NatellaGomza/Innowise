const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // точка входа
  output: {
    filename: 'bundle.js', // единый JS-файл
    path: path.resolve(__dirname, 'dist'),
    clean: true, // очищает dist перед сборкой
  },
  mode: 'production', // включает оптимизацию
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080,
    open: true,
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // шаблон HTML
      inject: 'body', // вставляет <script> в конец <body>
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // обработка JS-файлов
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
