import { defineStore } from "pinia";
import { _dataTable, _showAlert } from "../../configs/globalProperties";
import wsv from "../../webServices";
/**
 * lưu trữ Danh sách hiện tại
 */
export const permissionStore = defineStore("permission", {
  state: () => ({
    db: { a: "a" },
  }),
  actions: {
    async getPermissionList(){
      const res = await wsv.permissionService.getPermission()
      this.db = res;
    }
  },
  
});

export default {
  permissionStore,
};
