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
                          <h4 class="mb-3">Tabel Member</h4>
                        </div>
                        <div class="col-lg-6 text-right mb-3">
                          <a
                            class="btn btn-primary text-left"
                            @click.prevent="handleCreate"
                            v-if="$can('member/create')"
                            ><i class="fa fa-plus mr-3"></i> Tambah</a
                          >
                          <a
                              class="btn btn-success ml-3"
                              v-if="$can('member/export')"
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
                          <span v-if="props.column.field == 'jenkel'">
                            {{ props.row.gender }}
                          </span>
                          <span v-if="props.column.field == 'transaksi'">
                            <span v-if="props.row.transaction_status == true">
                              Ada Transaksi
                            </span>
                            <span v-else>
                              Belum Transaksi
                            </span>
                          </span>
                          <span v-if="props.column.field == 'action'">
                            <button
                              class="btn btn-universal"
                              v-if="$can('member/detail')"
                              @click.prevent="
                                handletransaksi(props.row.user_id)
                              "
                            >
                              <i class="fas fa-money-check-alt  text-primary"></i>
                            </button>
                            <button
                              class="btn btn-universal"
                              v-if="$can('member/update')"
                              @click.prevent="handleupdate(props.row.id)"
                            >
                              <i class="far fa-edit text-primary"></i>
                            </button>
                            <button
                              class="btn btn-universal"
                              type="submit"
                              v-if="$can('member/delete')"
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
import Memberservice from "../service/member.service";
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
          label: "Perusahaan",
          field: "perusahaan",
        },
        {
          label: "Posisi",
          field: "posisi",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "No handphone",
          field: "no_telp",
        },
        {
          label: "Jenis Kelamin",
          field: "jenkel",
        },
        {
          label: "Transaksi",
          field: "transaksi",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      rows: [
        {
          name: "",
          perusahaan: "",
          posisi: "",
          email: "",
          no_telp: "",
          action: "",
        },
      ],
    };
  },
  created() {
    let loading = this.$loading.show();
    Memberservice.getAll()
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
          Memberservice.getDelete(id)
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
      router.push("/member/create");
    },
    handleupdate(id) {
      router.push("/member/update/" + id);
    },
    handletransaksi(id) {
      router.push("/member/detail/transaction/"+id);
    },
    handleExport() {
      axios({method: 'get',
        url:`${process.env.VUE_APP_URL}/api/admin/member/export`,
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
        fileLink.setAttribute('download', `members-export-${new Date()}.xlsx`);
        document.body.appendChild(fileLink);

        fileLink.click();
      })

      
    }
  },
};
</script>
