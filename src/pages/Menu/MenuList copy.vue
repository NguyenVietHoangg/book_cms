<template>
  <div class="content-wrapper" style="padding: 0.5rem 0.5rem">
    <h1 class="menu_title">Quản lý Menu</h1>
    <div class="menu_content">
      <div class="menu_list">
        <h1 class="menu_title">Danh sách Menu</h1>
        <Draggable style="padding: 0 12px" v-model="treeData" treeLine>
          <template #default="{ node, stat }">
            <div class="menu_item">
              <div style="display: flex; align-items: center">
                <OpenIcon
                  v-if="stat.children.length"
                  :open="stat.open"
                  class="mtl-mr menu_item_icon"
                  @click.native="stat.open = !stat.open"
                />
                <i class="menu_item_icon" :class="node.icon"></i>
                <span class="mtl-ml menu_item_title">{{ node.text }}</span>
              </div>
              <div class="menu_item_action">
                <i class="menu_item_icon fa-solid fa-pen-to-square"></i>
                <i class="menu_item_icon fa-solid fa-trash"></i>
              </div>
            </div>
          </template>
        </Draggable>
      </div>
      <div class="menu_form">
        <h1 class="menu_title">Chức năng thêm/sửa Menu</h1>
        <form class="form_group">
          <div class="form_item">
            <label for="text">Text:</label>
            <input v-model="formData.text" type="text" id="text" required />
          </div>
          <div class="form_item">
            <label for="icon">Icon:</label>
            <input
              style="display: none"
              v-model="formData.icon"
              type="text"
              id="icon"
              required
            />
            <div class="" style="flex: 80%">
              <div
                class=""
                @click="handleShowSearch"
                style="
                  width: 100px;
                  position: relative;
                  display: flex;
                  justify-content: space-between;
                  border: 1px solid #000;
                "
              >
                <font-awesome-icon
                  style="padding: 5px; width: 20px; height: 20px"
                  :icon="[formData.icon.prefix, formData.icon.iconName]"
                />

                <font-awesome-icon
                  style="padding: 5px; width: 20px; height: 20px"
                  :icon="['fas', 'angle-down']"
                />
                <div
                
                 v-if="showSearch"
                  style="
                    width: 150px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    background-color: rgb(214, 214, 214);
                  "
                >
                  <input
                    v-model="searchIconInput"
                    style="width: 100%; font-size: 16px; margin-bottom: 12px"
                    type="text"
                  />
                  <div
                    class=""
                    style="
                      max-height: 500px;
                      overflow-y: auto;
                      display: flex;
                      flex-wrap: wrap;
                    "
                  >
                    <div
                      v-for="(icon, index) in searchIconInput != ''
                        ? dataSearch
                        : allIcons"
                      :key="index"
                      :value="icon.iconName"
                      @click="getIcon(icon.prefix, icon.iconName) && handleShowSearch()"
                    >
                      <font-awesome-icon
                        style="padding: 5px; width: 20px; height: 20px"
                        :icon="[icon.prefix, icon.iconName]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form_item">
            <label for="url">Tooltip:</label>
            <input v-model="formData.tooltip" type="text" id="url" />
          </div>
          <div class="form_item">
            <label for="url">URL:</label>
            <input v-model="formData.url" type="text" id="url" />
          </div>
          <div class="form_item">
            <label for="role">Role:</label>
            <input v-model="formData.role" type="text" id="role" required />
          </div>

          <div class="button_form">
            <button type="button">Update</button>
            <button type="button">Add</button>
          </div>
        </form>
      </div>
    </div>

    <button @click="showData">an vo day</button>
  </div>
</template>

<script>
import { BaseTree, Draggable, pro, OpenIcon } from "@he-tree/vue";
import "@he-tree/vue/style/default.css";
import "@he-tree/vue/style/material-design.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);

export default {
  components: { Draggable, OpenIcon, FontAwesomeIcon },
  data() {
    return {
      showSearch: false,
      searchIconInput: "",
      setIcon: {
        prefix: "fas",
        iconName: "align-justify",
      },
      dataSearch: {},
      allIcons: fas,
      formData: {
        text: "",
        icon: { prefix: "fas", iconName: "align-justify" },
        url: "",
        tooltip: "",
        role: "",
      },
      treeData: [
        {
          text: "Projects",
          icon: "fa-solid fa-house",
          url: "",
          role: "asasd",
        },
        { text: "Photos", icon: "fa-solid fa-user", url: "", role: "asasd" },
        { text: "Videos", icon: "fa-solid fa-image", url: "", role: "asasd" },
      ],
    };
  },

  methods: {
    showData() {
      this.dataSearch = Object.entries(this.allIcons).reduce(
        (acc, [key, value]) => {
          // Điều kiện lọc, ví dụ chỉ giữ các thuộc tính có giá trị là chuỗi
          if (value.iconName.includes(this.searchIconInput)) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      console.log(this.allIcons);

      console.log(this.dataSearch);
    },
    handleShowSearch(){
      this.showSearch = !this.showSearch
    },
    getIcon(prefix, iconName) {
      this.formData.icon.prefix = prefix;
      this.formData.icon.iconName = iconName;    },
   
  },
};
</script>
<style scoped>
.menu_title {
  padding: 15px 0.5rem;
  font-size: 1.8rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  color: inherit;
}
.menu_content {
  display: flex;
  gap: 20px;
  padding: 15px 0.5rem;
}
.menu_list {
  flex: 50%;

  background-color: #fff;
  padding: 15px;
}
.menu_item {
  width: 100%;
  padding: 8px 0px;
  display: flex;
  justify-content: space-between;
}
.menu_item_icon {
  font-size: 18px;
}
.menu_item_title {
  margin-left: 20px;
}
.menu_item_title {
  font-size: 1.6rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  color: inherit;
}

.menu_item_action i {
  padding: 8px;
}
.menu_item_action i:first-child {
  margin-right: 10px;
  background-color: rgb(41, 41, 235);
  color: #fff;
  cursor: pointer;
}
.menu_item_action i:last-child {
  margin-right: 10px;
  background-color: rgb(194, 4, 36);
  color: #fff;
  cursor: pointer;
}
.menu_form {
  flex: 50%;
  background-color: #fff;
  padding: 15px;
}
.form_group {
  margin: 0 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form_item {
  display: flex;
  align-items: center;
  font-size: 18px;
}
.form_item label {
  margin: 0;
  flex: 20%;
}
.form_item input {
  flex: 80%;
}
.button_form button {
  width: 150px;
  height: 40px;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  border: none;
}
.button_form button:hover {
  opacity: 80%;
}
.button_form button:first-child {
  background-color: rgb(41, 41, 235);
}
.button_form button:last-child {
  margin-left: 20px;
  background-color: rgb(52, 173, 41);
}
</style>
