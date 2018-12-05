export default {
    targets: {
      ie: 9
    },
    publicPath: "./",
    base: "/Daily_Record",
    plugins: [
      [
        "umi-plugin-react",
        {
          dva: {
            immer: false
          },
          antd: true,
          routes: {
            exclude: [
              /model\.(j|t)sx?$/,
              /service\.(j|t)sx?$/,
              /models\//,
              /components\//,
              /services\//,
              /helpers\//
            ]
          },
          library: "react",
          dynamicImport: {
            webpackChunkName: true,
            loadingComponent: "./components/Loading.js"
          },
          hardSource: false,
          pwa: false,
          hd: false,
          fastClick: false
        }
      ]
    ]
  };
  