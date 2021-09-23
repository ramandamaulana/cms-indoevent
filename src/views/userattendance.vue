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
                          <h4 class="mb-3">Tabel User Attendance</h4>
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
                          <span v-if="props.column.field == 'persentase'">
                            {{ props.row.percentage }} %
                          </span>
                          <span v-if="props.column.field == 'action'">
                            <button
                              class="btn btn-universal"
                              @click.prevent="handleShow(props.row.id)"
                            >
                              <i class="far fa-eye text-primary"></i>
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
import Userattendance from "../service/userattendance.service";
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
          label: "Nama Schedule",
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
          label: "Jumlah Peserta",
          field: "jumlah_peserta",
        },
        {
          label: "Jumlah Hadir",
          field: "jumlah_hadir",
        },
        {
          label: "Jumlah Tidak Hadir",
          field: "tidak_hadir",
        },
        {
          label: "Persentase",
          field: "persentase",
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
    Userattendance.getAll()
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
    handleShow(id) {
      router.push("/user-attendance/" + id);
    },
  },
};
</script>
