<template>
  <div class="tab-pane fade" :class="isShow ? 'active show' : ''" id="custom-tabs-ref" role="tabpanel" aria-labelledby="custom-tabs-ref-tab">
    <form @submit.enter.prevent="">
      <div class="form-group">
        <label for="name">Danh mục</label>
        <select class="form-control select2 select2-hidden-accessible" v-model="dataUpdate.categoryIds" multiple id="categorySelect" @change="changeCategorySelection">
      <option v-for="category in commonRefsStore.commonRefs.category" :key="category.id" :value="category.id">
        {{ category.label }}
      </option>
    </select>
      </div>
      <div class="form-group">
        <label for="name">Bộ sưu tập</label>
        <select class="form-control select2 select2-hidden-accessible" v-model="dataUpdate.collectionIds" multiple id="collectionSelect" @change="changeCollectionSelection">
      <option v-for="collection in commonRefsStore.commonRefs.collection" :key="collection.id" :value="collection.id">
        {{ collection.label }}
      </option>
    </select>
      </div>
      <div class="form-group">
        <label for="name">Tags</label>
        <select class="form-control select2 select2-hidden-accessible" v-model="dataUpdate.tagIds" multiple id="tagSelect" @change="changeTagSelection">
      <option v-for="tag in commonRefsStore.commonRefs.tag" :key="tag.id" :value="tag.id">
        {{ tag.label }}
      </option>
    </select>
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
