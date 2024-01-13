<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>
              {{ !store.item.updatedAt ? "Thêm mới" : "Chỉnh sửa"
              }} BST
            </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item">
                <router-link to="/app/collection">Danh sách</router-link>
              </li>
              <li class="breadcrumb-item active">Sửa BST</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="container-fluid">
        <div class="card card-primary card-outline card-outline-tabs">
          <Tabs :tab="tab || '#basic'" />
          <div class="hiden" v-if="store.item && store.item.id">
            <!-- /.card-header -->
            <!-- form start -->
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label for="name">Trạng thái &nbsp;</label>
                  <span class="color-palette" :class="store.item.vStatus.class"> {{ store.item.vStatus.name }}</span>
                </div>
                <div class="form-group" v-if="store.item.status != 1">
                  <label for="status">Xuất bản ngay</label>
                  <ToggleSwitch v-model="dataUpdate.isActive" />
                </div>
                <div class="form-group">
                  <label for="name">Tên sản phẩm</label>
                  <input type="text" class="form-control" :class="
                          store.validation.name.error
                            ? 'is-invalid'
                            : store.onChecks.includes('name')
                            ? 'is-valid'
                            : ''
                        " id="name" v-model="dataUpdate.name" @input="
                          store.validationCollectionForm('name', dataUpdate.name)
                        " placeholder="Điền tên sản phẩm" minlength="5" maxlength="255" />
                  <span id="name-error" class="error" :style="
                          store.validation.name.error
                            ? 'display: block'
                            : 'display: none'
                        ">{{ store.validation.name.error }}</span>
                </div>
                <div class="form-group" v-if="dataUpdate.slug">
                  <label for="name">Slug</label>
                  <input type="text" class="form-control" id="slug" v-model="dataUpdate.slug" placeholder="Điền tên slug" />
                </div>
                <div class="form-group">
                  <label for="shortDesc">Mô tả ngắn</label>
                  <input type="text" class="form-control" id="shortDesc" v-model="dataUpdate.shortDesc" placeholder="Điền mô tả ngắn" />
                </div>
                <div class="form-group">
                  <label for="name">Ảnh đại diện</label>
                  <UploadFile :modelId="'coverId'" :uploadEndpoint="uploadEndpoint" :fileIds="dataUpdate.coverId" :callbackResult="updateCover" />
                </div>
                <div class="form-group">
                  <label for="fullDesc">Nội dung</label>
                  <input type="text" class="form-control" id="fullDesc" v-model="dataUpdate.fullDesc" placeholder="Điền nội dung" />
                </div>
                <button type="button" class="btn btn-primary" :class="!store.isValid ? '' : ''" @click="store.saveCollection(dataUpdate, Gcf)">
                  {{ store.item.updatedAt ? "Cập nhật" : "Thêm mới" }}
                </button>
              </form>
            </div>
          </div>
          <LabelText v-else text="Danh mục không tồn tại" />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {
    defineComponent
  } from "vue";
  import {
    useCollectionDetailStore
  } from "./../../stores/modules/collectionStore";
  import {
    commonRefsStore
  } from '../../stores/modules/commonStore'
  import mediaResource from "./../../webServices/resources/mediaResource"
  import Tabs from "@/containers/CollectionDetailPart/Tabs.vue"
  export default defineComponent({
    props: {},
    data() {
      return {
        collectionDetailStore: new useCollectionDetailStore(),
        commonRefsStore: new commonRefsStore(),
        uploadEndpoint: mediaResource.FILE_UPLOAD_API.url,
        dataUpdate: {
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
        categories: [{
          id: '',
          name: 'Lựa chọn',
          label: 'Lựa chọn'
        }],
        config: {
          roots: [],
          checkboxes: true,
          dragAndDrop: true,
          editable: true,
        },
      };
    },
    components: {
      Tabs
    },
    setup(props) {},
    computed: {
      id() {
        return this.$route.params.id;
      },
      store() {
        return this.collectionDetailStore;
      },
      tab() {
        return this.$route.hash
      }
    },
    methods: {
      updateCover({
        ids,
        modelId,
        multiple
      }) {
        if (multiple) {
          this.dataUpdate[modelId] = ids.length ? ids : null
        } else {
          this.dataUpdate[modelId] = ids.length ? ids[0] : null
        }
      }
    },
    beforeRouteLeave(to, from) {
      this.collectionDetailStore.item = {};
    },
    async created() {
      var me = this
      await this.commonRefsStore.getCommonRefs()
      if (this.commonRefsStore.commonRefs) {
        me.categories = [...me.categories, ...this.commonRefsStore.commonRefs.collection]
      }
      await this.collectionDetailStore.getCollectionParentList(this.id);
      me.config.roots = Object.keys(this.collectionDetailStore.ref.collectionParentList)
      await this.collectionDetailStore.getCollectionDetailById(this.id, this.Gcf);
      if (this.collectionDetailStore.item.id) {
        me.dataUpdate = this.collectionDetailStore.item
        me.dataUpdate.isActive = this.dataUpdate.status == 1 ? true : false
      }
    },
    mounted() {
      var me = this
      $(document).ready(function() {
        setTimeout(function() {
          me.Gcf._editorInit("#fullDesc", "fullDesc", me.dataUpdate)
        }, 1000)
      });
    }
  });
</script>