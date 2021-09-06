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
                        Tambah Post Artikel
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12 mb-3 text-left">
                              <label for="exampleFormControlSelect1"
                                >Artikel Kategori ID</label
                              >
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                v-model="postartikel.article_category_id"
                                @click="changeProductID()"
                              >
                                <option
                                  v-for="postartikel in categorys"
                                  :key="postartikel.article_category_id"
                                  :value="postartikel.id"
                                  >{{ postartikel.title }}</option
                                >
                              </select>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputPassword1">Title</label>
                                <input
                                  type="text"
                                  v-model="postartikel.title"
                                  class="form-control"
                                  id="exampleInputPassword1"
                                  @blur="$v.postartikel.title.$touch()"
                                />
                                <div v-if="$v.postartikel.title.$error">
                                  <p
                                    v-if="!$v.postartikel.title.required"
                                    class="text-danger mt-1"
                                  >
                                    Title Harus Di Isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12 mt-2">
                              <label for="exampleInputEmail1"
                                >Upload Image</label
                              >
                              <input
                                type="file"
                                accept="image/*"
                                @change="onFileChange"
                                class="form-control"
                                id="inputFile"
                                @blur="$v.postartikel.image.$touch()"
                              />
                              <div v-if="$v.postartikel.image.$error">
                                <p
                                  v-if="!$v.postartikel.image.required"
                                  class="text-danger mt-1"
                                >
                                  Upload Image Wajib Di Isi
                                </p>
                              </div>
                            </div>
                            <div class="col-lg-12 mt-3">
                              <div class="form-group">
                                <label for="exampleInputPassword1"
                                  >Content</label
                                >
                                <input
                                  type="text"
                                  v-model="postartikel.content"
                                  class="form-control"
                                  id="exampleInputPassword1"
                                  @blur="$v.postartikel.content.$touch()"
                                />
                                <div v-if="$v.postartikel.content.$error">
                                  <p
                                    v-if="!$v.postartikel.content.required"
                                    class="text-danger mt-1"
                                  >
                                    Content Harus Di Isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12 mt-3  mb-4 text-left">
                              <label for="NIK" style="text-align: left"
                                >Status</label
                              >
                              <select
                                class="form-control"
                                v-model="postartikel.status"
                                @blur="$v.postartikel.status.$touch()"
                              >
                                <option value="" disabled>Pilih</option>
                                <option value="0">No Active</option>
                                <option value="1">Active</option>
                              </select>
                              <div v-if="$v.postartikel.status.$error">
                                <p
                                  v-if="!$v.postartikel.status.required"
                                  class="text-danger mt-1"
                                >
                                  Silahkan Isi Status
                                </p>
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
import Postservice from "../../service/artikel-post.service";
import Kategoryservice from "../../service/artikel-kategori.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      postartikel: {
        article_category_id: "",
        title: "",
        image: "",
        status: "",
        content: "",
      },
      categorys: [],
    };
  },
  validations: {
    postartikel: {
      title: { required },
      image: { required },
      status: { required },
      content: { required },
    },
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      var imageInput = document.getElementById("inputFile").files[0];
      var formData = new FormData();
      formData.append(
        "article_category_id",
        this.postartikel.article_category_id
      );
      formData.append("title", this.postartikel.title);
      formData.append("status", this.postartikel.status);
      formData.append("content", this.postartikel.content);
      formData.append("image", imageInput);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Postservice.postCrated(formData)
          .then((response) => {
            loading.hide();
            console.log(response.data, "Berhasil Di tambahkan");
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
        this.postartikel.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    changeProductID() {
      Kategoryservice.getAll().then((response) => {
        this.categorys = response.rows;
      });
    },
  },
};
</script>
