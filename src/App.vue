<template>
  <v-app>
    <v-toolbar app color="primary" class="px-5">
      <v-spacer/>
      <v-toolbar-items>
        <v-btn tag="v-btn" v-if="!user.authenticated" :to="{name: 'login'}" dark flat>Login</v-btn>
        <v-btn tag="v-btn" :to="{name: 'party'}" dark flat>Parties & Candidates</v-btn>
        <v-btn v-if="(user.role != 'ADMIN')" tag="v-btn" :to="{name: 'vote'}" dark="" flat>Vote</v-btn>
        <v-btn tag="v-btn" :to="{name: 'results'}" dark="" flat>Results</v-btn>
        <v-btn v-if="user.authenticated" tag="v-btn" :to="{name: 'logout'}" dark="" flat>Logout</v-btn>
        <!-- <v-btn tag="v-btn" :to="{name: 'login'}" flat>{{user['authenticated'] ? 'Logout': 'Login'}}</v-btn> -->
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app color="secondary" height="50" style="justify-content: center">
      <span>
        @ 2019 Copyright. All Right Reserved : Design by Aliyu Isah Yunusa,
        Reg No. - ISMA/CTN/16/0174/CSC, Computer Science dept,
        ISM ADONAI University, Republic of Benin
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user", "userRoles"])
  }
};
</script>
