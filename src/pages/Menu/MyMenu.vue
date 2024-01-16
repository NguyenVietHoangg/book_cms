<!-- File: MyMenuEditor.vue -->
<template>
  <div class="content-wrapper" style="padding: 0.5rem 0.5rem">
    <div class="row p-3">
      <div class="col-8">
        <ul id="myEditor" class="sortableLists list-group"></ul>
      </div>
      <div class="card border-primary p-0 col-4">
        <div class="card-header bg-primary text-white">Edit item</div>
        <div class="card-body">
          <form id="frmEdit" class="form-horizontal">
            <div class="form-group">
              <label for="text">Text</label>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control item-menu"
                  name="text"
                  id="text"
                  placeholder="Text"
                />
                <div class="input-group-append">
                  <button
                    type="button"
                    id="myEditor_icon"
                    class="btn btn-outline-secondary"
                  ></button>
                </div>
              </div>
              <input type="hidden" name="icon" class="item-menu" />
            </div>
            <div class="form-group">
              <label for="href">URL</label>
              <input
                type="text"
                class="form-control item-menu"
                id="href"
                name="href"
                placeholder="URL"
              />
            </div>
            <div class="form-group">
              <label for="target">Target</label>
              <select name="target" id="target" class="form-control item-menu">
                <option value="_self">Self</option>
                <option value="_blank">Blank</option>
                <option value="_top">Top</option>
              </select>
            </div>
            <div class="form-group">
              <label for="title">Tooltip</label>
              <input
                type="text"
                name="title"
                class="form-control item-menu"
                id="title"
                placeholder="Tooltip"
              />
            </div>
            <div class="form-group">
              <label for="role">Role</label>
              <input
                type="text"
                name="role"
                class="form-control item-menu"
                id="role"
                placeholder="role"
              />
            </div>
          </form>
        </div>
        <div class="card-footer">
          <button
            type="button"
            @click="updateData()"
            id="btnUpdate"
            class="btn btn-primary"
            disabled
          >
            <i class="fas fa-sync-alt"></i> Update
          </button>
          <button
            type="button"
            @click="addData()"
            id="btnAdd"
            class="btn btn-success ml-2"
          >
            <i class="fas fa-plus"></i> Add
          </button>
          <button
            type="button"
            @click="SubmitEvent()"
            id="btn"
            class="btn btn-success ml-2"
          >
            <i class="fas fa-plus"></i> Save Menu
          </button>
      
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import "../../static/bootstrap-iconpicker/js/jquery.js";
import "../../static/bootstrap-iconpicker/css/bootstrap-4.css";

import "../../static/bootstrap-iconpicker/css/fontawesome.css";
import "../../static/bootstrap-iconpicker/css/bootstrap-iconpicker.min.css";

import "../../static/bootstrap-iconpicker/js/iconset/fontawesome5-3-1.min.js";
import "../../static/bootstrap-iconpicker/js/ bootstrap.bundle.min.js";

import "../../static/bootstrap-iconpicker/js/bootstrap-iconpicker.min.js";
import { menuEditor } from "../../static/bootstrap-iconpicker/js/jquery-menu-editor.min.js";

import { mapStores } from "pinia";
import { menuStore } from "../../stores/modules/menuStore";

export default defineComponent({
  props: {
    item: {},
  },
  setup(props) { },
  data() {
    return {
      editor: {},
      arrayjson: [],
      my:[1,2,3]
    };
  },
  async mounted() {
    var iconPickerOptions = { searchText: "Buscar...", labelHeader: "{0}/{1}" };
    // sortable list options
    var sortableListOptions = {
      placeholderCss: { "background-color": "#cccccc" },
    };
    this.editor = new menuEditor("myEditor", {
      listOptions: sortableListOptions,
      iconPicker: iconPickerOptions,
      maxLevel: 2, // (Optional) Default is -1 (no level limit)
      // Valid levels are from [0, 1, 2, 3,...N]
    });
    this.editor.setForm($("#frmEdit"));
    this.editor.setUpdateButton($("#btnUpdate"));
    //Calling the update method
    //const a =   Object.values( this.arrayjson)
    //this.arrayjson = [{"href":"http://home.com","icon":"fas fa-home","text":"Home", "target": "_top", "title": "My Home"},{"icon":"fas fa-chart-bar","text":"Opcion2"},{"icon":"fas fa-bell","text":"Opcion3"},{"icon":"fas fa-crop","text":"Opcion4"},{"icon":"fas fa-flask","text":"Opcion5"},{"icon":"fas fa-map-marker","text":"Opcion6"},{"icon":"fas fa-search","text":"Opcion7","children":[{"icon":"fas fa-plug","text":"Opcion7-1","children":[{"icon":"fas fa-filter","text":"Opcion7-1-1"}]}]}];
  
    
  },
  computed: { ...mapStores(menuStore) },
  methods: {
    updateData() {
      this.editor.update();
    },
    // Calling the add method
    addData() {
      this.editor.add();
      console.log(this.editor.getString());
    },
    async SubmitEvent() {
      try {
        await this.setmenuStore.setMenu( this.editor.getString());
        console.log(this.setmenuStore.db.code);
        if (
          this.setmenuStore.db.code >= 200 &&
          this.setmenuStore.db.code <= 300
        ) {
          console.log("okiiii");
        } else {
          console.log("not okiiii");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
    async SubmitEventMenu() {
      console.log(this.editor.getString())
     //await this.setmenuStore.getMenu();
    },
  },
  async created() {
    await this.setmenuStore.getMenu();
    this.arrayjson = this.setmenuStore.db.data
     this.editor.setData( this.arrayjson);

  },
});
</script>

<style>
/* Các quy tắc CSS tương ứng cho component của bạn */
</style>
