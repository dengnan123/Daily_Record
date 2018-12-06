import request from "../helpers/request";

export async function getList(params) {
  return request(
    "https://api.github.com/repos/dengnan123/Daily-record/issues",
    {
      method: "GET",
      body: params
    }
  );
}

export async function getInfo(params) {
  return request(
    `https://api.github.com/repos/dengnan123/Daily-record/issues/${params.id}`,
    {
      method: "GET"
    }
  );
}


export async function getLabels(params) {
  return request(
    `https://api.github.com/repos/dengnan123/Daily-record/labels`,
    {
      method: "GET"
    }
  );
}