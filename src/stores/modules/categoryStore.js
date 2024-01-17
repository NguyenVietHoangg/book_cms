import {
  defineStore
} from 'pinia';
import { _dataTable, _showAlert } from '../../configs/globalProperties'
import wsv from '../../webServices'
/**
 * lưu trữ Danh sách hiện tại
 */
export const categoryListStore = defineStore('categoryList', {
  state: () => ({
    loading: true,
    statusList: [
      {
        id: '',
        label: 'Tất cả'
      },
      {
        id: 1,
        label: 'Đang bật'
      },
      {
        id: 2,
        label: 'Đã tắt'
      },
    ],
    isCheckAll: false,
    idsChecked: [],
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
          categoryId: '',
          collectionId: '',
          status: '',
          page: 1
        }}
      }
      this.filters.page = page
      const res = await wsv.categoryService.getCategoryList(this.filters, this.filters.page)
      if (!res.code) {
        this.dataTable = { ...this.dataTable, ...res.data }
      }
      this.loading = false
    },
    async changeStatus(status) {
      await wsv.commonService.postChangeStatus('category', this.idsChecked, status)
      await this.getListPager(this.filters.page)
    }
  }
})

/**
 * lưu trữ chi tiết danh mục
 */
export const categoryDetailStore = defineStore('categoryDetail', {
  state: () => ({
    item: {
    },
    ref: {
      categoryList: [],
      collectionList: [],
      tagList: [],
      categoryParentList: []
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
    validationCategoryForm(field = null, value=null) {
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
    async getCategoryDetailById(id) {
      const res = await wsv.categoryService.getCategoryDetailById(id)
      if (!res.code) {
        this.item = res.data
      }
    },
    async getCategoryParentList(id) {
      const res = await wsv.categoryService.getCategoryParentList(id)
      if (!res.code) {
        this.ref.categoryParentList = res.data.reduce(
          (obj, item) => Object.assign(obj, { [item.id]: item }), {});
      }
    },
    async saveCategory(data = {}) {
      this.validationCategoryForm()
      if (!this.isValid && data.id) {
        return
      }
      const res = await wsv.categoryService.saveCategoryDetailById(data);
      if (!res.code) {
        const msg = data.id ? 'Cập nhật dữ liệu thành công' : 'Đang chuyển hướng đến thêm mới bản ghi...'
        _showAlert({
          message: msg,
          timer: 1000,
          willClose: () => {
            if (!data.id) {
              window.location.href = `/app/category/${res.data.id}`
            } else {
              this.getCategoryDetailById(res.data.id)
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
  categoryListStore,
  categoryDetailStore
}