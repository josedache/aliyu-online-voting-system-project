<template>
  <v-container fill-height>
    <v-layout justify-center fill-height align-center>
      <v-flex xs6>
        <v-card>
          <v-card-title>
            <v-flex>
              <h3 class="display-3 font-weight-thin text-lg-center">Login</h3>
            </v-flex>
          </v-card-title>

          <v-form>
            <v-container>
              <v-alert
                :value="showAlert"
                transition="scale-transition"
                type="error"
                class="mb-3"
              >Invalid user</v-alert>
              <v-text-field label="Username" v-model="info.username" outline/>
              <v-text-field label="Password" type="password" v-model="info.password" outline/>
              <v-layout justify-end>
                <div>
                  <v-btn :to="{name: 'signup', query: {role: userRoles.VOTER}}" color="primary" round outline class="my-0">Sign up</v-btn>
                  <v-btn @click="loginUserAndRedirect" round outline color="primary" class="my-0">Sign in</v-btn>
                </div>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      info: {
        username: "",
        password: ""
      },
      showAlert: false
    };
  },
  computed: {
    ...mapState(["userRoles", "user"])
  },
  methods: {
    loginUserAndRedirect() {
      this.loginUser(this.info)
        .then(({ data, status }) => {
          if (status == 200) {
            this.updateStoreUser(data);
            switch (this.user.role) {
              case this.userRoles.VOTER:
                this.$router.push({ name: "party" });
                break;
              case this.userRoles.ADMIN:
                this.$router.push({ name: "create-party" });
                break;
              case this.userRoles.CANDIDATE:
                this.$router.push({ name: "party" });
                break;
              default: // stay on this page
            }
          } else throw Error("Invalid user");
        })
        .catch(error => {
          this.showAlert = true;
        });
    },
    ...mapActions(["loginUser"]),
    ...mapMutations(["updateStoreUser"])
  }
};
</script>