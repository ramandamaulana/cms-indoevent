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
                        Tambah Feedback
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleFormControlSelect1"
                                >Pilih User</label>
                                <select
                                  class="form-control"
                                  id="exampleFormControlSelect1"
                                  v-model="feedback.user_id"
                                >
                                  <option
                                    v-for="user in Users"
                                    :key="user.user_id"
                                    :value="user.user_id"
                                    >{{ user.name }}</option
                                  >
                                </select>
                                <div v-if="$v.feedback.user_id.$error">
                                  <p
                                    v-if="!$v.feedback.user_id.required"
                                    class="text-danger mt-1"
                                  >
                                    User Id Harus Di Isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleFormControlSelect1"
                                >Pilih Ticket</label>
                                <select
                                  class="form-control"
                                  id="exampleFormControlSelect1"
                                  v-model="feedback.ticket_id"
                                >
                                  <option
                                    v-for="ticket in Tickets"
                                    :key="ticket.id"
                                    :value="ticket.id"
                                    >{{ ticket.nama }}</option
                                  >
                                </select>
                                <div v-if="$v.feedback.ticket_id.$error">
                                  <p
                                    v-if="!$v.feedback.ticket_id.required"
                                    class="text-danger mt-1"
                                  >
                                    Ticket Id Harus Di Isi
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Stars</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                                  v-model="feedback.stars"
                                  @blur="$v.feedback.stars.$touch()"
                                />
                                <div v-if="$v.feedback.stars.$error">
                                  <p
                                    v-if="!$v.feedback.stars.required"
                                    class="text-danger mt-1"
                                  >
                                    Stars Harus Di Isi Angka 1 - 5
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Comment</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="feedback.comment"
                                  @blur="$v.feedback.comment.$touch()"
                        
                                />
                                <div v-if="$v.feedback.comment.$error">
                                  <p
                                    v-if="!$v.feedback.comment.required"
                                    class="text-danger mt-1"
                                  >
                                    Komentar Harus Di Isi
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
import Feedbackservice from "../../service/feedback.service";
import MemberService from "../../service/member.service";
import Tiketservice from "../../service/tiket.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      feedback: {
        user_id: "",
        ticket_id: "",
        stars: "",
        comment: "",
      },
      Users: [],
      Tickets: [],
    };
  },
  validations: {
    feedback: {
      ticket_id: { required },
      user_id: { required },
      stars: { required },
      comment: { required },
    },
  },
  created() {
    MemberService.getAll()
      .then((response) => {
        this.Users = response.rows;
        console.log("Data Di Temukan", response.rows);
      })
      .catch((error) => {
        console.log("Eror Data Tidak Di Temukan", error.response);
      });
    Tiketservice.getAll()
      .then((response) => {
        this.Tickets = response.rows;
        console.log("Data Di Temukan", response.rows);
      })
      .catch((error) => {
        console.log("Eror Data Tidak Di Temukan", error.response);
      });
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      let params = {
        ticket_id: this.feedback.ticket_id,
        user_id: this.feedback.user_id,
        stars: this.feedback.stars,
        comment: this.feedback.comment,
      };
      this.$v.$touch();
      if (!this.$v.$invalid) {
        Feedbackservice.postCrated(params)
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
  },
};
</script>
