import {
  defineStore
} from 'pinia';
import { PRODUCT_LIST_STORE, PRODUCT_DETAIL_STORE } from './../../configs/storeTypes'
import { _dataTable, _showAlert } from './../../configs/globalProperties'
import wsv from './../../webServices'
/**
 * lưu trữ Danh sách hiện tại
 */
export const useProductListStore = defineStore(PRODUCT_LIST_STORE, {
  state: () => ({
    loading: true,
    dataTable : _dataTable,
    filters: {
      keySearch: null,
      categoryId: '',
      collectionId: '',
      status: '',
      tab: '',
      page: 1
    }
  }),
  actions: {
    async getListPager(page = 1, isReset = false) {
      if (isReset) {
        this.filters = {...this.filters,...{
          keySearch: null,
          categoryId: '',
          collectionId: '',
          status: '',
          page: 1
        }}
      }
      this.filters.page = page
      const res = await wsv.productService.getProductList(this.filters, this.filters.page)
      if (!res.code) {
        this.dataTable = { ...this.dataTable, ...res.data }
      }
      this.loading = false
    },
    async changeStatus(ids, status) {
      await wsv.commonService.postChangeStatus('story', ids, status)
      await this.getListPager(this.filters.page)
    }
  }
})

/**
 * lưu trữ chi tiết sản phẩm
 */
export const useProductDetailStore = defineStore(PRODUCT_DETAIL_STORE, {
  state: () => ({
    loading: true,
    item: {
    },
    isValid: true,
    onChecks: [],
    validation: {
      name: {
        alias: 'Tên sản phẩm',
        error: null,
        checkValid: function(form, filedCheck) {
          if (!form.name) {
            filedCheck.error = 'Tên sản phẩm không để trống'
          } else {
            filedCheck.error = null;
          }
        }
      }
    },
  }),
  actions: {
    validationProductForm(field = null, value=null) {
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
    async getProductDetailById(id) {
      const res = await wsv.productService.getProductDetailById(id)
      if (!res.code) {
        this.item = {...this.item, ...res.data}
      }
      this.loading = false
    },
    async saveProduct(data = {}) {
      this.validationProductForm()
      if (!this.isValid && data.id) {
        return
      }
      
      const res = await wsv.productService.saveProductDetailById(data);
      if (!res.code) {
        const msg = data.id ? 'Cập nhật dữ liệu thành công' : 'Đang chuyển hướng đến thêm mới bản ghi...'
        _showAlert({
          message: msg,
          timer: 1000,
          willClose: () => {
            if (!data.id) {
              window.location.href = `/app/product/${res.data.id}`
            } else {
              this.getProductDetailById(res.data.id)
            }
          }
        })
      }
    }
  }
})

export default {
  useProductListStore,
  useProductDetailStore
}