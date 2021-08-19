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
                    <div class="card-body">
                      <div class="row ">
                        <div class="col-lg-6 text-left">
                          <h6
                            style="font-family: 'Poppins'; font-size: 14px; font-weight: bold;"
                          ></h6>
                        </div>
                        <div class="col-lg-6 text-right mb-3">
                          <a
                            class="btn btn-primary text-left"
                            @click.prevent="handleCreate"
                            ><i class="fa fa-plus mr-3"></i> Tambah</a
                          >
                        </div>
                      </div>
                      <div class="table-responsive">
                        <table class="table table-bordered ">
                          <thead>
                            <tr>
                              <th scope="col">Nama</th>
                              <th scope="col">No Handphone</th>
                              <th scope="col">Kuota</th>
                              <th scope="col">Harga</th>

                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="tiket in tikets" :key="tiket.id">
                              <th>{{ tiket.nama }}</th>
                              <td>{{ tiket.keterangan }}</td>
                              <td>{{ tiket.kuota }}</td>
                              <td>{{ tiket.harga }}</td>
                              <td>
                                <button
                                  class="btn btn-universal"
                                  @click.prevent="handleupdate(tiket.id)"
                                >
                                  <i class="far fa-edit text-primary"></i>
                                </button>
                                <button
                                  class="btn btn-universal"
                                  type="submit"
                                  @click.prevent="handledelete(tiket.id)"
                                >
                                  <i class="far fa-trash-alt text-primary"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                          <ul class="pagination justify-content-end">
                            <li class="page-item disabled">
                              <a class="page-link" href="#" tabindex="-1"
                                >Previous</a
                              >
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">1</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">2</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">3</a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">Next</a>
                            </li>
                          </ul>
                        </nav>
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
import router from "@/router";
import Navbar from "../components/layout/navbar.vue";
import Sidebar from "../components/layout/sidebar.vue";
import Footer from "../components/layout/footer";
import Tiketservice from "../service/tiket.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      tikets: [],
    };
  },
  created() {
    Tiketservice.getAll()
      .then((response) => {
        this.tikets = response.rows;
        console.log("Data Di Temukan", response.rows);
      })
      .catch((error) => {
        console.log("Eror Data Tidak Di Temukan", error.response);
      });
  },
  methods: {
    handledelete(id) {
      Tiketservice.getDelete(id)
        .then((response) => {
          console.log(response, "Berhasil Terhapus");
          router.go();
        })
        .catch((error) => {
          console.log("Gagal Terhapus", error.response);
        });
    },
    handleCreate() {
      router.push("/tiket-create");
    },
    handleupdate(id) {
      router.push("/tiket-update/" + id);
    },
  },
};
</script>
