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
                        Tambah Admin
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="admin.name"
                                  @blur="$v.admin.name.$touch()"
                                />
                                <div v-if="$v.admin.name.$error">
                                  <p
                                    v-if="!$v.admin.name.required"
                                    class="text-danger mt-1"
                                  >
                                    Nama Harus Di Isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="form-group">
                                <label for="exampleInputPassword1"
                                  >username</label
                                >
                                <input
                                  type="text"
                                  v-model="admin.username"
                                  class="form-control"
                                  id="exampleInputPassword1"
                                  @blur="$v.admin.username.$touch()"
                                />
                                <div v-if="$v.admin.username.$error">
                                  <p
                                    v-if="!$v.admin.username.required"
                                    class="text-danger mt-1"
                                  >
                                    Username Harus Di Isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12  mb-3">
                              <label for="exampleInputEmail1"
                                >Upload Image</label
                              >
                              <input
                                type="file"
                                accept="image/*"
                                @change="onFileChange"
                                class="form-control"
                                id="inputFile"
                                @blur="$v.admin.image.$touch()"
                              />
                              <div v-if="$v.admin.image.$error">
                                <p
                                  v-if="!$v.admin.image.required"
                                  class="text-danger mt-1"
                                >
                                  Upload Image Wajib Di Isi
                                </p>
                              </div>
                            </div>
                            <div class="col-lg-12 mt-2">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input
                                  type="email"
                                  v-model="admin.email"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  @blur="$v.admin.email.$touch()"
                                  aria-describedby="emailHelp"
                                />
                                <div v-if="$v.admin.email.$error">
                                  <p
                                    v-if="!$v.admin.email.email"
                                    class="text-danger mt-1"
                                  >
                                    Harus Berupa Email
                                  </p>
                                  <p
                                    v-if="!$v.admin.email.required"
                                    class="text-danger mt-1"
                                  >
                                    Email Harus Di isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="form-group">
                                <label for="exampleInputPassword1"
                                  >Password</label
                                >
                                <input
                                  type="password"
                                  v-model="admin.password"
                                  class="form-control"
                                  id="exampleInputPassword1"
                                  @blur="$v.admin.password.$touch()"
                                />
                                <div v-if="$v.admin.password.$error">
                                  <p
                                    v-if="!$v.admin.password.required"
                                    class="text-danger mt-1"
                                  >
                                    Password Harus Ber isi 6 karakter
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="form-group">
                                <label for="exampleInputPassword1"
                                  >Konfirmasi Password</label
                                >
                                <input
                                  type="password"
                                  v-model="admin.password_confirmation"
                                  class="form-control"
                                  id="exampleInputPassword1"
                                  @blur="
                                    $v.admin.password_confirmation.$touch()
                                  "
                                />
                                <div
                                  v-if="$v.admin.password_confirmation.$error"
                                >
                                  <p
                                    v-if="
                                      !$v.admin.password_confirmation
                                        .sameAsPassword
                                    "
                                    class="text-danger mt-1"
                                  >
                                    Password Konfirmasi Tidak Cocok
                                  </p>
                                  <p
                                    v-if="
                                      !$v.admin.password_confirmation.required
                                    "
                                    class="text-danger mt-1"
                                  >
                                    Password Harus Ber isi 6 karakter
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12 mt-3  mb-4 text-left">
                              <label for="NIK" style="text-align: left"
                                >Status</label
                              >
                              <select
                                class="form-control"
                                v-model="admin.status"
                                @blur="$v.admin.status.$touch()"
                              >
                                <option value="" disabled>Pilih</option>
                                <option value="0">No Active</option>
                                <option value="1">Active</option>
                              </select>
                              <div v-if="$v.admin.status.$error">
                                <p
                                  v-if="!$v.admin.status.required"
                                  class="text-danger mt-1"
                                >
                                  Silahkan Isi Status
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form-group text-center">
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
import Adminservice from "../../service/admin.service";
import { required, email, sameAs } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      admin: {
        name: "",
        username: "",
        image: "",
        email: "",
        password: "",
        password_confirmation: "",
        status: "",
      },
    };
  },
  validations: {
    admin: {
      name: { required },
      username: { required },
      image: { required },
      email: { required, email },
      password: { required },
      password_confirmation: { sameAsPassword: sameAs("password"), required },
      status: { required },
    },
  },
  methods: {
    submit(event) {
      event.preventDefault();
      var imageInput = document.getElementById("inputFile").files[0];
      var formData = new FormData();
      formData.append("name", this.admin.name);
      formData.append("username", this.admin.username);
      formData.append("email", this.admin.email);
      formData.append("password", this.admin.password);
      formData.append(
        "password_confirmation",
        this.admin.password_confirmation
      );
      formData.append("status", this.admin.status);
      formData.append("image", imageInput);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Adminservice.postCrated(formData)
          .then((response) => {
            console.log(response.data, "Berhasil Di tambahkan");
            router.back();
          })
          .catch((error) => {
            console.log("Gagal Di tambahkan", error.response);
          });
      }
    },
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.admin.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
