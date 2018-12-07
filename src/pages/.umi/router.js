import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: "layouts__index" */'../../layouts/index.js'), loading: require('/Users/dany/Desktop/Daily-record/src/components/Loading.js').default }),
    "routes": [
      {
        "path": "/blog",
        "exact": false,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__blog___layout" */'../blog/_layout.js'), loading: require('/Users/dany/Desktop/Daily-record/src/components/Loading.js').default }),
        "routes": [
          {
            "path": "/blog/detail",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: "p__blog___layout" */'../blog/detail/index.js'), loading: require('/Users/dany/Desktop/Daily-record/src/components/Loading.js').default })
          },
          {
            "path": "/blog/list",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: "p__blog___layout" */'../blog/list/index.js'), loading: require('/Users/dany/Desktop/Daily-record/src/components/Loading.js').default })
          },
          {
            "component": () => React.createElement(require('/Users/dany/Desktop/Daily-record/node_modules/_umi-build-dev@1.2.6@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
          }
        ]
      },
      {
        "path": "/demo/easyMonthPicker",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__demo__easyMonthPicker__index" */'../demo/easyMonthPicker/index.js'), loading: require('/Users/dany/Desktop/Daily-record/src/components/Loading.js').default })
      },
      {
        "path": "/demo",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__demo__index" */'../demo/index.js'), loading: require('/Users/dany/Desktop/Daily-record/src/components/Loading.js').default })
      },
      {
        "path": "/",
        "exact": true,
        "component": dynamic({ loader: () => import(/* webpackChunkName: "p__index" */'../index.js'), loading: require('/Users/dany/Desktop/Daily-record/src/components/Loading.js').default })
      },
      {
        "component": () => React.createElement(require('/Users/dany/Desktop/Daily-record/node_modules/_umi-build-dev@1.2.6@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/dany/Desktop/Daily-record/node_modules/_umi-build-dev@1.2.6@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false })
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
