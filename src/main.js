import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Treeselect from 'vue3-treeselect'
import Paginate from 'vuejs-paginate-next'
import Multiselect from '@vueform/multiselect'
import router from './routers'
import App from './App.vue'
import store from './stores'
import globalProperties from './configs/globalProperties'
import LabelText from "@/components/LabelText/LabelText.vue"
import ToggleSwitch from '@vueform/toggle'
import UploadFile from "@/components/UploadFile/UploadFile.vue"
import VueMultiselect from 'vue-multiselect'
import FileManager from "@/components/FileManager/FileManager.vue"

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './static/fontawesome-free-6/css/all.min.css'
import '@vueform/multiselect/themes/default.css'
import 'vue3-treeselect/dist/vue3-treeselect.css'
import '@vueform/toggle/themes/default.css'
import 'vue-multiselect/dist/vue-multiselect.css'



const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

var app = createApp(App);
app.component('Treeselect', Treeselect);
app.component('Multiselect', Multiselect);
app.component('Paginate', Paginate);
app.component('LabelText', LabelText);
app.component('ToggleSwitch', ToggleSwitch);
app.component('UploadFile', UploadFile);
app.component('VueMultiselect', VueMultiselect);
app.component('FileManager', FileManager);


app.use(pinia)
  .use(router)
  .use(store)
app.config.globalProperties.Gcf = globalProperties
app.mount('#root')
