import { connectServer, authResource } from "./resources";

export const getUser = async (data = {}, opts = {}) => {
 
  let {method, url} = authResource.GET_LOGIN_API
  url = `${url}`
  return await connectServer[method](url, {data: data}, opts)
};

export default {
  getUser,
};
