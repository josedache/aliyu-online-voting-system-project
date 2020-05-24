<template>
  <v-container fill-height>
    <v-layout fill-height justify-center align-center>
      <v-flex md6>
        <v-card>
          <v-card-title>
            <v-flex>
              <h3
                class="display-1 font-weight-thin text-lg-center"
              >{{`CREATE ${$route.query.role}`}}</h3>
            </v-flex>
          </v-card-title>
          <v-container>
            <v-form>
              <v-text-field outline label="User ID" disabled :value="generatedId"/>
              <v-text-field outline label="Firstname" v-model="user.firstName"/>
              <v-text-field outline label="Lastname" v-model="user.lastName"/>
              <v-text-field outline label="Phone no" v-model="user.phoneNumber"/>
              <v-text-field outline label="Date of Birth (yyyy-mm-dd)" v-model="user.dob"/>
              <v-text-field outline label="Address" v-model="user.address"/>
              <v-select :items="Object.keys(states)" label="state" outline v-model="user.state"/>
              <v-select :items="sex" label="Sex" outline v-model="user.sex"/>
              <v-select
                :items="states[user.state]"
                label="Local Govt Area"
                outline
                v-model="user.lga"
              />
              <v-select
                :items="martialStatus"
                label="Martial status"
                outline
                v-model="user.martialStatus"
              />
              <template v-if="$route.query.role == 'CANDIDATE'">
                <v-select :items="candidatePosts" label="Post" outline v-model="user.post"/>
                <v-select :items="getNamesOfParties" label="Party" outline v-model="derivedParty"/>
              </template>
              <v-text-field outline label="Password" type="password" v-model="user.password"/>
              <div class="d-flex">
                <v-btn color="primary" round outline large @click="createUser(user)">Submit</v-btn>
              </div>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { generateUserId } from "../router";
import locations from "../locations";
export default {
  data() {
    return {
      states: {
        ...locations
      },
      sex: ["Male", "Female", "Others"],
      martialStatus: ["Single", "Married"],
      derivedParty: "",
      user: {
        firstName: "",
        lastName: "",
        id: "",
        phoneNumber: "",
        dob: "",
        address: "",
        state: "",
        lga: "",
        sex: "",
        martialStatus: "",
        password: "",
        role: null,
        party: null,
        post: null
      }
    };
  },
  watch: {
    derivedParty(abbreviation) {
      this.parties.forEach(party => {
        if (party.abbreviation === abbreviation) this.user.party = party;
      });
    }
  },
  computed: {
    ...mapState(["generatedId", "candidatePosts", "parties"]),
    ...mapGetters(["getNamesOfParties"])
  },
  methods: {
    ...mapActions(["createUser"])
  },
  beforeRouteUpdate(to, from, next) {
    generateUserId(to, from, next);
  }
};
</script>
