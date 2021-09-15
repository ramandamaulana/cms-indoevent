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
                        Edit Feedback
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
                                  v-model="feedback.stars"
                                  required
                                />
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
                                  required
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
import Feedbackservice from "../../service/feedback.service";
import MemberService from "../../service/member.service";
import Tiketservice from "../../service/tiket.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      feedbackd: this.$route.params.id,
      feedback: {
        ticket_id: "",
        user_id: "",
        stars: "",
        comment: "",
      },      
      Users: [],
      Tickets: [],
    };
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
    getDetail() {
      Feedbackservice.getShow(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          (this.feedback.ticket_id = response.rows.ticket_id),
          (this.feedback.user_id = response.rows.user_id),
            (this.feedback.stars = response.rows.stars),
            (this.feedback.comment = response.rows.comment);
        }
      });
    },
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      let params = {
        ticket_id: this.feedback.ticket_id,
        user_id: this.feedback.user_id,
        stars: this.feedback.stars,
        comment: this.feedback.comment,
      };
      Feedbackservice.postUpdate(this.$route.params.id, params)
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
  },
  mounted() {
    this.getDetail();
  },
};
</script>
