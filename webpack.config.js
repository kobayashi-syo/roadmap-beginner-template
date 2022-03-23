const StylelintPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./wordpress/wp-content/themes/roadmap-beginner/src/js/index.js",
  //ソース元のjs
  output: {
    path: `${__dirname}/wordpress/wp-content/themes/roadmap-beginner/`,
  },
  //出力先のフォルダ
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            //cssファイルを出力できるやつ
          },
          {
            loader: "css-loader",
            options: {
              url: false,
            },
            //cssをjsに読み込ませられるやつ
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      grid: "autoplace",
                      // gridありでベンダープレフィックス付与
                    },
                  ],
                  ["css-declaration-sorter", { order: "alphabetical" }],
                  ["postcss-sort-media-queries", { sort: "mobile-firstl" }],
                ],
                //cssをアルファベット順・メディアクエリの並び替え
              },
            },
          },
          {
            loader: "sass-loader",
            //sass読み込み
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
      //出力するcssのファイル名
    }),
    new BrowserSyncPlugin({
      host: "localhost",
      port: 10005,
      proxy: "http://localhost:5555",
      //LocalのDATABASEタブで確認して合わせる
    }),
  ],

  // node_modules を監視（watch）対象から除外
  watchOptions: {
    ignored: /node_modules/, //正規表現で指定
  },
};
