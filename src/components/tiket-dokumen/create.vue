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
                    <div class="card-header">
                      <h3 style="font-size:Nunito; font-size:18px;">
                        Tambah Dokumen Tiket
                      </h3>
                    </div>
                    <div class="card-body">
                      <form @submit.prevent="submit($event)">
                        <div class="container">
                          <div class="row">
                            <div class="col-lg-12 mb-3 text-left">
                              <label for="exampleFormControlSelect1"
                                >Tiket</label
                              >
                              <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                v-model="tiketdokumen.ticket_id"
                                @click="changeProductID()"
                                @change="changeSelect(tiketdokumen.ticket_id)"
                              >
                                <option
                                  v-for="tiketdokumen in DokumenID"
                                  :key="tiketdokumen.id"
                                  :value="tiketdokumen.id"
                                  >{{ tiketdokumen.nama }}</option
                                >
                              </select>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group row">
                                <div class="col-sm-12">
                                  <label for="exampleFormControlSelect1"
                                    >Pilih Dokumen</label
                                  >
                                  <div class="form-check">
                                    <div
                                      v-for="(dokumen) in Dokumens"
                                      :key="dokumen.id"
                                    >
                                      <input
                                      
                                        class="form-check-input"
                                        type="checkbox"
                                        v-model="tiketdokumen.documents"
                                        :value="dokumen.id"
                                      />
                                      <label class="form-check-label">
                                        {{ dokumen.document.name }}
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="form-group text-center">
                          <a
                            class="btn btn-warning mr-3"
                            @click="$router.go(-1)"
                          >
                            Batal
                          </a>
                          <button type="submit" class="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </form>
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
<style scoped>
.form-control {
  border-radius: 4px;
}
</style>
<script>
import router from "@/router";
import Navbar from "../layout/navbar.vue";
import Sidebar from "../layout/sidebar.vue";
import Footer from "../layout/footer";
import Tiketservice from "../../service/tiket.service";
import Dokumen from "../../service/document.service";
import Tiketdokumenservice from "../../service/tiket-dokumen.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      tiketdokumen: {
        ticket_id: "",
        documents: [],
      },
      DokumenID: [],
      Dokumens: [],
      Checked: []
    };
  },
  created() {
    Dokumen.getAll()
      .then((response) => {
        this.Dokumens = response.rows;
        console.log("Data Di Temukan", response.rows);
      })
      .catch((error) => {
        console.log("Eror Data Tidak Di Temukan", error.response);
      });
  },
  methods: {
    submit(event) {
      event.preventDefault();
      let loading = this.$loading.show();
      let params = {
        ticket_id: this.tiketdokumen.ticket_id,
        documents: this.tiketdokumen.documents
      };
      Tiketdokumenservice.postCrated(params)
        .then((response) => {
          loading.hide();
          console.log(response.data, "Berhasil Di tambahkan");
          router.back();
        })
        .catch((error) => {
          loading.hide();
          console.log("Gagal Di tambahkan", error.response);
        });
    },
    changeProductID() {
      Tiketservice.getAll().then((response) => {
        this.DokumenID = response.rows;
      });
    },
    changeSelect(id){
      let params = {
        "ticket_id": id
      };
      Tiketdokumenservice.getAll(params)
        .then((response) => {
          console.log("Data ticket", response);
          this.tiketdokumen.documents = response.rows.map(o=>o.document_id)
        })
        .catch((error) => {
          console.log("Eror Data Tidak ticket", error);
        });
    }
  },
};
</script>
