import {
  defineStore
} from 'pinia';
import { SETTING_DETAIL_STORE } from '../../configs/storeTypes'
import { _showAlert } from '../../configs/globalProperties'
import wsv from '../../webServices'
export const useSettingAppStore = defineStore(SETTING_DETAIL_STORE, {
  state: () => ({
    loading: true,
    appInfo : {
      tab_info: [],
      tab_social: []
    },
    filters: {
      keySearch: null,
      status: '',
      tab: '',
      page: 1
    },
    opts: {},
  }),
  actions: {
    async getSettingApp() {
      const res = await wsv.settingService.getSettingAppInfo()
      if (!res.code) {
        this.appInfo = { ...this.appInfo, ...res.data }
      }
      this.loading = false
    },
    async updateSettingApp(ids, status) {
      await wsv.settingService.updateSettingApp()
    },
    async getPermissionList(){
      const res = await wsv.settingService.getPermission()
    }
  }
})

export default {
  useSettingAppStore
}