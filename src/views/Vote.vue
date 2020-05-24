<template>
  <v-layout fill-height justify-center align-center>
    <v-flex>
      <v-card>
        <v-container>
          <v-tabs fixed-tabs v-model="activeTab">
            <v-tab href="#PRESIDENTIAL">PRESIDENTIAL</v-tab>
            <v-tab href="#GOVERNMENTAL">GOVERNMENTAL</v-tab>
          </v-tabs>
          <v-tabs-items v-model="activeTab" class="mt-3">
            <v-tab-item value="PRESIDENTIAL">
              <v-layout row wrap>
                <template v-for="candidate in candidatesWithPost('PRESIDENTIAL')">
                  <v-flex :key="candidate.id" md4 class="ma-2">
                    <v-card elevation="1">
                      <!-- <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                      aspect-ratio="2.75"
                      />-->
                      <v-layout justify-center>
                        <div class="pa-2">
                          <v-avatar size="200">
                         <img :src="`http://localhost:8080/img/${candidate.id}.jpg`" @error="setAlternateImage" alt="empty">
                          </v-avatar>
                        </div>
                      </v-layout>
                      <v-card-title>
                        <v-layout justify-center>
                          <div class="text-md-center">
                            <h3
                              class="title font-weight-light"
                            >{{`${candidate.firstName} ${candidate.lastName}`}}</h3>
                            <h3>{{candidate.party.abbreviation}}</h3>
                            <v-btn
                              v-if="checkIfUserCanVote('PRESIDENTIAL')"
                              @click="confirmAndSubmit(candidate)"
                            >vote</v-btn>
                          </div>
                        </v-layout>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                </template>
              </v-layout>
            </v-tab-item>
            <v-tab-item value="GOVERNMENTAL">
              <v-layout row wrap>
                <template v-for="candidate in candidatesWithPost('GOVERNMENTAL')">
                  <v-flex :key="candidate.id" md4 class="ma-2">
                    <v-card elevation="1">
                      <!-- <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                      aspect-ratio="2.75"
                      />-->
                      <v-layout justify-center>
                        <div class="pa-2">
                          <v-avatar size="200">
                         <img :src="`http://localhost:8080/img/${candidate.id}.jpg`" @error="setAlternateImage" alt="empty">
                          </v-avatar>
                        </div>
                      </v-layout>
                      <v-card-title>
                        <v-layout justify-center>
                          <div class="text-md-center">
                            <h3
                              class="title font-weight-light"
                            >{{`${candidate.firstName} ${candidate.lastName}`}}</h3>
                            <h3>{{candidate.party.abbreviation}}</h3>
                            <v-btn
                              v-if="checkIfUserCanVote('GOVERNMENTAL')"
                              @click="confirmAndSubmit(candidate)"
                            >vote</v-btn>
                          </div>
                        </v-layout>
                      </v-card-title>
                    </v-card>
                  </v-flex>
                </template>
              </v-layout>
            </v-tab-item>
          </v-tabs-items>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      activeTab: "GOVERNMENTAL",
      postWithCandidates: {}
    };
  },
  watch: {},
  computed: {
    ...mapState(["candidatePosts", "user"]),
    ...mapGetters(["candidatesWithPost", "checkIfUserCanVote"])
  },
  methods: {
    confirmAndSubmit(candidate) {
      if (confirm("Are you sure to continue")) {
        this.submitVote({ candidate, voter: this.user })
          .then(({ data, status }) => {
            if (status === 200) {
              console.log('ok voted')
              this.$router.push({name: 'party'})
            }
          })
          .catch(err => {});
      }
    },
    setAlternateImage(event) {
      if (event) {
        event.target.onerror = null;
        event.target.src = "http://localhost:8080/img/empty-img-3.png";
        // console.log(event);
      }
    },
    ...mapActions(["submitVote", "getAllVotes"])
  }
};
</script>
