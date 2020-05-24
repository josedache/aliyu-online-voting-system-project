<template>
  <v-layout fill-height>
    <v-flex>
      <v-navigation-drawer>
        <v-layout justify-center align-center class="mt-4" column>
          <div>
            <v-avatar size="200">
              <img
                :src="`http://localhost:8080/img/${user.id}.jpg`"
                @error="setAlternateImage"
                alt="empty"
              >
            </v-avatar>
          </div>
          <div>
            <!-- <v-text-field type="file" id="file" ref="file" @change="handleFileUpload" solo/> -->
            <v-btn color="primary" @click="$refs.file.click()">Update Picture</v-btn>
            <input
              type="file"
              id="file"
              ref="file"
              style="display: none"
              accept="image/jpeg"
              @change="handleFileUpload"
            >
          </div>
        </v-layout>
        <span
          class="title font-weight-light text-xs-center d-block mt-3"
        >{{`${user.lastName} ${user.firstName}`}}</span>
        <v-list class="mt-3">
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>phone</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user['phoneNumber']}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="user.authenticated && user.role == userRoles.CANDIDATE">
            <v-list-tile-avatar>
              <v-icon>info</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user.post}}</v-list-tile-title>
            </v-list-tile-content>
            <!-- <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>-->
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon>accessibility</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{user.role}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-container>
          <v-btn
            v-if="user.authenticated"
            block
            outline
            round
            color="primary"
            :to="{name: 'change-password'}"
          >Change password</v-btn>
          <v-btn
            v-if="user.authenticated && user.role == userRoles.ADMIN"
            block
            outline
            round
            color="primary"
            :to="{name: 'create-user', query: {role: userRoles.ADMIN}}"
          >Create Admin</v-btn>
          <v-btn
            v-if="user.authenticated && user.role == userRoles.ADMIN"
            block
            outline
            round
            color="primary"
            :to="{name: 'create-user', query: {role: userRoles.CANDIDATE}}"
          >Create candidates</v-btn>
          <v-btn
            v-if="user.authenticated && user.role == userRoles.ADMIN"
            block
            outline
            round
            color="primary"
            :to="{name: 'remove-user' , query: {of: 'user'}}"
          >Remove user</v-btn>
          <v-btn
            v-if="user.authenticated && user.role == userRoles.ADMIN"
            block
            outline
            round
            color="primary"
            :to="{name: 'create-party'}"
          >Create Party</v-btn>
          <v-btn
            v-if="user.authenticated && user.role == userRoles.ADMIN"
            block
            outline
            round
            color="primary"
            :to="{name: 'remove-party', query: {of: 'party'}}"
          >Remove Party</v-btn>
        </v-container>
      </v-navigation-drawer>
    </v-flex>
    <v-flex md10>
      <v-container fill-height>
        <router-view/>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      file: ""
    };
  },
  computed: {
    ...mapState(["user", "userRoles"])
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.changeProfilePicture({ file: this.file, id: this.user.id });
    },
    setAlternateImage(event) {
      if (event) {
        event.target.onerror = null;
        event.target.src = "http://localhost:8080/img/empty-img-3.png";
        // console.log(event);
      }
    },
    ...mapActions(["changeProfilePicture"])
  }
};
</script>

