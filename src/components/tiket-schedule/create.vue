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
                        Tambah Jadwal Tiket
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12 mb-3 text-left">
                              <label for="exampleFormControlSelect1"
                                >Information ID</label
                              >
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                v-model="tiketschedule.ticket_id"
                                @click="changeProductID()"
                              >
                                <option
                                  v-for="tiketschedule in tiketscheduleID"
                                  :key="tiketschedule.id"
                                  :value="tiketschedule.id"
                                  >{{ tiketschedule.nama }}</option
                                >
                              </select>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group row">
                                <div class="col-sm-12">
                                  <div class="form-check">
                                    <div
                                      v-for="(jadwal, index) in Jadwals"
                                      v-bind:index="index"
                                      :key="jadwal.id"
                                    >
                                      <input
                                        class="form-check-input"
                                        type="checkbox"
                                        v-model="tiketschedule.schedules"
                                        :value="jadwal.id"
                                      />
                                      <label class="form-check-label">
                                        {{ jadwal.nama_kegiatan }}
                                      </label>
                                    </div>
                                  </div>
                                </div>
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
import Tiketservice from "../../service/tiket.service";
import Jadwal from "../../service/jadwal.service";
import Tiketscheduleservice from "../../service/tiket-schedule.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      tiketschedule: {
        ticket_id: "",
        schedules: [],
      },
      tiketscheduleID: [],
      Jadwals: [],
    };
  },
  created() {
    Jadwal.getAll()
      .then((response) => {
        this.Jadwals = response.rows;
        console.log("Data Di Temukan", response.rows);
      })
      .catch((error) => {
        console.log("Eror Data Tidak Di Temukan", error.response);
      });
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      console.log(this.tiketschedule);
      let params = {
        ticket_id: this.tiketschedule.ticket_id,
        schedules: this.tiketschedule.schedules
      };
      Tiketscheduleservice.postCrated(params)
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
    changeProductID() {
      Tiketservice.getAll().then((response) => {
        this.tiketscheduleID = response.rows;
      });
    },
  },
};
</script>
