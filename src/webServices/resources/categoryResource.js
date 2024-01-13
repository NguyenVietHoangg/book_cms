export default {
  //product
  GET_CATEGORY_LIST_API: {
    method: 'post',
    url: '/cms/category/getCategoryList'
  },
  GET_CATEGORY_DETAIL_BY_ID_API: {
    method: 'get',
    url: '/cms/category/getCategoryDetailById'
  },
  GET_CATEGORY_PARENT_LIST_API: {
    method: 'get',
    url: '/cms/category/getCategoryParentList'
  },
  SAVE_CATEGORY_DETAIL_BY_ID_API: {
    method: 'post',
    url: '/cms/category/saveCategoryDetailById'
  }
}