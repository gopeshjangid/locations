const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './index.js',
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
   },
   devServer: {
      inline: true,
      port: 8001,
      historyApiFallback: true,
      contentBase: './',
   },
  resolve: {
   extensions: ['.js', '.jsx','.css','.ts'],
   modules: [
      path.resolve("./src"),
      path.resolve("./node_modules")
  ],
  },
   mode :"development",
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react'],
               plugins: ["transform-class-properties"]
            },

         },{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react' , "stage-0"],
               plugins: ["transform-class-properties"]
            },
           
         },
         { 
            test: /\.css$/, 
            use: [ 'style-loader', 'css-loader' ],
            include: [/node_modules/,
               path.resolve(__dirname, './src/public/'),
             ],
          },
          {
            test: /\.svg$/,
            use: 'file-loader'
          },
          { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.ttf$|\.eot$/,
             loader: 'file-loader'
          }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: './index.html'
      })
   ]
}