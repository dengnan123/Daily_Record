import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: "layouts__index" */'../../layouts/index.js'), loading: require('/Users/dany/Desktop/Daily Record/Daily-record/src/components/Loading.js').default }),
    "routes": [
      {
        "path": "/detail",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__detail__index" */'../detail/index.js'), loading: require('/Users/dany/Desktop/Daily Record/Daily-record/src/components/Loading.js').default })
      },
      {
        "path": "/",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__index" */'../index.js'), loading: require('/Users/dany/Desktop/Daily Record/Daily-record/src/components/Loading.js').default })
      },
      {
        "component": () => React.createElement(require('/Users/dany/Desktop/Daily Record/Daily-record/node_modules/_umi-build-dev@1.2.6@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/dany/Desktop/Daily Record/Daily-record/node_modules/_umi-build-dev@1.2.6@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
