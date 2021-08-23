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
                        Edit Nomor
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1">Name</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  v-model="handphone.nama"
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <label for="exampleInputEmail1"
                                  >No.handphone</label
                                >
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputEmail1"
                                      oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                                  aria-describedby="emailHelp"
                                  v-model="handphone.no_telp"
                                  min="10" max="13"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                       <div class="container">
                          <div class="form-group text-right mt-4">
                            <button type="submit" class="btn btn-primary btn-lg">
                              Submit
                            </button>
                          </div>
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
import Phoneservice from "../../service/phone.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      PhoneId: this.$route.params.id,
      handphone: {
        nama: "",
        no_telp: "",
      },
    };
  },
  methods: {
    getDetail() {
      Phoneservice.getShow(this.$route.params.id).then((response) => {
        if (response.code === 200) {
          (this.handphone.nama = response.rows.nama),
          (this.handphone.no_telp = response.rows.no_telp);
        }
      });
    },
    submit(event) {
      event.preventDefault();
      let params = {
        nama: this.handphone.nama,
        no_telp: this.handphone.no_telp,
      };
      Phoneservice.postUpdate(this.$route.params.id, params)
        .then((response) => {
          console.log(response.data, "Berhasil Di tambahkan");
            router.back();
        })
        .catch((error) => {
          console.log("Gagal Di tambahkan", error.response);
        });
    },
  },
  mounted(){
    this.getDetail();
  },
};
</script>
