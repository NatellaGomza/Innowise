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
  plugins: [
    new HtmlWebpackPlugin({
      template: './dist/index.html', // шаблон HTML
      inject: 'body', // вставляет <script> в конец <body>
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // обработка JS-файлов
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // если нужен Babel
        },
      },
    ],
  },
};
