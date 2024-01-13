<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>
              {{ "Cấu hình webapp" }}
            </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/app/setting-general">Cấu Hình</router-link>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content setting-general">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 col-sm-12">
            <div class="card card-primary card-outline card-outline-tabs">
              <div class="card-header p-0 border-bottom-0">
                <ul class="nav nav-tabs" id="custom-tabs-tab" role="tablist">
                  <li class="nav-item">
                    <a class="nav-link" :class="tab == '#basic' ? 'active' : ''" id="custom-tabs-basic-tab" href="#basic" role="tab" aria-controls="custom-tabs-basic" aria-selected="false" @click="changeTab('#basic')">Thông tin chung</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" :class="tab == '#social' ? 'active' : ''" id="custom-tabs-basic-tab" href="#social" role="tab" aria-controls="custom-tabs-basic" aria-selected="false" @click="changeTab('#social')">Mạng xã hội</a>
                  </li>
                </ul>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <div class="card-body">
                <div class="tab-content" id="custom-tabs-tabContent">
                  <div class="tab-pane fade" :class="tab == '#basic' ? 'active show' : ''" id="custom-tabs-home" role="tabpanel" aria-labelledby="custom-tabs-home-tab" v-if="settingAppStore.appInfo.tab_info && settingAppStore.appInfo.tab_info.length">
                    <div class="row" v-for="item in settingAppStore.appInfo.tab_info" :key="item.key">
                      <div class="col-11 col-sm-11">
                        <div class="form-group">
                          <label for="name">{{ item.name }}</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="item.id"
                            placeholder="Điền tên slug"
                          />
                        </div>
                      </div>
                      <div class="col-1 col-sm-1">
                        <div class="form-group">
                          <ToggleSwitch :id="item.id" v-model="item.status" :class="'toggle-setting'" :title="'Trạng thái'"/>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="saveSetting(dataUpdate, Gcf)"
                    >
                      {{ "Cập nhật" }}
                    </button>
                  </div>
                  <div class="tab-pane fade" :class="tab == '#social' ? 'active show' : ''" id="custom-tabs-ref" role="tabpanel" aria-labelledby="custom-tabs-ref" v-if="settingAppStore.appInfo.tab_social && settingAppStore.appInfo.tab_social.length">
                    <div class="row" v-for="item in settingAppStore.appInfo.tab_social" :key="item.key">
                      <div class="col-11 col-sm-11">
                        <div class="form-group">
                          <label for="name">{{item.name}}</label>
                          <input
                            type="text"
                            class="form-control"
                            v-model="item.id"
                            placeholder="Điền tên slug"
                          />
                        </div>
                      </div>
                      <div class="col-1 col-sm-1">
                        <div class="form-group">
                          <ToggleSwitch :id="item.id" v-model="item.status" :class="'toggle-setting'" :title="'Trạng thái'"/>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click="saveSetting(dataUpdate, Gcf)"
                    >
                      {{ "Cập nhật" }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useSettingAppStore } from '../../stores/modules/settingStore'

export default defineComponent({
  props: {},
  data() {
    return {
      currentTab: '#basic',
      dataUpdate: {
      },
      settingAppStore: new useSettingAppStore(),
    };
  },
  components: {
  },
  setup(props) {},
  computed: {
    id() {
      return this.$route.params.id;
    },
    tab() {
      return this.$route.hash || this.currentTab
    }
  },
  methods: {
    changeTab(tabSet = this.currentTab) {
      this.currentTab = tabSet
    }
  },
  beforeRouteLeave(to, from) {
  },
  async created() {
    var me = this;
    me.settingAppStore.getSettingApp()
  },
  mounted() {
    var me = this;
    $(document).ready(function () {
      setTimeout(function () {
        me.Gcf._editorInit("#fullDesc", "fullDesc", me.dataUpdate);
      }, 1000);
    });
  },
});
</script>
<style scoped>
  .toggle-setting {
    position: relative;
    top: 39px;
  }
</style>
