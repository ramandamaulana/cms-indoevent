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
                        Edit Admin
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
                                  required
                                />
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
                                  required
                                  class="form-control"
                                  id="exampleInputPassword1"
                                />
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
                              />
                              <img :src="admin.image" 
                                class="img-thumbnail mt-3" 
                                style="max-width: 200px;"
                                :alt="admin.name">
                            </div>
                            <div class="col-lg-12 mt-3  mb-4 text-left">
                              <label for="NIK" style="text-align: left"
                                >Status</label
                              >
                              <select
                                class="form-control"
                                v-model="admin.status"
                              >
                                <option value="" disabled>Pilih</option>
                                <option value="0">No Active</option>
                                <option value="1">Active</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="form-group text-center">
                          <a class="btn btn-warning mr-3" @click="$router.go(-1)">
                                Batal
                          </a>
                          <button type="submit" class="btn btn-primary">
                            Submit
                          </button>
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
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      adminId: this.$route.params.id,
      admin: {
        name: "",
        username: "",
        image: "",
        password: "",
        password_confirmation: "",
        status: "",
      },
    };
  },
  methods: {
    getDetail() {
      Adminservice.getShow(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          (this.admin.name = response.rows.user.name),
            (this.admin.username = response.rows.user.username),
            (this.admin.image = response.rows.user.image.url);
          this.admin.posisi = response.rows.posisi;
          this.admin.perusahaan = response.rows.perusahaan;
          this.admin.no_telp = response.rows.no_telp;
          this.admin.kota = response.rows.kota;
        }
      });
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
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
      Adminservice.postUpdate(this.$route.params.id, formData)
        .then((response) => {
          loading.hide();
          console.log(response.data, "Berhasil Di tambahkan");
          router.back();
        })
        .catch((error) => {
          loading.hide();
          console.log("Gagal Di tambahkan", error.response);
        });
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
  mounted() {
    this.getDetail();
  }
};
</script>
