import {
  defineStore
} from 'pinia';
import { MEDIA_LIST_STORE, MEDIA_DETAIL_STORE } from '../../configs/storeTypes'
import { _dataTable, _showAlert } from '../../configs/globalProperties'
import wsv from '../../webServices'
/**
 * lưu trữ Danh sách hiện tại
 */
export const useMediaListStore = defineStore(MEDIA_LIST_STORE, {
  state: () => ({
    loading: true,
    dataTable : _dataTable,
    filters: {
      keySearch: null,
      status: '',
      tab: '',
      page: 1
    },
    opts: {},
  }),
  actions: {
    async getListPager(page = 1, isReset = false) {
      if (isReset) {
        this.filters = {...this.filters,...{
          keySearch: null,
          mediaId: '',
          collectionId: '',
          status: '',
          page: 1
        }}
      }
      this.filters.page = page
      const res = await wsv.mediaService.getNormalMediaList(this.filters, this.filters.page)
      if (!res.code) {
        this.dataTable = { ...this.dataTable, ...res.data }
      }
      this.loading = false
    },
    async changeStatus(ids, status) {
      await wsv.commonService.postChangeStatus('media', ids, status)
      await this.getListPager(this.filters.page)
    }
  }
})

/**
 * lưu trữ chi tiết danh mục
 */
export const useMediaDetailStore = defineStore(MEDIA_DETAIL_STORE, {
  state: () => ({
    item: {
    },
    ref: {
      mediaList: [],
      collectionList: [],
      tagList: [],
      mediaParentList: []
    },
    isValid: true,
    onChecks: [],
    validation: {
      name: {
        alias: 'Tên danh mục',
        error: null,
        checkValid: function(form, filedCheck) {
          if (!form.name) {
            filedCheck.error = 'Tên danh mục không để trống'
          } else {
            filedCheck.error = null;
          }
        }
      }
    },
  }),
  actions: {
    validationMediaForm(field = null, value=null) {
      let keys = Object.keys(this.validation)
      if (field) {
        keys = [field]
        this.item[field] = value
      }
      if (keys.length) {
        for (let i = 0; i < keys.length; i++) {
          this.validation[keys[i]].checkValid(this.item, this.validation[keys[i]])
          this.onChecks.push(keys[i])
        }
        const errors = Object.values(this.validation).filter(item => item.error)
        if (errors.length) {
          this.isValid = !errors.length ? true : false
        } else {
          this.isValid = true
        }
      }
    },
    async getMediaDetailById(id) {
      const res = await wsv.mediaService.getMediaDetailById(id)
      if (!res.code) {
        this.item = res.data
      }
    },
    async getMediaParentList(id) {
      const res = await wsv.mediaService.getMediaParentList(id)
      if (!res.code) {
        this.ref.mediaParentList = res.data.reduce(
          (obj, item) => Object.assign(obj, { [item.id]: item }), {});
        console.log('mediaDetailStore', this.ref.mediaParentList)
      }
    },
    async saveMedia(data = {}) {
      this.validationMediaForm()
      if (!this.isValid && data.id) {
        return
      }
      const res = await wsv.mediaService.saveMediaDetailById(data);
      if (!res.code) {
        const msg = data.id ? 'Cập nhật dữ liệu thành công' : 'Đang chuyển hướng đến thêm mới bản ghi...'
        _showAlert({
          message: msg,
          timer: 1000,
          willClose: () => {
            if (!data.id) {
              window.location.href = `/app/media/${res.data.id}`
            } else {
              this.getMediaDetailById(res.data.id)
            }
          }
        })
      } else {
        _showAlert({
          message: res.message,
          timer: res.duration,
        })
      }
    }
  }
})

export default {
  useMediaListStore,
  useMediaDetailStore
}