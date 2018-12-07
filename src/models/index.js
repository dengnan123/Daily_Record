import * as indexService from "../service/index";
import qs from "qs";
import { normalize, schema } from "normalizr";
export default {
  namespace: "indexModel",

  state: {
    list: [],
    count: 0,
    id: "",
    info: {},
    numberArr: [],
    labels: [],
    type: "all",
    from: "list",
    obj: {},
    high: 0,
    innerWidth: null,
    cache: {}
  },

  reducers: {
    default(state) {
      return { ...state };
    },
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    clearModel(state) {
      const obj = {};
      return { ...state, ...obj };
    },
    clear() {
      return {};
    }
  },

  effects: {
    *getList({ payload }, { call, put, select }) {
      const type_ = yield select(state => state.indexModel.type);
      const cache = yield select(state => state.indexModel.cache);
      const labels = payload.labels;
      console.log("labelslabels", labels);
      console.log("cachecache", cache);
      // if (type_ !== labels) {
      if (cache[labels]) {
        console.log("进入缓存");
        yield put({
          type: "save",
          payload: {
            list: cache[labels]
          }
        });
        return;
      }

      const res = yield call(indexService.getList, payload);
      if (res) {
        const numberArr = res.map(value => value.number);
        const obj = {};
        for (const value of res) {
          const { number, body } = value;
          obj[number] = body;
        }
        yield put({
          type: "save",
          payload: {
            list: res,
            numberArr,
            obj,
            cache: {
              ...cache,
              [labels]: res
            }
          }
        });
      } else {
        yield put({
          type: "save",
          payload: {}
        });
      }
      // } else {
      //   yield put({
      //     type: "save",
      //     payload: {}
      //   });
      // }
    },
    *getInfo({ payload }, { call, put }) {
      const res = yield call(indexService.getInfo, payload);
      if (res) {
        yield put({
          type: "save",
          payload: {
            info: res
          }
        });
      } else {
        yield put({
          type: "save",
          payload: {}
        });
      }
    },
    *getLabels({ payload }, { call, put }) {
      const res = yield call(indexService.getLabels, payload);
      if (res) {
        yield put({
          type: "save",
          payload: {
            labels: res
          }
        });
      } else {
        yield put({
          type: "save",
          payload: {}
        });
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === "/blog/list") {
          const arr = search.split("?");
          let data = qs.parse(arr[1]);
          if (JSON.stringify(data) === "{}") {
            data = {
              per: 1,
              per_page: 100
            };
          }
          // if (!data.labels) {
          //   data.labels = "all";
          // }
          dispatch({
            type: "getList",
            payload: {
              ...data
            }
          });
        }
      });
    }
  }
};

function getData() {
  // Define a users schema
  const user = new schema.Entity("users");

  // Define your comments schema
  const comment = new schema.Entity("comments", {
    commenter: user
  });

  // Define your article
  const article = new schema.Entity("articles", {
    author: user,
    comments: [comment]
  });

  const normalizedData = normalize(originalData, article);
}
