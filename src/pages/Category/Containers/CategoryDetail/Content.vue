<template>
  <div class="row">
    <div class="col-12 col-sm-12" v-if="store.item && store.item.id">
      <div class="card card-primary">
        <!-- /.card-header -->
        <!-- form start -->
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="name">Trạng thái &nbsp;</label>
              <span class="color-palette" :class="store.item.vStatus.class"> {{ store.item.vStatus.name }}</span>
            </div>
            <div class="form-group" v-if="store.item.status != 1">
              <label for="status">Xuất bản ngay</label> <ToggleSwitch v-model="dataUpdate.isActive" />
            </div>
            <div class="form-group">
              <label for="name">Tên sản phẩm</label>
              <input
                type="text"
                class="form-control"
                :class="
                  store.validation.name.error
                    ? 'is-invalid'
                    : store.onChecks.includes('name')
                    ? 'is-valid'
                    : ''
                "
                id="name"
                v-model="dataUpdate.name"
                @input="
                  store.validationCategoryForm('name', dataUpdate.name)
                "
                placeholder="Điền tên sản phẩm"
                minlength="5"
                maxlength="255"
              />
              <span
                id="name-error"
                class="error"
                :style="
                  store.validation.name.error
                    ? 'display: block'
                    : 'display: none'
                "
                >{{ store.validation.name.error }}</span
              >
            </div>
            <div class="form-group" v-if="dataUpdate.slug">
              <label for="name">Slug</label>
              <input
                type="text"
                class="form-control"
                id="slug"
                v-model="dataUpdate.slug"
                placeholder="Điền tên slug"
              />
            </div>
            <div class="form-group">
              <label for="shortDesc">Mô tả ngắn</label>
              <input
                type="text"
                class="form-control"
                id="shortDesc"
                v-model="dataUpdate.shortDesc"
                placeholder="Điền mô tả ngắn"
              />
            </div>
            <div class="form-group">
              <label for="name">Ảnh đại diện</label>
              <UploadFile
                :modelId="'coverId'"
                :uploadEndpoint = "uploadEndpoint"
                :fileIds = "dataUpdate.coverId"
                :callbackResult = "updateCover"
              />
            </div>
            <div class="form-group">
              <label for="name">Danh mục cha</label>
              <tree
              :nodes="nodes"
              :config="config"
              @nodeChecked="selectedParentId"></tree>
            </div>
            <div class="form-group">
              <label for="fullDesc">Nội dung</label>
              <input
                type="text"
                class="form-control"
                id="fullDesc"
                v-model="dataUpdate.fullDesc"
                placeholder="Điền nội dung"
              />
            </div>
            <button
              type="button"
              class="btn btn-primary"
              :class="!store.isValid ? '' : ''"
              @click="store.saveCategory(dataUpdate, Gcf)"
            >
              {{ store.item.updatedAt ? "Cập nhật" : "Thêm mới" }}
            </button>
          </form>
        </div>
      </div>
    </div>
    <LabelText v-else text="Danh mục không tồn tại" />
  </div>
</template>
<script>
import { defineComponent } from "vue"
import { mapStores } from "pinia"
import { categoryDetailStore } from "./../../../../stores/modules/categoryStore"
import { commonRefsStore } from './../../../../stores/modules/commonStore'
import mediaResource from "./../../../../webServices/resources/mediaResource"
export default defineComponent({
  props: {},
  data() {
    return {
      uploadEndpoint: mediaResource.FILE_UPLOAD_API.url,
      dataUpdate:  {
        id: null,
        name: null,
        slug: null,
        shortDesc: null,
        fullDesc: null,
        coverId: null,
        parentId: '',
        tab: "basic",
        isActive: false,
        status: 2,
        parentId: ''
      },
      categories: [
        {
          id: '',
          name: 'Lựa chọn',
          label: 'Lựa chọn'
        }
      ],
      nodes: {
      },
      config: {
        roots: [],
        checkboxes: true,
        dragAndDrop: true,
        editable: true,
      },
    };
  },
  components: {
  },
  setup(props) {},
  computed: {
    /** pina store inject */
    ...mapStores(categoryDetailStore, commonRefsStore),
    tables() {
      return this.categoryListStore.dataTable;
    },
    id() {
      return this.$route.params.id;
    },
    store() {
      return this.categoryDetailStore;
    },
  },
  methods: {
    selectedParentId(s) {
      let keys = Object.keys(this.nodes)
      for(let i = 0; i < keys.length; i++) {
        if (keys[i] != s.id && this.nodes[keys[i]].state) {
          this.nodes[keys[i]].state.checked = false
        }
      }
      this.dataUpdate.parentId = s.id
    },
    updateCover({ids, modelId, multiple}) {
      if (multiple) {
        this.dataUpdate[modelId] = ids.length ? ids : null
      } else {
        this.dataUpdate[modelId] = ids.length ? ids [0] : null
      }
    }
  },
  beforeRouteLeave(to, from) {
    this.categoryDetailStore.item = {};
  },
  async created() {
    var me = this
    await this.commonRefsStore.getCommonRefs()
    if (this.commonRefsStore.commonRefs) {
      me.categories = [...me.categories, ...this.commonRefsStore.commonRefs.category]
    }
    await this.categoryDetailStore.getCategoryParentList(this.id);
    me.nodes = this.categoryDetailStore.ref.categoryParentList
    me.config.roots = Object.keys(this.categoryDetailStore.ref.categoryParentList)
    await this.categoryDetailStore.getCategoryDetailById(this.id, this.Gcf);
    if (this.categoryDetailStore.item.id) {
      me.dataUpdate = this.categoryDetailStore.item
      me.dataUpdate.isActive = this.dataUpdate.status == 1 ? true : false
    }
  },
  mounted() {
    var me = this
    $(document).ready(function () {
      setTimeout(function() {
        me.Gcf._editorInit("#fullDesc", "fullDesc", me.dataUpdate)
      }, 1000)
    });
  }
});
</script>
