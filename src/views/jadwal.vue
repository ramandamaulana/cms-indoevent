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
                          <h4 class="mb-3">Tabel Jadwal</h4>
                        </div>
                        <div class="col-lg-6 text-right mb-3">
                          <a
                            class="btn btn-primary text-left"
                            @click.prevent="handleCreate"
                            v-if="$can('schedule/create')"
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
                          <span v-if="props.column.field == 'tanggal_kegiatan'">
                            {{
                              props.row.tgl_kegiatan | moment("DD MMMM YYYY")
                            }}
                          </span>
                          <span v-if="props.column.field == 'action'">
                            <button
                              class="btn btn-universal"
                              v-if="$can('schedule/update')"
                              @click.prevent="handleupdate(props.row.id)"
                            >
                              <i class="far fa-edit text-primary"></i>
                            </button>
                            <button
                              class="btn btn-universal"
                              type="submit"
                              v-if="$can('schedule/delete')"
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
import Jadwalservice from "../service/jadwal.service";
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
          field: "nama_kegiatan",
        },
        {
          label: "Tanggal",
          field: "tanggal_kegiatan",
        },
        {
          label: "Jam Mulai",
          field: "jam_mulai",
        },
        {
          label: "Jam Berakhir",
          field: "jam_berakhir",
        },
        {
          label: "Tempat",
          field: "tempat",
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
    let params = {
      "sort[by]": 'tgl_kegiatan',
      "sort[order]": 'asc',
    };
    let loading = this.$loading.show();
    Jadwalservice.getAll(params)
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
          Jadwalservice.getDelete(id)
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
      router.push("/jadwal/create");
    },
    handleupdate(id) {
      router.push("/jadwal/update/" + id);
    },
  },
};
</script>
