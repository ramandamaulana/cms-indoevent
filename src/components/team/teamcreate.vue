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
                        Tambah Team
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="team.nama"
                                  @blur="$v.team.nama.$touch()"
                                />
                                <div v-if="$v.team.nama.$error">
                                  <p
                                    v-if="!$v.team.nama.required"
                                    class="text-danger mt-1"
                                  >
                                    Nama Wajib Di isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Jabatan</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="team.jabatan"
                                  @blur="$v.team.jabatan.$touch()"
                                />
                                <div v-if="$v.team.jabatan.$error">
                                  <p
                                    v-if="!$v.team.jabatan.required"
                                    class="text-danger mt-1"
                                  >
                                    Jabatan Wajib Di isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Tentang</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="team.tentang"
                                  @blur="$v.team.tentang.$touch()"
                                />
                                <div v-if="$v.team.tentang.$error">
                                  <p
                                    v-if="!$v.team.tentang.required"
                                    class="text-danger mt-1"
                                  >
                                    Tentang Wajib Di isi
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
                                @blur="$v.team.image.$touch()"
                              />
                              <div v-if="$v.team.image.$error">
                                <p
                                  v-if="!$v.team.image.required"
                                  class="text-danger mt-1"
                                >
                                  Image Wajib Di isi
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
import Teamservice from "../../service/team.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      team: {
        nama: "",
        jabatan: "",
        tentang: "",
        image: "",
      },
    };
  },
  validations: {
    team: {
      nama: { required },
      jabatan: { required },
      tentang: { required },
      image: { required },
    },
  },
  methods: {
    submit(event) {
      event.preventDefault();
      var imageInput = document.getElementById("inputFile").files[0];
      var formData = new FormData();
      formData.append("nama", this.team.nama);
      formData.append("jabatan", this.team.jabatan);
      formData.append("tentang", this.team.tentang);
      formData.append("image", imageInput);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Teamservice.postCrated(formData)
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
        this.team.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
