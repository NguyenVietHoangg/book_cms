<template>
  <div class="content-wrapper">
    <div id="toasttt"></div>
    <section class="content-header">
      <div class="container-fluid">
        <h1>
          {{ "Phân quyền" }}
        </h1>
        <form></form>
        <div class="mt-3 p-4 bg-white round " style="max-height: 1000px; overflow-y: auto;">
          <table class="table table-striped text-center">
            <thead>
              <tr>
                <th>STT</th>
                <th>Quyền</th>
                <th>Admin</th>
                <th>Partner</th>
                <th>Seller</th>
                <th>Custom</th>
              </tr>
            </thead>
            <tbody style="max-height: 700px; overflow: scroll">
              <tr v-for="(value, key) in menuList" :key="key">
                <td>{{ key }}</td>
                <td>{{ value.route }}</td>
                <td>
                  <input
                    type="checkbox"
                    :name="key"
                    :checked="isCheckedAdmin(value)"
                    @change="handleCheckboxChange(value.id,2,$event)">
                </td>
                <td>
                  <input type="checkbox" :name="key"
                  :checked="isCheckedPartner(value)"
                  @change="handleCheckboxChange(value.id,3,$event)">
                </td>
                <td>
                  <input type="checkbox" :name="key"
                  :checked="isCheckedSeller(value)"
                  @change="handleCheckboxChange(value.id,4,$event)">
                </td>
                <td>
                  <input type="checkbox" :name="key" 

                  :checked="isCheckedCustom(value)"
                  @change="handleCheckboxChange(value.id,5,$event)">
                </td>
              </tr>
            </tbody>
          </table>        
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { permissionStore } from "../../stores/modules/permissionStore";
import { mapStores } from "pinia";
import {Toasttt} from  "../../static/toast"
export default defineComponent({
  props: {},
  data() {
    return {
      menuList: {},
      checkedItems: [],
    };
  },
  components: {},
  setup(props) {},
  computed: { ...mapStores(permissionStore) },
  methods: {
    isCheckedAdmin(data) {
      return data.groupIds.includes("2");
    },
    isCheckedPartner(data) {
      return data.groupIds.includes("3");
    },
    isCheckedSeller(data) {
      return data.groupIds.includes("4");
    },
    isCheckedCustom(data) {
      return data.groupIds.includes("5");
    },
    async handleCheckboxChange(permissionId,groupId,event) {
      const db = { permissionId: permissionId,groupId:groupId }
       const isChecked = event.target.checked;
      if(isChecked){
        await this.permissionStore.addRoleHasPermission(db);
        Toasttt({
            title: this.permissionStore.db.title,
            message: this.permissionStore.db.message,
            type: this.permissionStore.db.type,
            duration:this.permissionStore.db.duration,
          });
      } else{
        await this.permissionStore.deleteRoleHasPermission(db);
        Toasttt({
            title: this.permissionStore.db.title,
            message: this.permissionStore.db.message,
            type: this.permissionStore.db.type,
            duration:this.permissionStore.db.duration,
          });
      }

    },
  },
  async created() {
    await this.permissionStore.getPermissionList();
    if (
      this.permissionStore.db.code >= 200 &&
      this.permissionStore.db.code <= 300
    ) {
      console.log(this.permissionStore.db.data);
      this.menuList = this.permissionStore.db.data;
    } else {
      console.log("not okiiii");
    }
  },
  mounted() {},
});
</script>
<style scoped></style>
