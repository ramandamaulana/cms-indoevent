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
                        Tambah Information Details
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
                                v-model="schedule.ticket_id"
                                @click="changeProductID()"
                              >
                                <option
                                  v-for="schedule in schedules"
                                  :key="schedule.ticket_id"
                                  >{{ schedule.ticket_id }}</option
                                >
                              </select>
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
import Scheduleservice from "../../service/tiket-schedule.service";
import Dokumenservice from "../../service/tiket-dokumen.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      schedule: {
        ticket_id: "",
        documents: "",
      },
      schedules: [],
    };
  },
  validations: {
    schedule: {
      ticket_id: { required },
      documents: { required },
    },
  },
  methods: {
    submit(event) {
      event.preventDefault();
      var formData = new FormData();
      formData.append("ticket_id", this.schedule.ticket_id);
      formData.append("documents", this.schedule.documents);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Dokumenservice.postCrated(formData)
          .then((response) => {
            console.log(response.data, "Berhasil Di tambahkan");
            router.back();
          })
          .catch((error) => {
            console.log("Gagal Di tambahkan", error.response);
          });
      }
    },
    changeProductID() {
      Scheduleservice.getAll().then((response) => {
        this.schedules = response.rows;
      });
    },
  },
};
</script>
