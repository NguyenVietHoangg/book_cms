import { connectServer, productResource } from "./resources"

export const getProductList = async (filters = {}) => {
  let {method, url} = productResource.GET_PRODUCT_LIST_API
  url = `${url}?page=${filters.page}`
  return await connectServer[method](url, filters)
}

export const getProductDetailById = async (id = {}, opts = {}) => {
  let {method, url} = productResource.GET_PRODUCT_DETAIL_BY_ID_API
  url = `${url}/${id}`
  return await connectServer[method](url, opts)
}

export const saveProductDetailById = async (data = {}, opts = {}) => {
  let {method, url} = productResource.SAVE_PRODUCT_DETAIL_BY_ID_API
  url = `${url}/${data.id ? data.id : 'new'}?&tab=${data.tab || ''}`
  return await connectServer[method](url, {data: data}, opts)
}

export default {
  getProductList,
  getProductDetailById,
  saveProductDetailById
}