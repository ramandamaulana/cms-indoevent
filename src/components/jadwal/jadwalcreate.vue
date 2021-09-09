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
                        Tambah Jadwal
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
                              <div class="form-group row">
                                <label for="exampleInputEmail1"
                                    class="col-12"
                                  >Tanggal Kegiatan</label
                                >
                                <date-picker 
                                  v-model="schedule.tgl_kegiatan" 
                                  class="col-12"
                                  type="date"
                                  format="YYYY-MM-DD"
                                  value-type="format"
                                  placeholder="YYYY-MM-DD"
                                  :append-to-body="false" 
                                  :popup-style="{ left: '20px'}"
                                  @blur="$v.schedule.tgl_kegiatan.$touch()">
                                </date-picker>
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
                              <div class="form-group row">
                                <label for="exampleInputEmail1"
                                  class="col-12"
                                  >Jam Mulai</label
                                >
                                <date-picker 
                                  v-model="schedule.jam_mulai" 
                                  class="col-12"
                                  format="HH:mm"
                                  value-type="format"
                                  type="time"
                                  placeholder="HH:mm"
                                  :append-to-body="false" 
                                  :popup-style="{ left: '20px'}"
                                  @blur="$v.schedule.jam_mulai.$touch()">
                                </date-picker>
                              </div>
                              <div v-if="$v.schedule.jam_mulai.$error">
                                <p
                                  v-if="!$v.schedule.jam_mulai.required"
                                  class="text-danger mt-1"
                                >
                                  Jam Mulai Harus Di Isi
                                </p>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group row">
                                <label for="exampleInputEmail1"
                                  class="col-12"
                                  >Jam Berakhir</label
                                >
                                 <date-picker 
                                  v-model="schedule.jam_berakhir" 
                                  class="col-12"
                                  format="HH:mm"
                                  value-type="format"
                                  type="time"
                                  placeholder="HH:mm"
                                  :append-to-body="false" 
                                  :popup-style="{ left: '20px'}"
                                  @blur="$v.schedule.jam_berakhir.$touch()">
                                </date-picker>
                              </div>
                              <div v-if="$v.schedule.jam_berakhir.$error">
                                <p
                                  v-if="!$v.schedule.jam_berakhir.required"
                                  class="text-danger mt-1"
                                >
                                  Jam Berakhir Harus Di Isi
                                </p>
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
                          <a class="btn btn-warning mr-3" @click="$router.go(-1)">
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
import Scheduleservice from "../../service/jadwal.service";
import { required } from "vuelidate/lib/validators";
import DatePicker from 'vue2-datepicker';

export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
    DatePicker
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
      let loading = this.$loading.show();
        Scheduleservice.postCrated(params)
          .then((response) => {
            loading.hide();
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
