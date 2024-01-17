import { connectServer, permissionResource } from "./resources"

export const getPermission = async (data = {}, opts = {}) => {
  let {method, url} = permissionResource.GET_PERMISSION_LIST
  url = `${url}`
  return await connectServer[method](url, {data: data}, opts)
}

export const addRoleHasPermission = async (data = {}, opts = {}) => {
  let {method, url} = permissionResource.ADD_ROLE_HAS_PERMISSION
  url = `${url}`
  return await connectServer[method](url, {data: data}, opts)
}
export const deleteRoleHasPermission = async (data = {}, opts = {}) => {
  let {method, url} = permissionResource.DELETE_ROLE_HAS_PERMISSION
  url = `${url}`
  return await connectServer[method](url, {data: data}, opts)
}
export default {
  getPermission,
  addRoleHasPermission,
  deleteRoleHasPermission
}