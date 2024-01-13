<template>
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <CategoryBreadcrum />
      <!-- /.container-fluid -->
    </section>
    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- /.row -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <!-- actions: change status, add, delete...-->
              <CategoryHeader />
              <!-- block search data-->
              <CategorySearch />
              <!-- block fill data on table-->
              <CategoryTable />
            </div>
            <!-- /.card -->
          </div>
        </div>
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
import { categoryListStore, categoryDetailStore } from '../../stores/modules/categoryStore'
import CategoryBreadcrum from "@/pages/Category/Containers/CategoryList/Breadcrum.vue"
import CategoryHeader from "@/pages/Category/Containers/CategoryList/Header.vue"
import CategorySearch from "@/pages/Category/Containers/CategoryList/Search.vue"
import CategoryTable from "@/pages/Category/Containers/CategoryList/Table.vue"

export default defineComponent({
  props: {
  },
  data() {
    return {
      idsChecked: [],
      isCheckAll: false,
      loading: true
    };
  },
  components: {
    CategoryBreadcrum,
    CategoryHeader,
    CategorySearch,
    CategoryTable,
  },
  computed: {
    /** pina store inject */
    ...mapStores(categoryListStore, categoryDetailStore),
    tab() {
      let value = this.$route.hash || ''
      return value
    },
  },
  methods: {
    handleInputKeySearch(e) {
      if (!e.target.value) {
        this.categoryListStore.getListPager()
      }
    },
    changeStatus(status) {
      this.categoryListStore.changeStatus(status)
      this.categoryListStore.idsChecked = []
    },
  },
  created() {
  },
});
</script>
