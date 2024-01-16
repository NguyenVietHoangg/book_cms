import { connectServer, permissionResource } from "./resources"

export const getPermission = async (data = {}, opts = {}) => {
  let {method, url} = permissionResource.GET_PERMISSION_LIST
  url = `${url}`
  return await connectServer[method](url, {data: data}, opts)
}

export default {
  getPermission
}