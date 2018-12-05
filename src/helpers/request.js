import fetch from "dva/fetch";
import qs from "qs";
import { message } from "antd";
import router from "umi/router";
// import { getCookie } from './helper';
const tokenArr = ["72a57cd810527287670f3724", "fef235ffb95e4bbe"];
const str = "72a57cd810527287670f3724fef235ffb95e4bbe";
// const access_token = "e14fce38413495461c461eea860b3272f39ddb42";
// 72a57cd810527287670f3724fef235ffb95e4bbe
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 403) {
    message.error(`没有权限`);
    router.push("/403");
    return;
  }
  if (response.status === 404) {
    message.error(`找不到资源`);
    router.push("/404");
    return;
  }
  if (response.status >= 500) {
    message.error(`请求服务器出错`);
    router.push("/500");
    return;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  message.error(`请求错误 ${response.status}: ${response.url}`);
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = { method: "GET" }) {
  //   const {
  //     location: { pathname },
  //   } = router;

  const addOptions = {
    // mode: 'cors',
    // credentials: 'include',
    headers: {
      // Authorization: "token ab55ea596eb1a1e20fac0d3ea449eb61033f1032"
      // access_token: "e65c7aa01ff296758936936cc5f422e19273411b"
      //   username: getCookie('username'),
      //   role: getCookie('role'),
      //   token: getCookie('token'),
      //   id: getCookie('id'),
      //   'Content-Type': 'application/json',
      //   pathname,
      //   uuid:getCookie('uuid'),
      //   userpid:getCookie('uuid'),
    }
  };

  options.method.toLocaleUpperCase();
  const access_token = tokenArr.join("");
  console.log("access_token", access_token.length);
  console.log("str", str.length);
  // url = `${url}?access_token=${access_token}`;
  if (options.body) {
    if (options.method === "GET") {
      const query = qs.stringify(options.body);
      delete options.body;
      url = `${url}${query}`;
    } else {
      options.body = JSON.stringify(options.body);
    }
  }

  options = Object.assign({}, addOptions, options);

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      if (data.ERRORCODE === 500) {
        console.log("data.RESULT.message", data.RESULT.message);
        message.error("系统错误");
      } else if (data.ERRORCODE === 501) {
        router.push("/login");
        message.error("请重新登录");
      } else if (data.ERRORCODE === 502) {
        const res = data.RESULT.message;
        message.error(res);
      } else if (data.ERRORCODE === 403) {
        router.push("/403");
      } else if (data.ERRORCODE === 404) {
        router.push("/404");
      } else {
        return data;
      }
    })
    .catch(err => {
      const status = err.name;
      if (status === 403) {
        router.push("/403");
        return;
      }
      if (status <= 504 && status >= 500) {
        router.push("/500");
        return;
      }
      if (status >= 404 && status < 422) {
        router.push("/404");
      }
    });
}
