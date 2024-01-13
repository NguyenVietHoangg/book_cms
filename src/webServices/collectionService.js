import { connectServer, collectionResource } from "./resources"

export const getCollectionList = async (filters = {}) => {
  let {method, url} = collectionResource.GET_COLLECTION_LIST_API
  url = `${url}?page=${filters.page}`
  return await connectServer[method](url, filters)
}

export const getCollectionDetailById = async (id = {}, opts = {}) => {
  let {method, url} = collectionResource.GET_COLLECTION_DETAIL_BY_ID_API
  url = `${url}/${id}`
  return await connectServer[method](url, opts)
}

export const getCollectionParentList = async (id = {}, opts = {}) => {
  let {method, url} = collectionResource.GET_COLLECTION_PARENT_LIST_API
  url = `${url}/${id}`
  return await connectServer[method](url, opts)
}

export const saveCollectionDetailById = async (data = {}, opts = {}) => {
  let {method, url} = collectionResource.SAVE_COLLECTION_DETAIL_BY_ID_API
  url = `${url}/${data.id ? data.id : 'new'}?&tab=${data.tab || ''}`
  return await connectServer[method](url, {data: data}, opts)
}

export default {
  getCollectionList,
  getCollectionDetailById,
  saveCollectionDetailById,
  getCollectionParentList,
}