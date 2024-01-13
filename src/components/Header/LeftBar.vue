<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="/adminlte/index3.html" class="brand-link" target="_blank">
      <img src="/adminlte/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
        style="opacity: .8">
      <span class="brand-text font-weight-light">CMS</span>
    </a>
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul  class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          
          <li v-for="(value, key) in menu" :key="key" class="nav-item">
            <div v-if="value.parentMenuId == 0" >
              <router-link :to="value.url" style="position: relative;" class="nav-link">
              <span v-html="value.icon"></span>
              <p  >{{ value.name }} <i  class="fas fa-angle-left right"> </i> </p>
            </router-link>
             <ul class="nav nav-treeview" >
                <li v-for="(value2, key2) in menu" :key="key2"  class="nav-item">
                <router-link v-if="value2.parentMenuId === value.id"  :to="value2.url" class="nav-link">
                  <span  v-html="value2.icon"></span>
                  <p>{{ value2.name }}</p>
                </router-link>
              </li>
            </ul>
            </div>
            
    </li> 
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
import { defineComponent } from "vue";
import {menuStore} from "../../stores/modules/menuStore"
import { mapStores } from "pinia";

export default defineComponent({
  props: {
    item: {},
  },
  data(){
return {
  menu : {},
  parentMenu : false
}
  },
  computed: { ...mapStores(menuStore) },
  setup(props) { },
  async created() {
      await this.menuStore.getMenu()
      this.menu = this.menuStore.db.data 
      
  }
});
</script>
