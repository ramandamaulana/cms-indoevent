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
                        Tambah Transaksi Member
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12 mb-3 text-left">
                              <label for="exampleFormControlSelect1"
                                >Tiket</label
                              >
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                v-model="transaksi.ticket_id"
                                @click="changeTiketID()"
                              >
                                <option
                                  v-for="tiket in tikets"
                                  :key="tiket.id"
                                  :value="tiket.id"
                                  >{{ tiket.nama }}</option
                                >
                              </select>
                            </div>
                            <div class="col-lg-12 mb-3 text-left">
                              <label for="exampleFormControlSelect1"
                                >Bank Akun</label
                              >
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                v-model="transaksi.bank_account_id"
                                @click="changeBankID()"
                              >
                                <option
                                  v-for="bank in banks"
                                  :key="bank.id"
                                  :value="bank.id"
                                  >{{ bank.akun_bank }}</option
                                >
                              </select>
                            </div>
                            <div class="col-lg-12  mb-3">
                              <label for="exampleInputEmail1"
                                >Image Bukti Transaksi</label
                              >
                              <input
                                type="file"
                                accept="image/*"
                                @change="onFileChange"
                                class="form-control"
                                id="inputFile"
                              />
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
import Transaksiservice from "../../service/transaction.service";
import Tiketservice from "../../service/tiket.service";
import Bankservice from "../../service/bank.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      transaksiId: this.$route.params.id,
      transaksi: {
        ticket_id: "",
        bank_account_id: "",
        image: "",
      },
      tikets: [],
      banks: [],
    };
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      var imageInput = document.getElementById("inputFile").files[0];
      var formData = new FormData();
      formData.append("ticket_id", this.transaksi.ticket_id);
      formData.append("bank_account_id", this.transaksi.bank_account_id);
      formData.append("image", imageInput);
      Transaksiservice.postCrated(this.$route.params.id,formData)
        .then((response) => {
          loading.hide();
          console.log(response.data);
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
        this.transaksi.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    changeTiketID() {
      Tiketservice.getAll().then((response) => {
        this.tikets = response.rows;
        console.log(response.rows);
      });
    },
    changeBankID() {
      Bankservice.getAll().then((response) => {
        this.banks = response.rows;
        console.log(response.rows);
      });
    },
  },
};
</script>
