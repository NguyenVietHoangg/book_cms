<script setup></script>
<template>
  <!-- Navbar -->
  <TopBar v-if="!ignoreLoadPartial"></TopBar>
  <LeftBar  v-if="!ignoreLoadPartial"></LeftBar>
  <!-- /.navbar -->
  <!-- Content Wrapper. Contains page content -->
  <RouterView></RouterView>
  <!-- /.content-wrapper -->
  <!-- <Footer></Footer> -->
  <!-- /.navbar -->
  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->
</template>
<script>
import TopBar from "@/components/Header/TopBar.vue";
import LeftBar from "@/components/Header/LeftBar.vue";
import Footer from "@/components/Footer/Footer.vue";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    ignoreHeaderFooter: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
  },
  components: {
    TopBar,
    LeftBar,
    Footer,
  },
  data() {
    return {
      ignoreHeaderFooter: [
        'Auth',
        'Register',
        'Forget Password',
        'Reset Password',
        'Active User',
        'Request Active User',
        'Media List',
        'Exception',
      ],
    }
  },
  computed: {
    ignoreLoadPartial() {
      let name = this.$route.name;
      return this.ignoreHeaderFooter.includes(name)
    }
  },
  created() {

  }
});
</script>
<style scoped>

</style>
