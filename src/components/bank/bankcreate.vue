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
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Nama</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="bank.nama_pemilik"
                                  @blur="$v.bank.nama_pemilik.$touch()"
                                />
                                <div v-if="$v.bank.nama_pemilik.$error">
                                  <p
                                    v-if="!$v.bank.nama_pemilik.required"
                                    class="text-danger mt-1"
                                  >
                                    Nama Pemilik Harus Di Isi
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
                                @blur="$v.bank.image.$touch()"
                              />
                              <div v-if="$v.bank.image.$error">
                                <p
                                  v-if="!$v.bank.image.required"
                                  class="text-danger mt-1"
                                >
                                  File Upload Wajib Di isi
                                </p>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1"
                                  >Nomor Rekening</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                                  v-model="bank.no_rekening"
                                  @blur="$v.bank.no_rekening.$touch()"
                                />
                                <div v-if="$v.bank.no_rekening.$error">
                                  <p
                                    v-if="!$v.bank.no_rekening.required"
                                    class="text-danger mt-1"
                                  >
                                    No Rekening Wajib Disi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1"
                                  >Akun Bank</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="bank.akun_bank"
                                  @blur="$v.bank.akun_bank.$touch()"
                                />
                                <div v-if="$v.bank.akun_bank.$error">
                                  <p
                                    v-if="!$v.bank.akun_bank.required"
                                    class="text-danger mt-1"
                                  >
                                    Akun Bank Wajib Di isi
                                  </p>
                                </div>
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
import Bankservice from "../../service/bank.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      bank: {
        nama_pemilik: "",
        image: "",
        no_rekening: "",
        akun_bank: "",
      },
    };
  },
  validations: {
    bank: {
      nama_pemilik: { required },
      image: { required },
      no_rekening: { required },
      akun_bank: { required },
    },
  },
  methods: {
    submit(event) {
      event.preventDefault();
      var imageInput = document.getElementById("inputFile").files[0];
      var formData = new FormData();
      formData.append("nama_pemilik", this.bank.nama_pemilik);
      formData.append("image", imageInput);
      formData.append("no_rekening", this.bank.no_rekening);
      formData.append("akun_bank", this.bank.akun_bank);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Bankservice.postCrated(formData)
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
        this.bank.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
