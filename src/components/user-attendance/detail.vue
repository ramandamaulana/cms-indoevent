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
                          <h4 class="mb-3">Tabel User Attendance Detail : {{ this.schedule  }}</h4>
                        </div>
                        <div class="col-lg-6 text-right mb-3">
                          <a
                              class="btn btn-success ml-3"
                              @click.prevent="handleExport()"
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
                          <div v-if="props.column.field == 'kehadiran'">
                            <span v-if="props.row.waktu_hadir != null">{{ props.row.waktu_hadir }}</span>
                            <span v-else>Belum Hadir</span>
                          </div>
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
import Navbar from "../layout/navbar.vue";
import Sidebar from "../layout/sidebar.vue";
import Footer from "../layout/footer";
import Userattendance from "../../service/userattendance.service";
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
          label: "Nama User",
          field: "name",
        },
        {
          label: "Kehadiran",
          field: "kehadiran",
        }
      ],
      rows: [],
      schedule_id: '',
      schedule: ''
    };
  },
  created() {
    Userattendance.getDetail(this.$route.params.id)
      .then((response) => {
        this.schedule = response.schedule;
        this.rows = response.rows;
        this.schedule_id = response.rows[0].schedule_id;
        console.log("Data Di Temukan", response.rows);
      })
      .catch((error) => {
        console.log("Eror Data Tidak Di Temukan", error.response);
      });
  },
  methods: {
    handleExport() {
        axios({method: 'get',
          url:`${process.env.VUE_APP_URL}/api/admin/user-attendance/export/${this.schedule_id}`,
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
          fileLink.setAttribute('download', `userattendances-export-${new Date()}.xlsx`);
          document.body.appendChild(fileLink);
  
          fileLink.click();
        })
      }
  }
};
</script>
