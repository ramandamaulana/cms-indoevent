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
                          <h4 class="mb-3">Detail Transaksi Member</h4>
                        </div>
                        <div class="col-lg-6 text-right mb-3">
                          <a
                            class="btn btn-primary text-left"
                            @click.prevent="handleCreate(colum)"
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
                          <span v-if="props.column.field == 'gambar' && props.row.image != null">
                            <a :href="props.row.image.url" target="_blank">
                              <img
                                :src="props.row.image.url"
                                class="img-thumbnail mt-3"
                                style="max-width: 200px;"
                                :alt="props.row.image.name"
                              />
                            </a>
                          </span>
                          <span v-if="props.column.field == 'order_id'">
                            <span v-html="props.row.order_id"></span>
                          </span>
                          <span v-if="props.column.field == 'status_transaksi'">
                            <span v-html="props.row.col_status"></span>
                          </span>
                          <span v-if="props.column.field == 'total_transaksi'">
                            {{ $helpers.formattingRupiah(props.row.total) }}
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
import Navbar from "../layout/navbar.vue";
import Sidebar from "../layout/sidebar.vue";
import Footer from "../layout/footer";
import Membertransaksi from "../../service/member.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      colum: this.$route.params.id,
      columns: [
        {
          label: "Nama Tiket",
          field: "ticket",
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
      ],
      rows: [],
    };
  },
  methods: {
    getdetail() {
      Membertransaksi.getTransaksi(this.$route.params.id).then((response) => {
        console.log(response.rows[0].order_id);
        if (response.code === 200) {
          this.rows = response.rows;
        }
      });
    },
    handleCreate(id) {
      router.push("/member/transaction/create/" + id);
    },
  },
  mounted() {
    this.getdetail();
  },
};
</script>
