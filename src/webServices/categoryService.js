import { connectServer, categoryResource } from "./resources"

export const getCategoryList = async (filters = {}) => {
  let {method, url} = categoryResource.GET_CATEGORY_LIST_API
  url = `${url}?page=${filters.page}`
  return await connectServer[method](url, filters)
}

export const getCategoryDetailById = async (id = {}, opts = {}) => {
  let {method, url} = categoryResource.GET_CATEGORY_DETAIL_BY_ID_API
  url = `${url}/${id}`
  return await connectServer[method](url, opts)
}

export const getCategoryParentList = async (id = {}, opts = {}) => {
  let {method, url} = categoryResource.GET_CATEGORY_PARENT_LIST_API
  url = `${url}/${id}`
  return await connectServer[method](url, opts)
}

export const saveCategoryDetailById = async (data = {}, opts = {}) => {
  let {method, url} = categoryResource.SAVE_CATEGORY_DETAIL_BY_ID_API
  url = `${url}/${data.id ? data.id : 'new'}?&tab=${data.tab || ''}`
  return await connectServer[method](url, {data: data}, opts)
}

export default {
  getCategoryList,
  getCategoryDetailById,
  saveCategoryDetailById,
  getCategoryParentList,
}