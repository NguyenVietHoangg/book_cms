import {
  defineStore
} from 'pinia';
import { COMMON_REFS_STORE } from '../../configs/storeTypes'
import wsv from './../../webServices'

export const commonRefsStore = defineStore('commonRefs', {
  state: () => ({
    commonRefs: {}
  }),
  actions: {
    async getCommonRefs(filters, page = 1) {
      const res = await wsv.commonService.getCommonRefs(filters, page)
      if (!res.code) {
        this.commonRefs = res.data
      }
      
    },
  }
})
export default {
  commonRefsStore
}