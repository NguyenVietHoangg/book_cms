<template>
  <div class="tab-pane fade" :class="isShow ? 'active show' : ''" id="custom-tabs-home" role="tabpanel" aria-labelledby="custom-tabs-home-tab">
    <form @submit.enter.prevent="">
      <div class="form-group">
        <label for="name">Trạng thái &nbsp;</label>
        <span class="color-palette" :class="store.item.vStatus.class"> {{ store.item.vStatus.name }}</span>
      </div>
      <div class="form-group" v-if="store.item.status != 1">
        <label for="status">Xuất bản ngay</label> <ToggleSwitch v-model="dataUpdate.isActive" />
      </div>
      <div class="form-group">
        <label for="name">Tên sản phẩm</label>
        <input type="text" class="form-control" :class="store.validation.name.error ? 'is-invalid' : store.onChecks.includes('name') ? 'is-valid' : ''" id="name" v-model="dataUpdate.name" @input="store.validationProductForm('name', dataUpdate.name)" placeholder="Điền tên sản phẩm" minlength="5" maxlength="255">
        <span id="name-error" class="error" :style="store.validation.name.error ? 'display: block' : 'display: none'">{{store.validation.name.error}}</span>
      </div>
      <div class="form-group" v-if="dataUpdate.slug">
        <label for="name">Slug</label>
        <input type="text" class="form-control" id="slug" v-model="dataUpdate.slug" placeholder="Điền tên slug">
      </div>
      <div class="form-group">
        <label for="shortDesc">Mô tả ngắn</label>
        <input type="text" class="form-control" id="shortDesc" v-model="dataUpdate.shortDesc" placeholder="Điền mô tả ngắn">
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
        <label for="name">Danh sách ảnh sản phẩm</label>
        <UploadFile 
          :modelId="'imageListIds'"
          :uploadEndpoint = "uploadEndpoint"
          :fileIds = "dataUpdate.imageListIds"
          :callbackResult = "updateCover"
          :multiple="true"
        />
      </div>
      <div class="form-group">
        <label for="fullDesc">Nội dung</label>
        <input type="text" class="form-control" id="fullDesc" v-model="dataUpdate.fullDesc" placeholder="Điền nội dung">
      </div>
      <button type="button" class="btn btn-primary" :class="!store.isValid ? '' : ''" @click="store.saveProduct(dataUpdate, Gcf)">{{store.item.updatedAt ? 'Cập nhật' : 'Thêm mới'}}</button>
    </form>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import mediaResource from "./../../webServices/resources/mediaResource"

export default defineComponent({
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    store: {
      type: Object
    }
  },
  data() {
    return {
      uploadEndpoint: mediaResource.FILE_UPLOAD_API.url,
      dataUpdate: {
        id: this.store.item.id || null,
        name: this.store.item.name,
        slug: this.store.item.slug,
        shortDesc: this.store.item.shortDesc,
        fullDesc: this.store.item.fullDesc,
        coverId: this.store.item.coverId || null,
        imageListIds: this.store.item.imageListIds || null,
        tab: 'basic',
        isActive: this.store.item.status == 1 ? true : false,
        status: this.store.item.status
      }
    }
  },
  components: {
  },
  setup(props) {
  },
  computed: {
  },
  methods: {
    async saveProductDetail() {
      await this.store.updateProduct(this.dataUpdate)
    },
    updateCover({ids, modelId, multiple}) {
      if (multiple) {
        this.dataUpdate[modelId] = ids.length ? ids : null
      } else {
        this.dataUpdate[modelId] = ids.length ? ids [0] : null
      }
    }
  },
  created() {
  },
  mounted() {
    var me = this
    $(document).ready(function () {
      me.Gcf._editorInit("#fullDesc", "fullDesc", me.dataUpdate)
    });
  }
});
</script>
