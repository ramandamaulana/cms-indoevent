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
                        Edit Member
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="members.name"
                                  @blur="$v.members.name.$touch()"
                                />
                                <div v-if="$v.members.name.$error">
                                  <p
                                    v-if="!$v.members.name.required"
                                    class="text-danger mt-1"
                                  >
                                    Nama Harus Di isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="form-group">
                                <label for="exampleInputPassword1"
                                  >username</label
                                >
                                <input
                                  type="text"
                                  v-model="members.username"
                                  class="form-control"
                                  id="exampleInputPassword1"
                                  @blur="$v.members.username.$touch()"
                                />
                                <div v-if="$v.members.username.$error">
                                  <p
                                    v-if="!$v.members.username.required"
                                    class="text-danger mt-1"
                                  >
                                    Username Harus Di isi
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
                                @blur="$v.members.image.$touch()"
                              />
                              <div v-if="$v.members.image.$error">
                                <p
                                  v-if="!$v.members.image.required"
                                  class="text-danger mt-1"
                                >
                                  Image Upload Wajib Di Isi
                                </p>
                              </div>
                            </div>
                            <div class="col-lg-6 mt-2">
                              <div class="form-group">
                                <label for="exampleInputEmail1"
                                  >Perusahaan</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="members.perusahaan"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  @blur="$v.members.perusahaan.$touch()"
                                />
                                <div v-if="$v.members.perusahaan.$error">
                                  <p
                                    v-if="!$v.members.perusahaan.required"
                                    class="text-danger mt-1"
                                  >
                                    Nama Perusahaan Harus Di isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-6 mt-2">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Posisi</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  v-model="members.posisi"
                                  aria-describedby="emailHelp"
                                  @blur="$v.members.posisi.$touch()"
                                />
                                <div v-if="$v.members.posisi.$error">
                                  <p
                                    v-if="!$v.members.posisi.required"
                                    class="text-danger mt-1"
                                  >
                                    Posisi Harus Di Isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-6 mt-2">
                              <div class="form-group">
                                <label for="exampleInputEmail1"
                                  >No Telepon</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  v-model="members.no_telp"
                                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                                  aria-describedby="emailHelp"
                                  @blur="$v.members.no_telp.$touch()"
                                />
                                <div v-if="$v.members.no_telp.$error">
                                  <p
                                    v-if="!$v.members.no_telp.required"
                                    class="text-danger mt-1"
                                  >
                                    Harus Di Isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-6 mt-2">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Kota</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  @blur="$v.members.kota.$touch()"
                                  v-model="members.kota"
                                />
                                <div v-if="$v.members.kota.$error">
                                  <p
                                    v-if="!$v.members.kota.required"
                                    class="text-danger mt-1"
                                  >
                                    Harus Di Isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12 mt-3">
                              <label for="NIK" style="text-align: left"
                                >Jenis Kelamin</label
                              >
                              <select
                                class="form-control"
                                v-model="members.gender"
                              >
                                <option :selected="true" value="">Pilih Gender</option>
                                <option value="L">Laki-Laki</option>
                                <option value="P">Perempuan</option>
                              </select>
                              <div v-if="$v.members.gender.$error">
                                <p
                                  v-if="!$v.members.gender.required"
                                  class="text-danger mt-1"
                                >
                                  Harus Di Isi
                                </p>
                              </div>
                            </div>
                            <div class="col-lg-12 mt-3">
                              <label style="text-align: left"
                                >Punya Riwayat Penyakit ?</label
                              >
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="riwayat_penyakit" id="exampleRadios1" value="true" v-model="riwayat_penyakit"
                                   >
                                  <label class="form-check-label" for="exampleRadios1">
                                    Punya
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input class="form-check-input" type="radio" name="riwayat_penyakit" id="exampleRadios" value="false" v-model="riwayat_penyakit"
                                    >
                                  <label class="form-check-label" for="exampleRadios2">
                                    Tidak Punya
                                  </label>
                                </div>
                              <div v-if="$v.riwayat_penyakit.$error">
                                <p
                                  v-if="!$v.riwayat_penyakit. required"
                                  class="text-danger mt-1"
                                >
                                  Harus Di Isi
                                </p>
                              </div>
                            </div>
                            <div class="col-lg-12 mt-3" v-if="riwayat_penyakit == 'true'">
                              <label style="text-align: left"
                              >Deskripsikan Riwayat Penyakitnya</label
                              >
                                <textarea
                                  class="form-control"                                
                                  v-model="members.riwayat_penyakit"
                                ></textarea>
                              <div v-if="$v.members.riwayat_penyakit.$error">
                                <p
                                  v-if="!$v.members.riwayat_penyakit.required"
                                  class="text-danger mt-1"
                                >
                                  Harus Di Isi
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form-group text-center mt-3">
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
import { required, requiredIf } from "vuelidate/lib/validators";
import Sidebar from "../layout/sidebar.vue";
import Footer from "../layout/footer";
import Memberservice from "../../service/member.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      MemberId: this.$route.params.id,
      riwayat_penyakit: "",
      members: {
        name: "",
        username: "",
        image: "",
        posisi: "",
        no_telp: "",
        kota: "",
        gender: "",
        riwayat_penyakit: "",
      },
    };
  },
  computed: {
    isRequired() {
      return true;
    }
  },
  validations: {
    riwayat_penyakit : {required},
    members: {
      name: { required },
      username: { required },
      image: { required },
      perusahaan: { required },
      posisi: { required },
      no_telp: { required },
      kota: { required },
      gender: { required },
      riwayat_penyakit: { 
        required: requiredIf(function () { return this.members.riwayat_penyakit === 'true' }),
      },
    },
  },
  methods: {
    getDetail() {
      Memberservice.getShow(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          this.members.name = response.rows.user.name;
          this.members.username = response.rows.user.username;
          if(response.rows.user.image != null){
            this.members.image = response.rows.user.image.url;
          }
          this.members.posisi = response.rows.posisi;
          this.members.perusahaan = response.rows.perusahaan;
          this.members.no_telp = response.rows.no_telp;
          this.members.kota = response.rows.kota;
          this.members.riwayat_penyakit = response.rows.riwayat_penyakit;
          this.members.gender = response.rows.gender == 'Perempuan' ? 'P' : 'L';
          this.riwayat_penyakit = response.rows.riwayat_penyakit == null ? 'false' : 'true';
        }
      });
    },
    submit(event) {
      event.preventDefault();
      var imageInput = document.getElementById("inputFile").files[0];
      var formData = new FormData();
      console.log(this.members.gender);
      formData.append("name", this.members.name);
      formData.append("username", this.members.username);
      formData.append("perusahaan", this.members.perusahaan);
      formData.append("posisi", this.members.posisi);
      formData.append("no_telp", this.members.no_telp);
      formData.append("kota", this.members.kota);
      formData.append("image", imageInput);
      formData.append("gender", this.members.gender);
      formData.append("riwayat_penyakit", this.members.riwayat_penyakit);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let loading = this.$loading.show();
        Memberservice.postUpdate(this.$route.params.id, formData)
          .then((response) => {
            loading.hide();
            console.log(response, "Berhasil Di tambahkan");
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
        this.members.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>
