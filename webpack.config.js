const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    index: "./src/index.ts",
    components: "./src/components/index.ts",
    hooks: "./src/hooks/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "@mollie-react-component",
    libraryTarget: "umd",
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader"
      }
    ]
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  mode: "production"
};
