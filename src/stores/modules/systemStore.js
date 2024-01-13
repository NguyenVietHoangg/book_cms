import {
  defineStore
} from 'pinia';
import { SYSTEM_STORE } from '../../configs/storeTypes'

export const useSystemStore = defineStore(SYSTEM_STORE, {
  state: () => ({
    loading : {
      splashWaiting: false
    },
    alertRightBottomLabel: {
      showAlert: false,
      msg: 'Test thử component alert ...',
      bgColor: 'btn-primary',
      timeShow: 4000,
      timeStart: 0
    },
  }),
  actions: {
    
  }
})
export default {
  useSystemStore
}