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
                          <h2 class="mb-3">Tabel Transaksi</h2>
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
                          <span v-if="props.column.field == 'gambar'">
                            <a :href="props.row.image.url"
                                target="_blank">
                              <img 
                                  v-if="props.row.image != null"
                                  :src="props.row.image.url" 
                                  class="img-thumbnail mt-3" 
                                  style="max-width: 200px;"
                                  :alt="props.row.image.name"
                                  >
                            </a>
                          </span>
                          <span v-if="props.column.field == 'status_transaksi'">
                            <span v-html="props.row.col_status"></span>
                          </span>
                          <span v-if="props.column.field == 'total_transaksi'">
                            {{ $helpers.formattingRupiah(props.row.total) }}
                          </span>
                          <span v-if="props.column.field == 'action' && props.row.status == 'pending'">
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
                          <span v-else>
                            {{ props.formattedRow[props.column.field] }}
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
          field: "gambar",
        },
        {
          label: "Status",
          field: "status_transaksi",
        },
        {
          label: "Total",
          field: "total_transaksi",
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
      let params = {
        id: id
      };
      Transcationservice.postSuccess(params)
        .then((response) => {
          console.log(response, "Berhasil Status");
          router.go();
        })
        .catch((error) => {
          console.log("Gagal", error.response);
        });
    },
    handleFailed(id) {
      let params = {
        id: id
      };
      Transcationservice.postFailed(params)
        .then((response) => {
          console.log(response, "Berhasil Status");
          // router.go();
        })
        .catch((error) => {
          console.log("Gagal Terhapus", error.response);
        });
    },
  },
};
</script>
