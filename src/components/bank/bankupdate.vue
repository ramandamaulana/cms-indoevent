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
                        Edit Bank
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
                                  required
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
                                  v-model="bank.no_rekening"
                                  required
                                />
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
                                  required
                                />
                              </div>
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
import Bankservice from "../../service/bank.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      BankId: this.$route.params.id,
      bank: {
        nama_pemilik: "",
        image: "",
        no_rekening: "",
        akun_bank: "",
      },
    };
  },
  methods: {
    getDetail() {
      Bankservice.getShow(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          (this.bank.nama_pemilik = response.rows.nama_pemilik),
            (this.bank.no_rekening = response.rows.no_rekening),
            (this.bank.akun_bank = response.rows.akun_bank);
        }
      });
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      var imageInput = document.getElementById("inputFile").files[0];
      var formData = new FormData();
      formData.append("nama_pemilik", this.bank.nama_pemilik);
      formData.append("image", imageInput);
      formData.append("no_rekening", this.bank.no_rekening);
      formData.append("akun_bank", this.bank.akun_bank);
      Bankservice.postUpdate(this.$route.params.id, formData)
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
        this.bank.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>
