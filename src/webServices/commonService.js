import { connectServer, commonResource } from "./resources"

export const getCommonRefs = async (filters = {}, page = 1) => {
  let {method, url} = commonResource.GET_COMMON_REFS_API
  url = `${url}?page=${page}`
  return await connectServer[method](url, filters)
}

export const postChangeStatus = async (table = '', ids = [], status = null) => {
  let {method, url} = commonResource.POST_CHANGE_STATUS_API
  return await connectServer[method](url, {table, ids, status})
}

export default {
  getCommonRefs,
  postChangeStatus
}