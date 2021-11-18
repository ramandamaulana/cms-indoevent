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
                        Set Role User
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-sm-12 mb-3">
                              <label for="exampleFormControlSelect1"
                                  >Pilih Admin</label
                              >
                                <select
                                    class="form-control"
                                    id="exampleFormControlSelect1"
                                    v-model="setRole.adminId"
                                    @blur="$v.setRole.adminId.$touch()"
                                >
                                  <option
                                      v-for="admins in Admins"
                                      :key="admins.id"
                                      :value="admins.id"
                                      >{{ admins.name }} - {{ admins.username }} - {{ admins.email }} - {{ admins.role_name }}</option
                                  >
                                </select>
                                <div v-if="$v.setRole.adminId.$error">
                                  <p
                                    v-if="!$v.setRole.adminId.required"
                                    class="text-danger mt-1"
                                  >
                                    Admin Wajib Di isi
                                  </p>
                                </div>
                            </div>
                            <div class="col-sm-12">
                              <label for="exampleFormControlSelect1"
                                  >Pilih Role</label
                              >
                                <select
                                    class="form-control"
                                    id="exampleFormControlSelect1"
                                    v-model="setRole.roleId"
                                    @blur="$v.setRole.roleId.$touch()"
                                >
                                  <option
                                      v-for="roles in Roles"
                                      :key="roles.id"
                                      :value="roles.id"
                                      >{{ roles.name }}</option
                                  >
                                </select>
                                <div v-if="$v.setRole.roleId.$error">
                                  <p
                                    v-if="!$v.setRole.roleId.required"
                                    class="text-danger mt-1"
                                  >
                                    Role Wajib Di isi
                                  </p>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div class="form-group mt-3 text-center">
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
import Roleservice from "../../service/role.service";
import Adminservice from "../../service/admin.service";
import { required } from "vuelidate/lib/validators";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      setRole: {
        adminId: "",
        roleId: "",
      },
      Admins: [],
      Roles: [],
    };
  },
  validations: {
    setRole: {
      adminId: { required },
      roleId: { required },
    },
  },
  created() {
    let loading = this.$loading.show();
    Adminservice.getAll()
      .then((response) => {
        loading.hide();
        this.Admins = response.rows;
        console.log("Data Di Temukan", response.rows);
      })
      .catch((error) => {
        console.log("Eror Data Tidak Di Temukan", error.response);
      });
    Roleservice.getAll()
      .then((response) => {
        loading.hide();
        this.Roles = response.rows;
        console.log("Data Di Temukan", response.rows);
      })
      .catch((error) => {
        console.log("Eror Data Tidak Di Temukan", error.response);
      });
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let params = {
        admin_id: this.setRole.adminId,
        role_id: this.setRole.roleId,
      };
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let loading = this.$loading.show();
        Roleservice.setUserRole(params)
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
