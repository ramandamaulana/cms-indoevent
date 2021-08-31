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
                              <div class="form-group">
                                <label>Landing Date</label>
                                <input
                                  type="date"
                                  class="form-control"
                                  v-model="landing.launching_date"
                                />
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label>Landing Time</label>
                                <input
                                  type="time"
                                  class="form-control"
                                  v-model="landing.launching_time"
                                />
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
                              <ckeditor
                                :editor="editor"
                                v-model="landing.header_desc"
                              ></ckeditor>
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
                              <ckeditor
                                :editor="editor"
                                v-model="landing.team_desc"
                              ></ckeditor>
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
                              <ckeditor
                                :editor="editor"
                                v-model="landing.about_desc"
                              ></ckeditor>
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
                              <ckeditor
                                :editor="editor"
                                v-model="landing.article_desc"
                              ></ckeditor>
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
                              <ckeditor
                                :editor="editor"
                                v-model="landing.footer_desc"
                              ></ckeditor>
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {},
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

  methods: {
    submit(event) {
      event.preventDefault();
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
          console.log(response.data, "Berhasil Di tambahkan");
          router.back();
        })
        .catch((error) => {
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
