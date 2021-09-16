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
                        Edit Detail Informasi
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12 mb-3 text-left">
                              <label for="exampleFormControlSelect1"
                                >Information ID</label
                              >
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                v-model="Infodetail.information_id"
                                @click="changeProductID()"
                              >
                                <option
                                  v-for="Infodetail in Infodetails"
                                  :key="Infodetail.information_id"
                                  :value="Infodetail.id"
                                  >{{ Infodetail.information }}</option
                                >
                              </select>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputPassword1"
                                  >Detail</label
                                >
                                <input
                                  type="text"
                                  v-model="Infodetail.detail"
                                  class="form-control"
                                  id="exampleInputPassword1"
                                  @blur="$v.Infodetail.detail.$touch()"
                                />
                                <div v-if="$v.Infodetail.detail.$error">
                                  <p
                                    v-if="!$v.Infodetail.detail.required"
                                    class="text-danger mt-1"
                                  >
                                    Title Harus Di Isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputPassword1"
                                  >Quantity</label
                                >
                                <input
                                  type="text"
                                  v-model="Infodetail.qty"
                                  class="form-control"
                                  id="exampleInputPassword1"
                                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                                  @blur="$v.Infodetail.qty.$touch()"
                                />
                                <div v-if="$v.Infodetail.qty.$error">
                                  <p
                                    v-if="!$v.Infodetail.qty.required"
                                    class="text-danger mt-1"
                                  >
                                    Quantity Harus di isi
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form-group text-center">
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
import Sidebar from "../layout/sidebar.vue";
import Footer from "../layout/footer";
import Infoservice from "../../service/info.service";
import InfoDetailservice from "../../service/info-detail.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      InfodetailID: this.$route.params.id,
      Infodetail: {
        information_id: "",
        detail: "",
        qty: "",
      },
      Infodetails: [],
    };
  },
  validations: {
    Infodetail: {
      information_id: { required },
      detail: { required },
      qty: { required },
    },
  },
  methods: {
    getDetail() {
      InfoDetailservice.getShow(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          this.Infodetail.information_id = response.rows.information_id;
          this.Infodetail.detail = response.rows.detail;
          this.Infodetail.qty = response.rows.qty;
        }
      });
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      var formData = new FormData();
      formData.append("information_id", this.Infodetail.information_id);
      formData.append("detail", this.Infodetail.detail);
      formData.append("qty", this.Infodetail.qty);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        InfoDetailservice.postUpdate(this.$route.params.id, formData)
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
      Infoservice.getAll().then((response) => {
        this.Infodetails = response.rows;
      });
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>
