<template>
  <div class="tab-pane fade" :class="isShow ? 'active show' : ''" id="custom-tabs-ref" role="tabpanel" aria-labelledby="custom-tabs-ref-tab">
    <form @submit.enter.prevent="">
      <div class="form-group">
        <label for="name">Danh mục</label>
        <Treeselect 
          v-model="dataUpdate.categoryIds"
          :multiple="true"
          :options="commonRefsStore.commonRefs.category" />
      </div>
      <div class="form-group">
        <label for="name">Bộ sưu tập</label>
        <Treeselect 
          v-model="dataUpdate.collectionIds"
          :multiple="true"
          :options="commonRefsStore.commonRefs.collection" />
      </div>
      <div class="form-group">
        <label for="name">Tags</label>
        <Treeselect 
          v-model="dataUpdate.tagIds"
          :multiple="true"
          :options="commonRefsStore.commonRefs.tag" />
      </div>
      <VueMultiselect
        v-model="selected"
        :options="options"
        :multiple="true"
        :taggable="true"
        @tag="addTag"
        tag-placeholder="Add this as new tag"
        placeholder="Type to search or add tag"
        label="name"
  track-by="code">
      </VueMultiselect>
      <button type="button" class="btn btn-primary" :class="!store.isValid ? '' : ''" @click="store.saveProduct(dataUpdate, Gcf)">{{store.item.updatedAt ? 'Cập nhật' : 'Thêm mới'}}</button>
    </form>
  </div>
</template>
<script>
import { defineComponent } from "vue"
import { commonRefsStore } from '../../stores/modules/commonStore'
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
      commonRefsStore: new commonRefsStore(),
      dataUpdate: {
        id: this.store.item.id || null,
        categoryIds: this.store.item.categoryIds || null,
        collectionIds: this.store.item.collectionIds || null,
        tagIds: this.store.item.tagIds || null,
        tab: 'ref'
      },
      selected: null,
      options: ['list', 'of', 'options']
    };
  },
  components: {
  },
  setup(props) {
    console.log('props', props.store)
  },
  computed: {},
  methods: {
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.taggingOptions.push(tag)
      this.taggingSelected.push(tag)
    },
  },
  created() {},
});
</script>
