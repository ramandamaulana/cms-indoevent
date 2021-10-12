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
                          <h4 class="mb-3">Tabel Transaksi</h4>
                        </div>
                        <div class="col-lg-6 text-right mb-3">
                          <a
                              class="btn btn-success ml-3"
                              @click.prevent="handleExport"
                          >
                              Export
                          </a>
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
                            <a
                              :href="props.row.image.url"
                              v-if="props.row.image != null"
                              target="_blank"
                            >
                              <img
                                v-if="props.row.image != null"
                                :src="props.row.image.url"
                                class="img-thumbnail mt-3"
                                style="max-width: 200px;"
                                :alt="props.row.image.name"
                              />
                            </a>
                          </span>
                          <span v-if="props.column.field == 'status_transaksi'">
                            <span v-html="props.row.col_status"></span>
                          </span>
                          <span v-if="props.column.field == 'total_transaksi'">
                            {{ $helpers.formattingRupiah(props.row.total) }}
                          </span>
                          <span v-if="props.column.field == 'action'">
                            <button
                              class="btn btn-success mr-2"
                              type="submit"
                              v-if="props.row.status == 'pending'"
                              @click.prevent="handlesuccess(props.row.id)"
                            >
                              Success
                            </button>
                            <button
                              class="btn btn-danger"
                              type="submit"
                              v-if="props.row.status == 'pending'"
                              @click.prevent="handleFailed(props.row.id)"
                            >
                              Failed
                            </button>
                            <button
                              class="btn btn-universal"
                              type="submit"
                              @click.prevent="handledelete(props.row.id)"
                            >
                              <i class="far fa-trash-alt text-primary"></i>
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
import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
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
    let loading = this.$loading.show();
    let params = {
      "sort[by]": "id",
      "sort[order]": "desc",
    };
    Transcationservice.getAll(params)
      .then((response) => {
        loading.hide();
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
        id: id,
      };
      this.$swal({
        title: "Sukseskan data transaksi ini?",
        text: "Data ini akan terproses menjadi sukses",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yakin",
        cancelButtonText: "Batal",
      }).then((result) => {
        // <--
        if (result.value) {
          // <-- if confirmed
          Transcationservice.postSuccess(params)
            .then((response) => {
              console.log(response, "Berhasil Status");
              router.go();
            })
            .catch((error) => {
              console.log("Gagal", error.response);
            });
        }
      });
    },
    handleFailed(id) {
      let params = {
        id: id,
      };
      this.$swal({
        title: "Gagalkan data transaksi ini?",
        text: "Data ini akan terproses menjadi gagal",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yakin",
        cancelButtonText: "Batal",
      }).then((result) => {
        // <--
        if (result.value) {
          // <-- if confirmed
          Transcationservice.postFailed(params)
            .then((response) => {
              console.log(response, "Berhasil Status");
              router.go();
            })
            .catch((error) => {
              console.log("Gagal Terhapus", error.response);
            });
        }
      });
    },
    handledelete(id) {
      this.$swal({
        title: "Hapus data ini?",
        text: "Data ini akan terhapus selamanya",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        // <--
        if (result.value) {
          // <-- if confirmed
          Transcationservice.getDelete(id)
            .then((response) => {
              console.log(response, "Berhasil Terhapus");
              router.go();
            })
            .catch((error) => {
              console.log("Gagal Terhapus", error.response);
            });
        }
      });
    },
    handleCreate() {
      router.push("/transaction/create");
    },
    handleExport() {
      axios({method: 'get',
        url:`${process.env.VUE_APP_URL}/api/admin/transaction/export`,
        responseType: "arraybuffer",
        headers: {
            'Authorization': "Bearer " + user.data.access_token,
            'X_USER_ID': user.data.id,
          },
      })
      .then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', `transactions-export-${new Date()}.xlsx`);
        document.body.appendChild(fileLink);

        fileLink.click();
      })      
    }
  },
};
</script>
