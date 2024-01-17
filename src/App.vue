<script setup></script>
<template>
  <!-- Navbar -->
  <TopBar v-if="!ignoreLoadPartial"></TopBar>
  <LeftBar v-if="!ignoreLoadPartial"></LeftBar>
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
      ]
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
<style >
 .select2-hidden-accessible {
  word-wrap: normal;
  clip: rect(0 0 0 0) !important;
  white-space: nowrap !important; 
  padding: 0 !important;
  border: 1px solid #ced4da;
    min-height: calc(2.25rem + 2px);   
  }
  /* _____________________toasttt____________________ */
#toasttt {
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 999999;
}

.toasttt {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 2px;
  padding: 20px 0;
  min-width: 400px;
  max-width: 450px;
  border-left: 4px solid;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.08);
  transition: all linear 0.3s;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(calc(100% + 32px));
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOut {
  to {
    opacity: 0;
  }
}

.toasttt--success {
  border-color: #47d864;
}

.toasttt--success .toasttt__icon {
  color: #47d864;
}

.toasttt--info {
  border-color: #2f86eb;
}

.toasttt--info .toasttt__icon {
  color: #2f86eb;
}

.toasttt--warning {
  border-color: #ffc021;
}

.toasttt--warning .toasttt__icon {
  color: #ffc021;
}

.toasttt--error {
  border-color: #ff623d;
}

.toasttt--error .toasttt__icon {
  color: #ff623d;
}

.toasttt + .toasttt {
  margin-top: 24px;
}

.toasttt__icon {
  font-size: 24px;
}

.toasttt__icon,
.toasttt__close {
  padding: 0 16px;
}

.toasttt__body {
  flex-grow: 1;
}

.toasttt__title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.toasttt__msg {
  font-size: 14px;
  color: #888;
  margin-top: 6px;
  line-height: 1.5;
}

.toasttt__close {
  font-size: 20px;
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
</style>