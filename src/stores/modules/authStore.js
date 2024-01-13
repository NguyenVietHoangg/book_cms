import { defineStore } from "pinia";
import { _dataTable, _showAlert } from "../../configs/globalProperties";
import wsv from "../../webServices";
/**
 * lưu trữ Danh sách hiện tại
 */
export const authStore = defineStore("auth", {
  state: () => ({
    db: { a: "a" },
  }),
  actions: {
    async login(data = {}) {
      const res = await wsv.authService.getUser(data);
      this.db = res;
    },
    async checkRole(){
      
    }
  },
});

export default {
  authStore,
};
