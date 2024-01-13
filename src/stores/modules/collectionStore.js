import {
  defineStore
} from 'pinia';
import { COLLECTION_LIST_STORE, COLLECTION_DETAIL_STORE } from '../../configs/storeTypes'
import { _dataTable, _showAlert } from '../../configs/globalProperties'
import wsv from '../../webServices'
/**
 * lưu trữ Danh sách hiện tại
 */
export const useCollectionListStore = defineStore(COLLECTION_LIST_STORE, {
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
          collectionId: '',
          collectionId: '',
          status: '',
          page: 1
        }}
      }
      this.filters.page = page
      const res = await wsv.collectionService.getCollectionList(this.filters, this.filters.page)
      if (!res.code) {
        this.dataTable = { ...this.dataTable, ...res.data }
      }
      this.loading = false
    },
    async changeStatus(ids, status) {
      await wsv.commonService.postChangeStatus('collection', ids, status)
      await this.getListPager(this.filters.page)
    }
  }
})

/**
 * lưu trữ chi tiết danh mục
 */
export const useCollectionDetailStore = defineStore(COLLECTION_DETAIL_STORE, {
  state: () => ({
    item: {
    },
    ref: {
      collectionList: [],
      collectionList: [],
      tagList: [],
      collectionParentList: []
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
    validationCollectionForm(field = null, value=null) {
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
    async getCollectionDetailById(id) {
      const res = await wsv.collectionService.getCollectionDetailById(id)
      if (!res.code) {
        this.item = res.data
      }
    },
    async getCollectionParentList(id) {
      const res = await wsv.collectionService.getCollectionParentList(id)
      if (!res.code) {
        this.ref.collectionParentList = res.data.reduce(
          (obj, item) => Object.assign(obj, { [item.id]: item }), {});
      }
    },
    async saveCollection(data = {}) {
      this.validationCollectionForm()
      if (!this.isValid && data.id) {
        return
      }
      const res = await wsv.collectionService.saveCollectionDetailById(data);
      if (!res.code) {
        const msg = data.id ? 'Cập nhật dữ liệu thành công' : 'Đang chuyển hướng đến thêm mới bản ghi...'
        _showAlert({
          message: msg,
          timer: 1000,
          willClose: () => {
            if (!data.id) {
              window.location.href = `/app/collection/${res.data.id}`
            } else {
              this.getCollectionDetailById(res.data.id)
            }
          }
        })
      }
    }
  }
})

export default {
  useCollectionListStore,
  useCollectionDetailStore
}