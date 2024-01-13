<template>
    <div class="form-group">
        <label for="name">Ảnh đại diện</label>
        <div class="row">
            <div class="col-sm-6">
                <div class="input-group">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="exampleInputFile">
                        <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                    </div>
                    <div class="input-group-append">
                        <span class="input-group-text">Upload</span>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="input-group-append">
                    <span class="input-group-text">Open FileManager</span>
                </div>
            </div>
        </div>
        <div class="row mt-4">
          <div class="col-sm-2">
            <div class="position-relative">
              <img src="/adminlte/dist/img/photo1.png" alt="Photo 1" class="img-fluid">
              <div class="ribbon-wrapper ribbon-lg">
                <div class="ribbon bg-primary text-lg">
                  Cover
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
  },
  data() {
    return {
    }
  },
  components: {
  },
  setup(props) {
    
  },
  computed: {

  },
  methods: {
  },
  created() {
  }
});
</script>
