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
                        Tambah Komen Artikel
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
                                v-model="komenartikel.article_post_id"
                                @click="changeProductID()"
                              >
                                <option
                                  v-for="komenartikel in komenartikeld"
                                  :key="komenartikel.article_post_id"
                                  >{{ komenartikel.id }}</option
                                >
                              </select>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputPassword1">Title</label>
                                <input
                                  type="text"
                                  v-model="komenartikel.comment"
                                  class="form-control"
                                  id="exampleInputPassword1"
                                  @blur="$v.komenartikel.comment.$touch()"
                                />
                                <div v-if="$v.komenartikel.comment.$error">
                                  <p
                                    v-if="!$v.komenartikel.comment.required"
                                    class="text-danger mt-1"
                                  >
                                    Title Harus Di Isi
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
import Postservice from "../../service/artikel-post.service";
import Komenservice from "../../service/artikel-comment.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      komenartikel: {
        article_post_id: "",
        comment: "",
      },
      komenartikeld: [],
    };
  },
  validations: {
    komenartikel: {
      article_post_id: { required },
      comment: { required },
    },
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      var formData = new FormData();
      formData.append("article_post_id", this.komenartikel.article_post_id);
      formData.append("comment", this.komenartikel.comment);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Komenservice.postCrated(formData)
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
    changeProductID() {
      Postservice.getAll().then((response) => {
        this.komenartikeld = response.rows;
      });
    },
  },
};
</script>
