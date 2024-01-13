import api from "../configs/endpoints"
import connectServer from "../configs/connectServer"
export const getTopListCate = async () => {
  return await connectServer[api.CATE_LIST_RECOMMEND_IN_HOME_API.method](api.CATE_LIST_RECOMMEND_IN_HOME_API.url)
}
export const getTopListByType = async (type) => {
  if (!type) {
    return null
  }
  return await connectServer[api.COLLECTION_LIST_API.method](api.COLLECTION_LIST_API.url)
}
export const getTopListDocument = async () => {
  return await connectServer[api.DOCUMENT_LIST_RECOMMEND_IN_HOME_API.method](api.DOCUMENT_LIST_RECOMMEND_IN_HOME_API.url)
}
export const getTopListDocumentByType = async () => {

}
export const getTopListSlideShow = async () => {
  return await connectServer[api.SLIDE_SHOW_LIST_IN_HOME_API.method](api.SLIDE_SHOW_LIST_IN_HOME_API.url)
}
export const getTopListSlideShowByType = async () => {

}

export default {
  getTopListCate,
  getTopListByType,
  getTopListDocument,
  getTopListDocumentByType,
  getTopListSlideShow,
  getTopListSlideShowByType
}