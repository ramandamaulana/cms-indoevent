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
                      <vue-good-table
                        :columns="columns"
                        :rows="rows"
                        :line-numbers="true"
                        :search-options="{
                          enabled: true,
                        }"
                        :pagination-options="{
                          enabled: true,
                        }"
                      >
                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'action'">
                            <button
                              class="btn btn-success mr-2"
                              type="submit"
                              @click.prevent="handlesuccess(props.row.id)"
                            >
                              Success
                            </button>
                            <button
                              class="btn btn-danger"
                              type="submit"
                              @click.prevent="handleFailed(props.row.id)"
                            >
                              Failed
                            </button>
                          </span>
                        </template>
                      </vue-good-table>
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
import Transcationservice from "../service/transaction.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      columns: [
        {
          label: "Nama",
          field: "name",
        },
        {
          label: "Order Id",
          field: "order_id",
        },
        {
          label: "Gambar",
          field: "image",
        },
        {
          label: "Status",
          field: "status",
        },
        {
          label: "Total",
          field: "total",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      rows: [],
    };
  },
  created() {
    Transcationservice.getAll()
      .then((response) => {
        this.rows = response.rows;
        console.log("Data Di Temukan", response.rows);
      })
      .catch((error) => {
        console.log("Eror Data Tidak Di Temukan", error.response);
      });
  },
  methods: {
    handlesuccess(id) {
      Transcationservice.postSuccess(id)
        .then((response) => {
          console.log(response, "Berhasil Status");
          router.go();
        })
        .catch((error) => {
          console.log("Gagal Terhapus", error.response);
        });
    },
    handleFailed(id) {
      Transcationservice.postFailed(id)
        .then((response) => {
          console.log(response, "Berhasil Status");
          router.go();
        })
        .catch((error) => {
          console.log("Gagal Terhapus", error.response);
        });
    },
  },
};
</script>
