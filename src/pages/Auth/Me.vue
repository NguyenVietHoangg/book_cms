<template>
</template>
<script>
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  props: {
  },
  data() {
    return {
      
    };
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
     // Fetch user information from server using the stored token
     this.$axios.get('http://localhost:8080/user', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
    
      this.$router.push('/');
    })
    .catch(error => {
      console.error(error);
      // Redirect to login if not authenticated
      this.$router.push('/login');
    });
  }
});
</script>
