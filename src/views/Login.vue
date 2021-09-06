<template>
  <div>
    <div class="row">
      <div class="col-lg-12 bg-gradient-primary">
        <div class="container">
          <!-- Outer Row -->
          <div class="row justify-content-center ">
            <div class="col-xl-5 col-lg-12 col-md-9">
              <div class="card o-hidden border-0 shadow-lg my-5">
                <div class="card-body p-0">
                  <!-- Nested Row within Card Body -->
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="p-5">
                        <div class="text-center">
                          <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                        </div>
                        <form @submit.prevent="login">
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control form-control-user"
                              id="exampleInputEmail"
                              v-model="email"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                            />
                          </div>
                          <div class="form-group">
                            <input
                              type="password"
                              class="form-control form-control-user"
                              v-model="password"
                              id="exampleInputPassword"
                              placeholder="Password"
                            />
                          </div>
                          <button
                            class="btn btn-primary btn-user btn-block"
                            type="submit"
                          >
                            Login
                          </button>
                        </form>
                        <hr />
                        <div class="text-center">
                          <a class="small" href="forgot-password.html"
                            >Forgot Password?</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let loading = this.$loading.show();
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          () => {
            loading.hide();
            this.$router.push({
              name: "Dashboard",
            });
    
          },
          (error) => {
            loading.hide();
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Invalid Email or password !",
            });
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
    },
  },
};
</script>
<style scoped>
.bg-gradient-primary {
  width: 100% !important;
  height: 100vh !important;
}
</style>
