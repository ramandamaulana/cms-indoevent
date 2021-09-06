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
                        Edit Jadwal
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1"
                                  >Nama Kegiatan</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="schedule.nama_kegiatan"
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1"
                                  >Tanggal Kegiatan</label
                                >
                                <input
                                  type="date"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="schedule.tgl_kegiatan"
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1"
                                  >Jam Mulai</label
                                >
                                <input
                                  type="time"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="schedule.jam_mulai"
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1"
                                  >Jam Berakhir</label
                                >
                                <input
                                  type="time"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="schedule.jam_berakhir"
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Tempat</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="schedule.tempat"
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
import Scheduleservice from "../../service/jadwal.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      scheduleId: this.$route.params.id,
      schedule: {
        nama_kegiatan: "",
        tgl_kegiatan: "",
        jam_mulai: "",
        jam_berakhir: "",
        tempat: "",
      },
    };
  },
  methods: {
    getDetail() {
      Scheduleservice.getShow(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          (this.schedule.nama_kegiatan = response.rows.nama_kegiatan),
            (this.schedule.tgl_kegiatan = response.rows.tgl_kegiatan),
            (this.schedule.jam_mulai = response.rows.jam_mulai),
            (this.schedule.jam_berakhir = response.rows.jam_berakhir),
            (this.schedule.tempat = response.rows.tempat);
        }
      });
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      let params = {
        nama_kegiatan: this.schedule.nama_kegiatan,
        tgl_kegiatan: this.schedule.tgl_kegiatan,
        jam_mulai: this.schedule.jam_mulai,
        jam_berakhir: this.schedule.jam_berakhir,
        tempat: this.schedule.tempat,
      };
      Scheduleservice.postUpdate(this.$route.params.id, params)
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
