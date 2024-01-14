import { defineStore } from "pinia";
import { _dataTable, _showAlert } from "../../configs/globalProperties";
import wsv from "../../webServices";
/**
 * lưu trữ Danh sách hiện tại
 */
export const menuStore = defineStore("setmenu", {
  state: () => ({
    db: { a: "a" },
  }),
  actions: {
    async getMenu() {
      const res = await wsv.menuService.getMenu();
      this.db = res;
    },
    async setMenu(data = {}){
      console.log(123123);
      const res = await wsv.menuService.setMenu(data);
      this.db = res;
    }
  },
  
});

export default {
  menuStore,
};
