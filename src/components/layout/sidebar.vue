<template>
  <!-- Sidebar -->
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="/dashboard"
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

    <li class="nav-item">
      <router-link to="/dashboard" class="nav-item">
        <div class="nav-link">
          <i class="far fa-calendar-alt mr-2"></i>
          <span>Dashboard</span>
        </div>
      </router-link>
    </li>

    <div class="sidebar-heading mt-2">
      Event
    </div>

    <li
      class="nav-item"
      :class="this.$route.path.includes('/tiket') ? 'active' : ''"
    >
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
        :class="this.$route.path.includes('/tiket') ? 'show' : ''"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link
            to="/tiket"
            :class="
              this.$route.path.includes('/tiket/document') ||
              this.$route.path.includes('/tiket/schedule')
                ? 'disable'
                : ''
            "
            class="collapse-item"
          >
            <span>Tiket</span>
          </router-link>
          <router-link to="/tiket/document" class="collapse-item">
            Tiket Document
          </router-link>
          <router-link to="/tiket/schedule" class="collapse-item">
            Tiket Schedule
          </router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <router-link to="/jadwal" class="nav-item">
        <div class="nav-link">
          <i class="far fa-calendar-alt mr-2"></i>
          <span>Schedule</span>
        </div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/user-attendance" class="nav-item">
        <div class="nav-link">
          <i class="fas fa-user-tie mr-2"></i>
          <span>User Attendance</span>
        </div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/document" class="nav-item">
        <div class="nav-link">
          <i class="fas fa-file-upload mr-2"></i>
          <span>Document</span>
        </div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/feedback" class="nav-item">
        <div class="nav-link">
          <i class="fas fa-comments mr-2"></i>
          <span>Feedback</span>
        </div>
      </router-link>
    </li>
    <!-- Heading -->
    <div class="sidebar-heading mt-2">
      Peserta
    </div>

    <li class="nav-item">
      <router-link to="/Transaction" class="nav-item">
        <div class="nav-link">
          <i class="fas fa-coins mr-2"></i>
          <span>Transaction</span>
        </div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/member" class="nav-item">
        <div class="nav-link">
          <i class="far fa-user mr-2"></i>
          <span>Member</span>
        </div>
      </router-link>
    </li>
    <li
      class="nav-item"
      :class="this.$route.path.includes('/info') ? 'active' : ''"
    >
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
        :class="this.$route.path.includes('/info') ? 'show' : ''"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link
            to="/info"
            class="collapse-item"
            :class="
              this.$route.path.includes('/info/detail') ||
              this.$route.path.includes('/info/user')
                ? 'disable'
                : ''
            "
          >
            Information
          </router-link>
          <router-link to="/info/detail" class="collapse-item">
            Information Detail
          </router-link>
          <router-link to="/info/user" class="collapse-item">
            Information User
          </router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <router-link to="/faq" class="nav-item">
        <div class="nav-link">
          <i class="fas fa-question-circle mr-2"></i>
          <span>Faq</span>
        </div>
      </router-link>
    </li>
    <!-- Heading -->
    <div class="sidebar-heading mt-2">
      Website
    </div>

    <li class="nav-item">
      <router-link to="/landing" class="nav-item">
        <div class="nav-link">
          <i class="fas fa-pager mr-2"></i>
          <span>Landing Page</span>
        </div>
      </router-link>
    </li>
    <!-- Nav Item - Pages Collapse Menu -->
    <li
      class="nav-item"
      :class="this.$route.path.includes('/artikel') ? 'active' : ''"
    >
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
        :class="this.$route.path.includes('/artikel') ? 'show' : ''"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <router-link to="/artikel/kategori" class="collapse-item">
            Artikel Kategori
          </router-link>
          <router-link to="/artikel/komen" class="collapse-item">
            Artikel komen
          </router-link>
          <router-link to="/artikel/post" class="collapse-item">
            Artikel post
          </router-link>
        </div>
      </div>
    </li>
    <li class="nav-item">
      <router-link to="/gallery" class="nav-item">
        <div class="nav-link">
          <i class="fab fa-envira mr-2"></i>
          <span>Galeri</span>
        </div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/team" class="nav-item">
        <div class="nav-link">
          <i class="fas fa-user-friends mr-2"></i>
          <span>Tim</span>
        </div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/phone" class="nav-item">
        <div class="nav-link">
          <i class="fas fa-phone mr-2"></i>
          <span>Nomor Telepon</span>
        </div>
      </router-link>
    </li>
    <li class="nav-item">
      <router-link to="/bank" class="nav-item">
        <div class="nav-link">
          <i class="fas fa-university mr-2"></i>
          <span>Bank</span>
        </div>
      </router-link>
    </li>

    <!-- Heading -->
    <div class="sidebar-heading mt-2">
      Administrator
    </div>

    <li class="nav-item">
      <router-link to="/admin" class="nav-item">
        <div class="nav-link">
          <i class="far fa-user mr-2"></i>
          <span>Admin</span>
        </div>
      </router-link>
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
