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
                        Tambah Tiket
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1"
                                  >Nama Tiket</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-described
                                  by="emailHelp"
                                  v-model="tiket.nama"
                                  @blur="$v.tiket.nama.$touch()"
                                />
                                <div v-if="$v.tiket.nama.$error">
                                  <p
                                    v-if="!$v.tiket.nama.required"
                                    class="text-danger mt-1"
                                  >
                                    Nama Harus Di Isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1"
                                  >Keterangan</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="tiket.keterangan"
                                  @blur="$v.tiket.keterangan.$touch()"
                                />
                                <div v-if="$v.tiket.keterangan.$error">
                                  <p
                                    v-if="!$v.tiket.keterangan.required"
                                    class="text-danger mt-1"
                                  >
                                    Keterangan Harus Di Isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Kuota</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                                  aria-describedby="emailHelp"
                                  v-model="tiket.kuota"
                                  @blur="$v.tiket.kuota.$touch()"
                                />
                                <div v-if="$v.tiket.kuota.$error">
                                  <p
                                    v-if="!$v.tiket.kuota.required"
                                    class="text-danger mt-1"
                                  >
                                    Kuoata Harus Di Isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Harga</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                                  aria-describedby="emailHelp"
                                  v-model="tiket.harga"
                                  @blur="$v.tiket.harga.$touch()"
                                />
                              </div>
                              <div v-if="$v.tiket.harga.$error">
                                <p
                                  v-if="!$v.tiket.harga.required"
                                  class="text-danger mt-1"
                                >
                                  Harga Harus Di Isi
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form-group text-center">
                          <button
                            class="btn btn-primary"
                            :disabled="$v.$anyError"
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
import Tiketservice from "../../service/tiket.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      tiket: {
        nama: "",
        keterangan: "",
        kuota: "",
        harga: "",
      },
    };
  },
  validations: {
    tiket: {
      nama: { required },
      keterangan: { required },
      kuota: { required },
      harga: { required },
    },
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let params = {
        nama: this.tiket.nama,
        keterangan: this.tiket.keterangan,
        kuota: this.tiket.kuota,
        harga: this.tiket.harga,
      };
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Tiketservice.postCrated(params)
          .then((response) => {
            console.log(response.data, "Berhasil Di tambahkan");
            router.back();
          })
          .catch((error) => {
            console.log("Gagal Di tambahkan", error.response);
          });
      }
    },
  },
};
</script>
