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
                        Tambah Dokumen
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Nama</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="dokumen.nama"
                                  @blur="$v.dokumen.nama.$touch()"
                                />
                                <div v-if="$v.dokumen.nama.$error">
                                  <p
                                    v-if="!$v.dokumen.nama.required"
                                    class="text-danger mt-1"
                                  >
                                    Nama Dokumen Harus Di Isi
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
                                @change="onFileChange"
                                class="form-control"
                                id="inputFile"
                                @blur="$v.dokumen.document.$touch()"
                              />
                              <div v-if="$v.dokumen.document.$error">
                                <p
                                  v-if="!$v.dokumen.document.required"
                                  class="text-danger mt-1"
                                >
                                  Dokumen Ber isi PDF Atau Image
                                </p>
                              </div>
                            </div>
                            <div class="col-lg-12 mt-3  mb-4 text-left">
                              <label for="NIK" style="text-align: left"
                                >Type</label
                              >
                              <select
                                class="form-control"
                                v-model="dokumen.tipe"
                                @blur="$v.dokumen.tipe.$touch()"
                              >
                                <option value="1">PDF</option>
                                <option value="2">Excel</option>
                                <option value="3">Word</option>
                                <option value="4">PPT</option>
                                <option value="5">JPEG,PNG</option>
                              </select>
                              <div v-if="$v.dokumen.tipe.$error">
                                <p
                                  v-if="!$v.dokumen.tipe.required"
                                  class="text-danger mt-1"
                                >
                                  Silahkan Pilih Tipe File
                                </p>
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
import Dokumenservice from "../../service/document.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      dokumen: {
        nama: "",
        document: "",
        tipe: "",
      },
    };
  },
  validations: {
    dokumen: {
      nama: { required },
      document: { required },
      tipe: { required },
    },
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      var imageInput = document.getElementById("inputFile").files[0];
      var formData = new FormData();
      formData.append("nama", this.dokumen.nama);
      formData.append("document", imageInput);
      formData.append("tipe", this.dokumen.tipe);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Dokumenservice.postCrated(formData)
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
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.dokumen.document = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
