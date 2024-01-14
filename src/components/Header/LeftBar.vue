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
            <router-link :to="value.href" style="position: relative;" class="nav-link">
              <i :class="value.icon"></i>
              <p  class="pl-2">{{ value.text }} <i  class="fas fa-angle-left right" v-if="value.children"> </i> </p>
            </router-link>
            <ul class= "pr-3 nav nav-treeview" >
                <li v-for="(children, i) in value.children" :key="i"  class="nav-item">
                <router-link  :to="children.href" class="nav-link">
                  <i :class="children.icon"></i>
                  <p class="pl-2">{{ children.text }}</p>
                </router-link>
              </li>
            </ul>
            
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
    await this.setmenuStore.getMenu();
    this.menu = this.setmenuStore.db.data
  }
});
</script>
