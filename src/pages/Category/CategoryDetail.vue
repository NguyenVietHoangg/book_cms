<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <CategoryDetailBreadcrum />
      <!-- /.container-fluid -->
    </section>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- /.row -->
        <CategoryDetailContent />
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
import { defineComponent } from "vue"
import { mapStores } from "pinia"
import { categoryDetailStore } from "./../../stores/modules/categoryStore"
import { commonRefsStore } from '../../stores/modules/commonStore'
import mediaResource from "./../../webServices/resources/mediaResource"
import CategoryDetailBreadcrum from "@/pages/Category/Containers/CategoryDetail/Breadcrum.vue"
import CategoryDetailContent from "@/pages/Category/Containers/CategoryDetail/Content.vue"
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
    CategoryDetailBreadcrum,
    CategoryDetailContent,
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
