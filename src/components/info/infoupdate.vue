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
                        Update Information
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1"
                                  >Information</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="info.information"
                                  @blur="$v.info.information.$touch()"
                                />
                                <div v-if="$v.info.information.$error">
                                  <p
                                    v-if="!$v.info.information.required"
                                    class="text-danger mt-1"
                                  >
                                    Information Harus Di Isi
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
import Infoservice from "../../service/info.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      InfoId: this.$route.params.id,
      info: {
        information: "",
      },
    };
  },
  validations: {
    info: {
      information: { required },
    },
  },
  methods: {
    getDetail() {
      Infoservice.getShow(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          this.info.information = response.rows.information;
        }
      });
    },
    submit(event) {
      event.preventDefault();
      var formData = new FormData();
      formData.append("information", this.info.information);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Infoservice.postUpdate(this.$route.params.id, formData)
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
  mounted() {
    this.getDetail();
  },
};
</script>
