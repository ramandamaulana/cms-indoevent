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
                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div
                            class="text-xs font-weight-bold text-primary text-uppercase mb-1"
                          >
                            Transaksi Sukses
                          </div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">
                            {{ this.transaksi_sukses }}
                          </div>
                        </div>
                        <div class="col-auto">
                          <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-warning shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div
                            class="text-xs font-weight-bold text-warning text-uppercase mb-1"
                          >
                            Jumlah Peserta
                          </div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">
                            {{ this.total_member }}
                          </div>
                        </div>
                        <div class="col-auto">
                          <i class="fas fa-users fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div
                            class="text-xs font-weight-bold text-success text-uppercase mb-1"
                          >
                            Jumlah Admin
                          </div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">
                            {{ this.total_admin }}
                          </div>
                        </div>
                        <div class="col-auto">
                          <i class="fas fa-user-tie fa-2x text-gray-300"></i>
                        </div>
                      </div>
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
<script>
import Navbar from "../components/layout/navbar.vue";
import Sidebar from "../components/layout/sidebar.vue";
import Footer from "../components/layout/footer";
import Dashboardservice from "../service/dashboard.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      transaksi_sukses: "",
      total_member: "",
      total_admin: "",
    };
  },
  created() {
    let loading = this.$loading.show();
    Dashboardservice.getAll()
      .then((response) => {
        loading.hide();
        this.transaksi_sukses = response.row.transaksi_sukses;
        this.total_member = response.row.total_member;
        this.total_admin = response.row.total_admin;
        console.log("Data Di Temukan", response.row);
      })
      .catch((error) => {
        console.log("Eror Data Tidak Di Temukan", error.response);
      });
  },
};
</script>
