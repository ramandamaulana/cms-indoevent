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
                                  required
                                />
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
                                  required
                                  class="form-control"
                                  id="exampleInputPassword1"
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

                              <img :src="members.image" 
                                class="img-thumbnail mt-3" 
                                style="max-width: 200px;"
                                :alt="members.name">
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
                                />
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
                                />
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
                                />
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
                                  v-model="members.kota"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="container">
                          <div class="form-group text-center">
                            <a class="btn btn-warning mr-3" @click="$router.go(-1)">
                              Batal
                          </a>
                            <button
                              type="submit"
                              class="btn btn-primary"
                            >
                              Submit
                            </button>
                          </div>
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
      members: {
        name: "",
        username: "",
        image: "",

        posisi: "",
        no_telp: "",
        kota: "",
      },
    };
  },
  methods: {
    getDetail() {
      Memberservice.getDetail(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          (this.members.name = response.rows.user.name),
            (this.members.username = response.rows.user.username),
            (this.members.image = response.rows.user.image.url);
          this.members.posisi = response.rows.posisi;
          this.members.perusahaan = response.rows.perusahaan;
          this.members.no_telp = response.rows.no_telp;
          this.members.kota = response.rows.kota;
        }
      });
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      var imageInput = document.getElementById("inputFile").files[0];
      var formData = new FormData();
      formData.append("name", this.members.name);
      formData.append("username", this.members.username);

      formData.append("perusahaan", this.members.perusahaan);
      formData.append("posisi", this.members.posisi);
      formData.append("no_telp", this.members.no_telp);
      formData.append("kota", this.members.kota);
      formData.append("image", imageInput);
      Memberservice.postUpdate(this.$route.params.id, formData)
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
        this.members.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    mounted() {
      this.getDetail();
    },
  },
};
</script>
