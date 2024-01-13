import { connectServer, menuResource } from "./resources";

export const getMenu = async (data = {}, opts = {}) => {
 
  let {method, url} = menuResource.GET_MENU_API
  url = `${url}`
  return await connectServer[method](url, {data: data}, opts)
};

export default {
  getMenu,
};
