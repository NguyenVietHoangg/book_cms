import { defineStore } from "pinia";
import { _dataTable, _showAlert } from "../../configs/globalProperties";
import wsv from "../../webServices";
/**
 * lưu trữ Danh sách hiện tại
 */
export const menuStore = defineStore("menu", {
  state: () => ({
  }),
  actions: {
    async getMenu() {
      const res = await wsv.menuService.getMenu();
      this.db = res;
    },
  },
});

export default {
  menuStore,
};
