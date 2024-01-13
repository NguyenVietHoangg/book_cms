<template>
  <div :class="classInput" @click="onClick">
    <div :class="classAlert">
      <button v-if="showClose" type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
      <h5>
        <i :class="titleIcon"></i> <span v-html="titleText"></span>
      </h5> 
      <p v-html="text"></p>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    classAlert: {
      type: String,
      default: 'alert alert-warning alert-dismissible text-center'
    },
    classInput: {
      type: String,
      default: 'col-12 col-sm-12'
    }, 
    showClose: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'success'
    },
    titleIcon: {
      type: String,
      default: null
    },
    titleText: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },
    onClick: {
      type: Function,
      default: function(data = {}) {
        console.log('handle click on text', data)
      }
    }
  },
  data() {
    return {
    };
  },
  components: {
  },
  setup(props) {},
  methods: {},
  created() {},
});
</script>
