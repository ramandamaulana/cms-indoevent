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
                        Edit Tiket
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
                                  v-model="tiket.nama"
                                  required
                                />
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
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Kuota</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="tiket.kuota"
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Harga</label>
                                <money
                                  v-model="tiket.harga"
                                  v-bind="money"
                                  @blur="$v.tiket.harga.$touch()"
                                  class="form-control"
                                ></money>
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
import Tiketservice from "../../service/tiket.service";
import { Money } from "v-money";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
    Money,
  },
  data() {
    return {
      TiketId: this.$route.params.id,
      tiket: {
        nama: "",
        keterangan: "",
        kuota: "",
        harga: "",
      },
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "Rp. ",
        precision: 0,
        masked: false,
      },
    };
  },
  methods: {
    getDetail() {
      Tiketservice.getShow(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          (this.tiket.nama = response.rows.nama),
            (this.tiket.keterangan = response.rows.keterangan);
          this.tiket.kuota = response.rows.kuota;
          this.tiket.harga = response.rows.harga;
        }
      });
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      let params = {
        nama: this.tiket.nama,
        keterangan: this.tiket.keterangan,
        kuota: this.tiket.kuota,
        harga: this.tiket.harga,
      };
      Tiketservice.postUpdate(this.$route.params.id, params)
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
  },
  mounted() {
    this.getDetail();
  },
};
</script>
