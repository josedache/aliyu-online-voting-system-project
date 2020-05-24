<template>
  <v-container fill-height>
    <v-layout justify-center fill-height align-center>
      <v-flex xs6>
        <v-card>
          <v-card-title>
            <v-flex>
              <h3
                class="display-1 font-weight-thin text-lg-center"
              >Remove {{$route.query.of == 'user' ? 'User': 'Party'}}</h3>
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
              <v-text-field
                :label="$route.query.of == 'user' ? 'User ID': 'PARTY ID'"
                v-model="id"
                outline
              />
              <v-layout justify-center>
                <div>
                  <v-btn color="primary" @click="remove" round outline class="my-0">Submit</v-btn>
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
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      id: "",
      showAlert: false,
      forUser: false
    };
  },
  watch: {
    $route: function(to, from) {
      if (to.query.of == "user") {
        this.forUser = true;
        console.log(this.forUser);
      } else {
        this.forUser = false;
        console.log(this.forUser);
      }
    }
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    remove() {
      if (this.$route.query.of == "user") {
        this.deleteUser(this.id)
          .then(({ data, status }) => {
            if (status == 200) {
              this.$router.push({ name: "create-party" });
            }
          })
          .catch(err => {});
      } else {
        this.removeParty(this.id).then(({ data, status }) => {
          if (status == 200) this.$router.push({ name: "create-party" });
        });
      }
    },
    ...mapActions(["deleteUser", "removeParty"])
  }
};
</script>
