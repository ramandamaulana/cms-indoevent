<template>
  <!-- Sidebar -->
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="index.html"
    >
      <div class="sidebar-brand-icon">
        <i class="far fa-calendar-alt"></i>
      </div>
      <div class="sidebar-brand-text mx-3">Indo Event</div>
    </a>
    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Heading -->

    <!-- Heading -->
    <div class="sidebar-heading mt-2">
      Menu
    </div>

    <li class="nav-item">
      <router-link to="/Dashboard">
        <a class="nav-link" href="charts.html">
          <i class="far fa-user mr-2"></i>
          <span>Member</span></a
        >
      </router-link>
    </li>

    <li class="nav-item">
      <router-link to="/phone">
        <a class="nav-link" href="charts.html">
          <i class="fas fa-phone mr-2"></i>
          <span>Nomor Telepon</span></a
        >
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/tiket">
        <a class="nav-link" href="charts.html">
          <i class="fas fa-ticket-alt mr-2"></i>
          <span>Tiket</span></a
        >
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/jadwal">
        <a class="nav-link" href="charts.html">
          <i class="far fa-calendar-alt mr-2"></i>
          <span>Schedule</span></a
        >
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/faq">
        <a class="nav-link" href="charts.html">
          <i class="fas fa-question-circle mr-2"></i>
          <span>Faq</span></a
        >
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/feedback">
        <a class="nav-link" href="charts.html">
          <i class="fas fa-comments mr-2"></i>
          <span>Feedback</span></a
        >
      </router-link>
    </li>

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseTwo"
        aria-expanded="true"
        aria-controls="collapseTwo"
      >
        <i class="fas fa-newspaper mr-2"></i>
        <span>Artikel</span>
      </a>
      <div
        id="collapseTwo"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
        <router-link to="/artikel-kategori"> <a class="collapse-item" href="buttons.html">Artikel Kategori</a></router-link> 
          <a class="collapse-item" href="buttons.html">Artikel Comment</a>
          <a class="collapse-item" href="cards.html">Artikel POST</a>
        </div>
      </div>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />

    <!-- Sidebar Toggler (Sidebar) -->
    <div class="text-center d-none d-md-inline">
      <button class="rounded-circle border-0" id="sidebarToggle"></button>
    </div>
  </ul>
  <!-- End of Sidebar -->
</template>
