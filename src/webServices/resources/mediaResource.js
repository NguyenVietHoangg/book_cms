import connectServer from "../../configs/connectServer"
export default {
  FILE_UPLOAD_API: {
    method: 'post',
    url: connectServer.endpointAccess('/cms/media/filesUpload'),
  },
  GET_MEDIA_LIST_API: {
    method: 'post',
    url: connectServer.endpointAccess('/cms/media/mediaList'),
  },
  GET_NORMAL_MEDIA_LIST_API: {
    method: 'post',
    url: '/cms/media/mediaList',
  },
  GET_MEDIA_DETAIL_BY_ID_API: {
    method: 'get',
    url: '/cms/category/getMediaDetailById'
  },
  SAVE_MEDIA_DETAIL_BY_ID_API: {
    method: 'post',
    url: '/cms/category/saveMediaDetailById'
  }
}