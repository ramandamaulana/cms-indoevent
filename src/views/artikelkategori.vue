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
                              class="btn btn-universal"
                              @click.prevent="handleupdate(props.row.id)"
                            >
                              <i class="far fa-edit text-primary"></i>
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
import Kategoriservice from "../service/artikel-kategori.service";
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
          label: "title",
          field: "title",
        },
        {
          label: "Slug",
          field: "slug",
        },
        {
          label: "Konten",
          field: "content",
        },
     
        {
          label: "Action",
          field: "action",
        },
      ],
      rows: [
        {
          title: "",
          slug: "",
          konten: "",
          action: "",
        },
      ],
    };
  },
  created() {
    Kategoriservice.getAll()
      .then((response) => {
        this.rows = response.rows;
        console.log("Data Di Temukan", response.rows);
      })
      .catch((error) => {
        console.log("Eror Data Tidak Di Temukan", error.response);
      });
  },
  methods: {
    handledelete(id) {
      Kategoriservice.getDelete(id)
        .then((response) => {
          console.log(response, "Berhasil Terhapus");
          router.go();
        })
        .catch((error) => {
          console.log("Gagal Terhapus", error.response);
        });
    },
    handleCreate() {
      router.push("/artikelkategori-create");
    },
    handleupdate(id) {
      router.push("/artikelkategori-update/" + id);
    },
  },
};
</script>
