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
                        Tambah Informasi User
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="form-group row">
                                <div class="col-sm-12">
                                    <label for="exampleFormControlSelect1"
                                        >Pilih Informasi</label
                                    >
                                    <select
                                        class="form-control"
                                        id="exampleFormControlSelect1"
                                        v-model="information.id"
                                        @change="changeSelectInfo(information.id)"
                                    >
                                    <option
                                        v-for="information in Infos"
                                        :key="information.id"
                                        :value="information.id"
                                        >{{ information.information }}</option
                                    >
                                </select>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group row">
                                <div class="col-sm-12">
                                    <label for="exampleFormControlSelect1"
                                        >Pilih Detail Informasi</label
                                    >
                                    <select
                                        class="form-control"
                                        id="exampleFormControlSelect1"
                                        v-model="information_user.information_detail_id"
                                    >
                                    <option
                                        v-for="information_detail in InfoDetails"
                                        :key="information_detail.id"
                                        :value="information_detail.id"
                                        >{{ information_detail.detail }}</option
                                    >
                                </select>
                                </div>
                              </div>
                            </div>
                            <div class="col-lg-12 mb-3 text-left">
                              <label for="exampleFormControlSelect1"
                                >Pilih User</label
                              >
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                v-model="information_user.user_id"
                              >
                                <option
                                  v-for="information_user in Users"
                                  :key="information_user.id"
                                  :value="information_user.id"
                                  >{{ information_user.name }} - 
                                   {{ information_user.gender }} - 
                                   {{ information_user.no_telp }} </option
                                >
                              </select>
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
import Info from "../../service/info.service";
import InfoDetailService from "../../service/info-detail.service";
import InfoUserService from "../../service/info-user.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      information: {id : ""}, 
      information_user: {
        user_id: "",
        information_detail_id: "",
      },
      Users: [],
      InfoDetails: [],
      Infos: [],
    };
  },
  created() {
    InfoUserService.getAllNoInfo()
      .then((response) => {
        this.Users = response.rows;
        console.log("Data Di Temukan", response.rows);
      })
      .catch((error) => {
        console.log("Eror Data Tidak Di Temukan", error.response);
      });
    Info.getAll()
      .then((response) => {
        this.Infos = response.rows;
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
        user_id: this.information_user.user_id,
        information_detail_id: this.information_user.information_detail_id
      };
      console.log(params);
      InfoUserService.postCrated(params)
        .then((response) => {
          loading.hide();
          console.log(response, "Berhasil Di tambahkan");
          router.back();
        })
        .catch((error) => {
          loading.hide();
          console.log("Gagal Di tambahkan", error.response);
        });
    },
    changeSelectInfo(id){
      let params = {
        "information_id": id
      };
      console.log(id);
      InfoDetailService.getAll(params)
        .then((response) => {
          console.log("info detail ", response);
          this.InfoDetails = response.rows;
        })
        .catch((error) => {
          console.log("Eror Data Tidak ticket", error);
        });
    },
  },
};
</script>
