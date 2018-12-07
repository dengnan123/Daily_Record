import * as indexService from "../service/index";
import qs from "qs";
import { normalize, schema } from 'normalizr';
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
    innerWidth: null
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
      const from = yield select(state => state.indexModel.from);
      // console.log("type_type_", type_);
      // console.log("payload.labels", payload.labels);
      const labels = payload.labels;
      if (type_ !== labels) {
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
              obj
            }
          });
        } else {
          yield put({
            type: "save",
            payload: {}
          });
        }
      } else {
        yield put({
          type: "save",
          payload: {}
        });
      }
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
