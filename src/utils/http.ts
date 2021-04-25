import qs from "qs";
import { logout } from "../auth-provider";
const apiUrl = process.env.REACT_APP_API_URL; // baseurl
interface Config extends RequestInit {
  data: object;
  token: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config
) => {
  // baseurl+requrl,config
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint = endpoint + "?" + qs.stringify(data);
  } else {
    config.body = JSON.stringify(data || {});
  }
  // fetch不会在400或者500的时候抛错,这是跟axios不一样的地方
  window.fetch(`${apiUrl}/${endpoint}`, config).then(async (resp) => {
    if (resp.status === 401) {
      //没有登录或token过期
      await logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登陆" });
    }
    const Data = await resp.json();
    if (resp.ok) {
      return Data;
    } else {
      return Promise.reject(Data);
    }
  });
};
