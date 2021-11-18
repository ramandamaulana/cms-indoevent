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
                        Role : {{ roleName }}
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <h3>Pilih Permission</h3>
                            <div class="col-xl-12">
                              <div class="form-group mt-3">
                                <div class="form-check">
                                  <div
                                    v-for="(permissions, index) in permissions"
                                    v-bind:index="index"
                                    :key="permissions.id"
                                  >
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      :id="index"
                                      v-model="assignPermissions"
                                      :value="permissions.name"
                                    />
                                    <label class="form-check-label" :for="index">
                                      {{ permissions.name }}
                                    </label>
                                    <div class="mb-3" v-if="(index % 5 === 0)"></div>
                                  </div>
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
                            class="btn btn-primary"
                          >
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
import Roleservice from "../../service/role.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      roleName : '',
      assignPermissions : [],
      permissions: [],
      userPermissions: [],
    };
  },
  created() {
    Roleservice.getPermissions()
      .then((response) => {
        this.permissions = response.rows;
        console.log("Data Di Temukan", response.rows);
      })
      .catch((error) => {
        console.log("Eror Data Tidak Di Temukan", error.response);
      });

    Roleservice.getRolePermissions(this.$route.params.id)
      .then((response) => {
        this.roleName = response.name;
        this.assignPermissions = response.rows.map(o=>o.name);
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
        id: this.$route.params.id,
        permissions: this.assignPermissions,
      };
      Roleservice.setRolePermission(params)
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
};
</script>
