<template>
  <div class="login-page" style="min-height: 496.781px">
    <div class="login-box">
      <div class="login-logo">
        <a href="../../index2.html"><b>Admin</b>LTE</a>
      </div>

      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Sign in to start your session</p>
          <form action="../../index3.html" method="post">
            <div
              v-if="this.validate.error"
              class="alert alert-danger"
              role="alert"
            >
              Account or password is incorrect
            </div>
            <div class="mb-3">
              <div class="input-group">
                <input
                  type="email"
                  class="form-control"
                  :class="[validate.isValidEmail ? '' : 'border-err ']"
                  placeholder="Email"
                  @input="validateEmail"
                  v-model="user.email"
                />
                <div class="input-group-append">
                  <div
                    class="input-group-text"
                    :class="[validate.isValidEmail ? '' : 'border-err ']"
                  >
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <p class="msg-err">
                {{ validate.isValidEmail ? "" : "Email khong hop le" }}
              </p>
            </div>

            <div class="mb-3">
              <div class="input-group mt-6">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="user.password"
                  @input="validatePass"
                  :class="[validate.isValidPass ? '' : 'border-err ']"
                />
                <div class="input-group-append">
                  <div
                    class="input-group-text"
                    :class="[validate.isValidPass ? '' : 'border-err ']"
                  >
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <p class="msg-err">
                {{ validate.isValidPass ? "" : "Mat khau tren 6 ky tu" }}
              </p>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    v-model="user.password"
                    @input="validatePass"
                  />
                  <label for="remember "> Remember Me </label>
                </div>
              </div>

              <div class="col-4">
                <button
                  type="button"
                  @click="SubmitEvent"
                  class="btn btn-primary btn-block"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
          <div class="social-auth-links text-center mb-3">
            <p>- OR -</p>
            <a href="#" class="btn btn-block btn-primary">
              <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
            </a>
            <a href="#" class="btn btn-block btn-danger">
              <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
            </a>
          </div>

          <p class="mb-1">
            <a href="forgot-password.html">I forgot my password</a>
          </p>
          <p class="mb-0">
            <a href="register.html" class="text-center"
              >Register a new membership</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { authStore } from "../../stores/modules/authStore";
export default defineComponent({
  props: {},
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      validate: {
        isValidEmail: true,
        isValidPass: true,
        error: false,
      },
    };
  },
  components: {},
  setup(props) {},
  computed: { ...mapStores(authStore) },
  methods: {
    validateEmail() {
      this.validate.isValidEmail =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
          this.user.email
        );
    },

    validatePass() {
      this.validate.isValidPass = this.user.password.length >= 2;
    },
    async SubmitEvent() {
      try {
        this.validateEmail();
        this.validatePass();
        if (
          this.validate.isValidEmail === true &&
          true === this.validate.isValidPass
        ) {
          await this.authStore.login(this.user);

          if (this.authStore.db.code >= 200 && this.authStore.db.code <= 300) {
            localStorage.setItem("KEY_USER_STORAGE", this.authStore.db.message);
         //  await this.authStore.checkRole();
         
            this.$router.push('/');
          } else {
            this.validate.error = true;
          }
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  },
  created() {},
});
</script>
<style scoped>
.icheck-primary label {
  margin: 0px 4px !important;
}
.msg-err {
  font-size: 12px;
  color: red;
}
.border-err {
  border-color: red !important;
}
</style>
