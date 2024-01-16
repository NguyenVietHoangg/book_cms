<template>
  <aside style="height: 100vh;" class=" main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
   <div class="h-100 d-flex m-auto flex-column">
    <div class="mb-auto">
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
    </div>
    <p class="" @click="lognout()" style="cursor: pointer; color: #fff; padding: 24px;"><i class="fa-solid fa-right-from-bracket pr-3"></i> Logout</p>
   </div>
    
    <!-- /.sidebar -->
  </aside>
</template>
<script>
import { defineComponent } from "vue";
import {menuStore} from "../../stores/modules/menuStore"
import { mapStores } from "pinia";
import { authStore } from "../../stores/modules/authStore";

export default defineComponent({
  props: {
    item: {},
  },
  setup(props) { },
  data(){
return {
  menu : {},
  parentMenu : false
}
  },
  computed: { ...mapStores(menuStore,authStore) },
  setup(props) { },
 methods:{
   async lognout(){
     //await this.authStore.logout(localStorage.getItem("KEY_USER_STORAGE"))
    localStorage.removeItem("KEY_USER_STORAGE")
     this.$router.push('/auth');
    }
  },
  async created() {
    await this.setmenuStore.getMenu();
    this.menu = this.setmenuStore.db.data
  }
});
</script>
