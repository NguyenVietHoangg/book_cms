import { connectServer, mediaResource } from "./resources"
export const postFilesUpload = async () => {
  return await connectServer[mediaResource.FILE_UPLOAD_API.method](api.mediaResource.url)
}

export const getMediaList = async (filters = {}) => {
  let {method, url} = mediaResource.GET_MEDIA_LIST_API
  url = `${url}?page=${filters.page}`
  return await connectServer[method](url, filters)
}

export const getNormalMediaList = async (filters = {}) => {
  let {method, url} = mediaResource.GET_NORMAL_MEDIA_LIST_API
  url = `${url}?page=${filters.page}`
  return await connectServer[method](url, filters)
}

export const getMediaDetailById = async (id = {}, opts = {}) => {
  let {method, url} = mediaResource.GET_MEDIA_DETAIL_BY_ID_API
  url = `${url}/${id}`
  return await connectServer[method](url, opts)
}

export const saveMediaDetailById = async (data = {}, opts = {}) => {
  let {method, url} = mediaResource.SAVE_MEDIA_DETAIL_BY_ID_API
  url = `${url}/${data.id ? data.id : 'new'}?&tab=${data.tab || ''}`
  return await connectServer[method](url, {data: data}, opts)
}

export default {
  postFilesUpload,
  getMediaList,
  getNormalMediaList,
  getMediaDetailById,
  saveMediaDetailById,
}