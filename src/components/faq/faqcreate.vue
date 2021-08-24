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
                        Create Faq
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Title</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="faq.title"
                                  @blur="$v.faq.title.$touch()"
                                />
                                <div v-if="$v.faq.title.$error">
                                  <p
                                    v-if="!$v.faq.title.required"
                                    class="text-danger mt-1"
                                  >
                                    Faq Title Wajib Di isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Konten</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="faq.contents"
                                  @blur="$v.faq.contents.$touch()"
                                />
                                <div v-if="$v.faq.contents.$error">
                                  <p
                                    v-if="!$v.faq.contents.required"
                                    class="text-danger mt-1"
                                  >
                                    Faq Contents Wajib Di isi
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
import Faqservice from "../../service/faq.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      faq: {
        title: "",
        contents: "",
      },
    };
  },
  validations: {
    faq: {
      title: { required },
      contents: { required },
    },
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let params = {
        title: this.faq.title,
        contents: this.faq.contents,
      };
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Faqservice.postCrated(params)
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
