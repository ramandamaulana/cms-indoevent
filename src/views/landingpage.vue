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
                  <div class="card mb-4">
                    <div class="card-body">
                      <div class="row ">
                        <div class="col-lg-6 text-left">
                          <h4 class="mb-3">Tabel Landing Page</h4>
                        </div>
                        <div class="col-lg-6 text-right mb-3">
                          <a
                            class="btn btn-primary text-left"
                            @click.prevent="handleCreate"
                            ><i class="fa fa-plus mr-3"></i> Tambah</a
                          >
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-lg-12">
                          <form>
                            <div class="row">
                              <div class="col-lg-12">
                                <div class="form-group">
                                  <label for="exampleInputEmail1"
                                    >Header Title</label
                                  >
                                  <input
                                    type="email"
                                    class="form-control"
                                    v-model="header_title"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div class="col-lg-12">
                                <div class="form-group">
                                  <label>Deskripsi</label>
                                  <textarea
                                    v-model="header_desc"
                                    class="form-control"
                                    disabled
                                    cols="30"
                                    rows="5"
                                  ></textarea>
                                </div>
                              </div>
                              <div class="col-lg-12">
                                <div class="form-group">
                                  <label> Banner Image</label>
                                  <br />
                                  <img
                                    :if="banner_img != null"
                                    :src="banner_img.url"
                                    width="500px"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div class="col-lg-12 mt-3">
                                <div class="form-group">
                                  <label for="exampleInputEmail1"
                                    >Launcing Date</label
                                  >
                                  <input
                                    type="email"
                                    class="form-control"
                                    v-model="launching_date"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div class="col-lg-12 mt-3">
                                <div class="form-group">
                                  <label for="exampleInputEmail1"
                                    >Team Title</label
                                  >
                                  <input
                                    type="email"
                                    class="form-control"
                                    v-model="team_title"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div class="col-lg-12">
                                <div class="form-group">
                                  <label>Team Deskripsi</label>
                                  <textarea
                                    v-model="team_desc"
                                    class="form-control"
                                    disabled
                                    cols="30"
                                    rows="5"
                                  ></textarea>
                                </div>
                              </div>
                              <div class="col-lg-12">
                                <div class="form-group">
                                  <label>About Title</label>
                                  <input
                                    v-model="about_title"
                                    class="form-control"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div class="col-lg-12">
                                <div class="form-group">
                                  <label>About Deskripsi</label>
                                  <textarea
                                    v-model="about_desc"
                                    class="form-control"
                                    disabled
                                    cols="30"
                                    rows="5"
                                  ></textarea>
                                </div>
                              </div>
                              <div class="col-lg-12">
                                <div class="form-group">
                                  <label>Artikel Title</label>
                                  <input
                                    v-model="article_title"
                                    class="form-control"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div class="col-lg-12">
                                <div class="form-group">
                                  <label>Artikel Deskripsi</label>
                                  <textarea
                                    v-model="article_desc"
                                    class="form-control"
                                    disabled
                                    cols="30"
                                    rows="5"
                                  ></textarea>
                                </div>
                              </div>
                              <div class="col-lg-12">
                                <div class="form-group">
                                  <label>Footer Title</label>
                                  <input
                                    v-model="footer_title"
                                    class="form-control"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div class="col-lg-12">
                                <div class="form-group">
                                  <label>Footer Deskripsi</label>
                                  <textarea
                                    v-model="footer_desc"
                                    class="form-control"
                                    disabled
                                    cols="30"
                                    rows="5"
                                  ></textarea>
                                </div>
                              </div>
                              <div class="col-lg-12">
                                <div class="form-group">
                                  <label>Google Map</label>
                                  <div v-html="google_map"></div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
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
import Landingservice from "../service/landing.service";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
  data() {
    return {
      header_title: "",
      header_desc: "",
      banner_img: "",
      launching_date: "",
      team_title: "",
      team_desc: "",
      article_title: "",
      article_desc: "",
      about_title: "",
      about_desc: "",
      footer_title: "",
      footer_desc: "",
      google_map: "",
    };
  },
  created() {
    let loading = this.$loading.show();
    Landingservice.getAll()
      .then((response) => {
        loading.hide();
        this.header_title = response.rows.header_title;
        this.header_desc = response.rows.header_desc;
        this.banner_img = response.rows.banner_img;
        this.launching_date = response.rows.launching_date;
        this.team_title = response.rows.team_title;
        this.team_desc = response.rows.team_desc;
        this.about_title = response.rows.about_title;
        this.about_desc = response.rows.about_desc;
        this.article_title = response.rows.article_title;
        this.article_desc = response.rows.article_desc;
        this.footer_title = response.rows.footer_title;
        this.footer_desc = response.rows.footer_desc;
        this.google_map = response.rows.google_map;
        console.log(response.rows);
      })
      .catch((error) => {
        console.log(error.response);
      });
  },
  methods: {
    handleCreate() {
      router.push("/landing/create");
    },
  },
};
</script>
