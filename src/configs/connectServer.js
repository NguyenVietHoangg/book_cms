import axios from "axios";
import _ from "lodash";

import * as eResponse from "./eResponse";
import { encodeQueryData, makeId } from "../utils/common";
import { isValidUrl, isEmptyObject } from "../utils/validation";
import { TIMEOUT, KEY_USER_STORAGE, CRTK } from "./constantTypes";

const connectServer = (config) => {
  let headersDefault = {
    "Content-Type": "application/json; charset=utf-8",
  };
  let headers = config.headers
    ? { ...headersDefault, ...config.headers }
    : headersDefault;
  headers.Authorization = gtka() || false;
  console.log(headers)
  return axios.create({
    headers: headers,
    timeout: config.timeout || TIMEOUT,
  });
};
export const endpointAccess = (path) => {
  const endpoint =
    import.meta.env.PROD == true
      ? import.meta.env.VITE_API_PROD
      : import.meta.env.VITE_API_DEV;
  return isValidUrl(path) ? path : `${endpoint}${path}`;
};

export const get = async (path, data = {}, config = {}) => {
  try {
    const encode =
      typeof data === "object" && !isEmptyObject(data)
        ? "?" + encodeQueryData(data)
        : "";
    path = path + encode;
    path = endpointAccess(path);
    const res = await connectServer(config).get(path);

    if (typeof res.data !== "object") {
      return eResponse._errorResquestNotFound(path);
    }

    if (res.data.code === 401) {
      return eResponse._errorUnauthorized();
    }

    return res.data;
  } catch (err) {
    console.log("catch api GET:", err);
    return eResponse._errorOnTryCatch(err);
  }
};

export const post = async (path, data = {}, config = {}) => {
  try {
    path = endpointAccess(path);
    const res = await connectServer(config).post(path, data);

    if (typeof res.data !== "object") {
      return eResponse._errorResquestNotFound(path);
    }

    if (res.data.code === 401) {
      return eResponse._errorUnauthorized();
    }
    return res.data;
  } catch (err) {
    return eResponse._errorOnTryCatch(err);
  }
};

export const put = async (path, data = {}, config = {}) => {
  try {
    path = endpointAccess(path);
    const res = await connectServer(config).put(path, data);
    if (typeof res.data !== "object") {
      return eResponse._errorResquestNotFound(url);
    }
    if (res.data.code === 401) {
      return eResponse._errorUnauthorized();
    }

    return res.data;
  } catch (err) {
    if (err === "expireToken") return (window.location.href = "/");

    console.log("catch api PUT: ", err);
    return eResponse._errorOnTryCatch(err);
  }
};

export const deleted = async (path, data = {}, config = {}) => {
  try {
    path = endpointAccess(path);
    const res = await connectServer(config).delete(path, data);
    if (typeof res.data !== "object") {
      return eResponse._errorResquestNotFound(url);
    }
    if (res.data.code === 401) {
      return eResponse._errorUnauthorized();
    }

    return res.data;
  } catch (err) {
    console.log("catch api DELETE: ", err);
    return eResponse._errorOnTryCatch(err);
  }
};

export const removeUserStoreStore = (str) => {
  localStorage.removeItem(KEY_USER_STORAGE);
};

export const localEnUserStore = (str) => {
  if (!str) {
    return;
  }
  localStorage.setItem(KEY_USER_STORAGE, str);
};

export const localDeUserStore = (str) => {
  if (!str) {
    str = localStorage.getItem(KEY_USER_STORAGE);
  }
  if (!str) {
    return {};
  }
  str = str.substring(7);
  str = str.substring(0, str.length - 9);
  try {
    const data = window.atob(str);
    return JSON.parse(data);
  } catch (error) {
    console.log("error string localDeUserStore", error);
    return {};
  }
};
const gtka = () => {
  let str = localStorage.getItem("KEY_USER_STORAGE");
  // let jd = localDeUserStore(str);
  // if (!jd || !jd.token_id) {
  //   return false;
  // }
  return str;
};
export default { get, post, put, deleted, gtka, endpointAccess };
