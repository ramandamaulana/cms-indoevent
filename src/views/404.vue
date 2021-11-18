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
            <div class="container-fluid" style="height: 100vh;">
                  <!-- 404 Error Text -->
                  <div class="notfound-section">
                    <div class="text-center">
                        <div class="error mx-auto" data-text="404">404</div>
                        <p class="lead text-gray-800 mb-5">Page Not Found</p>
                        <p class="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
                        <router-link to="/dashboard">← Back to Dashboard</router-link>
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
.container-fluid{
  position: relative;
}
.notfound-section{
  position: absolute;
    top: 45%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
}
</style>
<script>
import Navbar from "../components/layout/navbar.vue";
import Sidebar from "../components/layout/sidebar.vue";
import Footer from "../components/layout/footer";
export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
  }
};
</script>

