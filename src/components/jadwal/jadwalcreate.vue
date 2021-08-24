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
                        Tambah Schedule
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
                                  @blur="$v.schedule.nama_kegiatan.$touch()"
                                />
                                <div v-if="$v.schedule.nama_kegiatan.$error">
                                  <p
                                    v-if="!$v.schedule.nama_kegiatan.required"
                                    class="text-danger mt-1"
                                  >
                                    Nama Kegiatan Harus Di Isi
                                  </p>
                                </div>
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
                                  @blur="$v.schedule.tgl_kegiatan.$touch()"
                                />
                              </div>
                              <div v-if="$v.schedule.tgl_kegiatan.$error">
                                <p
                                  v-if="!$v.schedule.tgl_kegiatan.required"
                                  class="text-danger mt-1"
                                >
                                  Tanggal Kegiatan Harus Di Isi
                                </p>
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
                                  @blur="$v.schedule.jam_mulai.$touch()"
                                />
                                <div v-if="$v.schedule.jam_mulai.$error">
                                  <p
                                    v-if="!$v.schedule.jam_mulai.required"
                                    class="text-danger mt-1"
                                  >
                                    Jam Mulai Harus Di Isi
                                  </p>
                                </div>
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
                                  @blur="$v.schedule.jam_berakhir.$touch()"
                                />
                                <div v-if="$v.schedule.jam_berakhir.$error">
                                  <p
                                    v-if="!$v.schedule.jam_berakhir.required"
                                    class="text-danger mt-1"
                                  >
                                    Jam Berakhir Harus Di Isi
                                  </p>
                                </div>
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
                                  @blur="$v.schedule.tempat.$touch()"
                                />
                                <div v-if="$v.schedule.tempat.$error">
                                  <p
                                    v-if="!$v.schedule.tempat.required"
                                    class="text-danger mt-1"
                                  >
                                    Tempat Harus Di Isi
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
import Scheduleservice from "../../service/jadwal.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      schedule: {
        nama_kegiatan: "",
        tgl_kegiatan: "",
        jam_mulai: "",
        jam_berakhir: "",
        tempat: "",
      },
    };
  },
  validations: {
    schedule: {
      nama_kegiatan: { required },
      tgl_kegiatan: { required },
      jam_mulai: { required },
      jam_berakhir: { required },
      tempat: { required },
    },
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let params = {
        nama_kegiatan: this.schedule.nama_kegiatan,
        tgl_kegiatan: this.schedule.tgl_kegiatan,
        jam_mulai: this.schedule.jam_mulai,
        jam_berakhir: this.schedule.jam_berakhir,
        tempat: this.schedule.tempat,
      };
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Scheduleservice.postCrated(params)
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
