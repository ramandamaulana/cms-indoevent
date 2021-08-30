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
    <div class="sidebar-heading mt-2">
      Event
    </div>

    <li class="nav-item">
      <router-link to="/User-attendance">
        <a class="nav-link" href="charts.html">
         <i class="fas fa-user-tie mr-2"></i>
          <span>User attendance</span></a
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
      <router-link to="/document">
        <a class="nav-link" href="charts.html">
          <i class="fas fa-file-upload mr-2"></i>
          <span>Document</span></a
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

    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseTwo3"
        aria-expanded="true"
        aria-controls="collapseTwo3"
      >
        <i class="fas fa-ticket-alt mr-2"></i>
        <span>Tiket</span>
      </a>
      <div
        id="collapseTwo3"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link to="/tiket">
            <a class="collapse-item"><span>Tiket</span></a>
          </router-link>
          <router-link to="/tiket-document">
            <a class="collapse-item">Tiket Document</a></router-link
          >
          <router-link to="/tiket-schedule">
            <a class="collapse-item">Tiket Schedule</a></router-link
          >
        </div>
      </div>
    </li>

    <!-- Heading -->
    <div class="sidebar-heading mt-2">
      Website
    </div>

    <li class="nav-item">
      <router-link to="/admin">
        <a class="nav-link" href="charts.html">
          <i class="far fa-user mr-2"></i>
          <span>Admin</span></a
        >
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/bank">
        <a class="nav-link" href="charts.html">
          <i class="fas fa-university mr-2"></i>
          <span>Bank</span></a
        >
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/Transaction">
        <a class="nav-link" href="charts.html">
          <i class="fas fa-coins mr-2"></i>
          <span>Transaction</span></a
        >
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/Dashboard">
        <a class="nav-link" href="charts.html">
          <i class="far fa-user mr-2"></i>
          <span>Member</span></a
        >
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/Team">
        <a class="nav-link" href="charts.html">
          <i class="fas fa-user-friends mr-2"></i>
          <span>Team</span></a
        >
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/landing">
        <a class="nav-link" href="charts.html">
          <i class="fas fa-pager mr-2"></i>
          <span>Landing Page</span></a
        >
      </router-link>
    </li>
    <li class="nav-item">
      <a
        class="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        data-target="#collapseTwo2"
        aria-expanded="true"
        aria-controls="collapseTwo2"
      >
        <i class="fa fa-info-circle mr-2" aria-hidden="true"></i>
        <span>Info Setting</span>
      </a>
      <div
        id="collapseTwo2"
        class="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link to="/Information">
            <a class="collapse-item">Information</a></router-link
          >
          <router-link to="/Information-Detail">
            <a class="collapse-item">Information Detail</a></router-link
          >
          <router-link to="/Information-user">
            <a class="collapse-item">Information User</a></router-link
          >
        </div>
      </div>
    </li>
    <li class="nav-item">
      <router-link to="/gallery">
        <a class="nav-link" href="charts.html">
          <i class="fab fa-envira mr-2"></i>
          <span>Galery</span></a
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
      <router-link to="/faq">
        <a class="nav-link" href="charts.html">
          <i class="fas fa-question-circle mr-2"></i>
          <span>Faq</span></a
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
          <router-link to="/artikel-kategori">
            <a class="collapse-item" href="buttons.html"
              >Artikel Kategori</a
            ></router-link
          >
          <router-link to="/artikel-comment">
            <a class="collapse-item" href="buttons.html"
              >Artikel Komen</a
            ></router-link
          >
          <router-link to="/artikel-post">
            <a class="collapse-item" href="buttons.html"
              >Artikel Post</a
            ></router-link
          >
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
