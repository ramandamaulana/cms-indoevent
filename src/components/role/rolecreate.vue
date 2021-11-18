<template>
  <div class="home">
    <div id="main">
      <div id="wrapper">
        <Sidebar />
        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
          <!-- Main Content -->
          <div id="content">
            <Navbar />
            <!-- Begin Page Content -->
            <div class="container-fluid">
              <!-- Page Heading -->
              <div class="row">
                <div class="col-lg-12">
                  <div class="card">
                    <div class="card-header">
                      <h3 style="font-size:Nunito; font-size:18px;">
                        Tambah Role
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Role</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="role.name"
                                  @blur="$v.role.name.$touch()"
                                />
                                <div v-if="$v.role.name.$error">
                                  <p
                                    v-if="!$v.role.name.required"
                                    class="text-danger mt-1"
                                  >
                                    Role Role Wajib Di isi
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form-group text-center">
                          <a
                            class="btn btn-warning mr-3"
                            @click="$router.go(-1)"
                          >
                            Batal
                          </a>
                          <button
                            type="submit"
                            :disabled="$v.$anyError"
                            class="btn btn-primary"
                          >
                            Submit
                          </button>
                          <p v-if="$v.$anyError" class="text-danger mt-3">
                            Tolong isi fill yang kosong
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.container-fluid -->
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.form-control {
  border-radius: 4px;
}
</style>
<script>
import router from "@/router";
import Navbar from "../layout/navbar.vue";
import Sidebar from "../layout/sidebar.vue";
import Footer from "../layout/footer";
import Roleservice from "../../service/role.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      role: {
        name: "",
      },
    };
  },
  validations: {
    role: {
      name: { required },
    },
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      let params = {
        name: this.role.name,
      };
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Roleservice.postCrated(params)
          .then((response) => {
            loading.hide();
            console.log(response.data, "Berhasil Di tambahkan");
            router.back();
          })
          .catch((error) => {
            loading.hide();
            console.log("Gagal Di tambahkan", error.response);
          });
      }
    },
  },
};
</script>
