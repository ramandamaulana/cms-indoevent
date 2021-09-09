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
                        Tambah Landing Page
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="form-group row">
                                <label class="col-12">Landing Date</label>
                                <date-picker 
                                  v-model="landing.launching_date" 
                                  class="col-12"
                                  type="date"
                                  format="YYYY-MM-DD"
                                  value-type="format"
                                  placeholder="YYYY-MM-DD"
                                  :append-to-body="false" 
                                  :popup-style="{ left: '20px'}">
                                </date-picker>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group row">
                                <label class="col-12">Landing Time</label>
                                <date-picker 
                                  v-model="landing.launching_time" 
                                  class="col-12"
                                  format="HH:mm"
                                  value-type="format"
                                  type="time"
                                  placeholder="HH:mm"
                                  :append-to-body="false" 
                                  :popup-style="{ left: '20px'}">
                                </date-picker>
                              </div>
                            </div>
                            <div class="col-lg-12  mb-3">
                              <label for="exampleInputEmail1"
                                >Upload Banner Image</label
                              >
                              <input
                                type="file"
                                accept="image/*"
                                @change="onFileChange"
                                class="form-control"
                                id="inputFile"
                              />
                              <img 
                                  v-if="landing.banner_img != null"
                                  :src="landing.banner_img.url" 
                                  class="img-thumbnail mt-3" 
                                  style="max-width: 200px;"
                                  :alt="landing.banner_img.name"
                                  >
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label>Header Title</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="landing.header_title"
                                />
                              </div>
                            </div>
                            <div class="col-lg-12 mb-4">
                              <label>Header Deskripsi</label>
                              <textarea
                                class="form-control"                                
                                v-model="landing.header_desc"
                              ></textarea>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label>Team Title</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="landing.team_title"
                                />
                              </div>
                            </div>
                            <div class="col-lg-12 mb-4">
                              <label>Team Deskripsi</label>
                              <textarea
                                class="form-control"                                
                                v-model="landing.team_desc"
                              ></textarea>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label>About Title</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="landing.about_title"
                                />
                              </div>
                            </div>
                            <div class="col-lg-12 mb-4">
                              <label>About Deskripsi</label>
                              <textarea
                                class="form-control"                                
                                v-model="landing.about_desc"
                              ></textarea>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label>Article Title</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="landing.article_title"
                                />
                              </div>
                            </div>
                            <div class="col-lg-12 mb-4">
                              <label>Article Deskripsi</label>
                              <textarea
                                class="form-control"                                
                                v-model="landing.article_desc"
                              ></textarea>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label>Footer Title</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="landing.footer_title"
                                />
                              </div>
                            </div>
                            <div class="col-lg-12 mb-4">
                              <label>Footer Deskripsi</label>
                              <textarea
                                class="form-control"                                
                                v-model="landing.footer_desc"
                              ></textarea>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label>Google Maps Url</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  v-model="landing.google_map"
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
import Landingservice from "../../service/landing.service";
import DatePicker from 'vue2-datepicker';
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
    DatePicker,
  },
  data() {
    return {
      landing: {
        launching_date: "",
        launching_time: "",
        banner_img: "",
        header_title: "",
        header_desc: "",
        team_title: "",
        team_desc: "",
        about_title: "",
        about_desc: "",
        article_title: "",
        article_desc: "",
        footer_title: "",
        footer_desc: "",
        google_map: "",
      },
    };
  },
  created() {
    Landingservice.getAll()
      .then((response) => {
        this.landing.header_title = response.rows.header_title;
        this.landing.header_desc = response.rows.header_desc;
        this.landing.banner_img = response.rows.banner_img;
        this.landing.team_title = response.rows.team_title;
        this.landing.team_desc = response.rows.team_desc;
        this.landing.about_title = response.rows.about_title;
        this.landing.about_desc = response.rows.about_desc;
        this.landing.article_title = response.rows.article_title;
        this.landing.article_desc = response.rows.article_desc;
        this.landing.footer_title = response.rows.footer_title;
        this.landing.footer_desc = response.rows.footer_desc;
        this.landing.google_map = response.rows.google_map;
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      var imageInput = document.getElementById("inputFile").files[0];
      var formData = new FormData();
      formData.append("launching_date", this.landing.launching_date +' '+ this.landing.launching_time+':00');
      formData.append("banner_img", imageInput);
      formData.append("header_title", this.landing.header_title);
      formData.append("header_desc", this.landing.header_desc);
      formData.append("team_title", this.landing.team_title);
      formData.append("team_desc", this.landing.team_desc);
      formData.append("about_title", this.landing.about_title);
      formData.append("about_desc", this.landing.about_desc);
      formData.append("article_title", this.landing.article_title);
      formData.append("article_desc", this.landing.article_desc);
      formData.append("footer_title", this.landing.footer_title);
      formData.append("footer_desc", this.landing.footer_desc);
      formData.append("google_map", this.landing.google_map);
      Landingservice.postCrated(formData)
        .then((response) => {
          loading.hide();
          console.log(response, "Berhasil Di tambahkan");
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
        this.landing.banner_img = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
