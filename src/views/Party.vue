<template>
  <v-layout column>
    <template v-for="party in parties">
      <v-flex :key="party.name" class="my-3">
        <v-card>
          <v-container>
            <v-card-title>
              <v-spacer/>
              <h3 class="display-1 font-weight-light">{{party.name}}</h3>
              <v-spacer/>
            </v-card-title>
            <v-layout row wrap>
              <template v-for="candidate in getCandidatesInAParty(party)">
                <v-flex :key="candidate.id" md3 class="ma-2">
                  <v-card flat>
                    <!-- <v-img
                      src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                      aspect-ratio="2.75"
                    />-->
                    <v-layout justify-center>
                      <div>
                        <v-avatar size="70">
                          <img :src="`http://localhost:8080/img/${candidate.id}.jpg`" @error="setAlternateImage" alt="empty">
                          <!-- <img
                            :src="`../assets/${candidate.id}.jpg`"
                            @error="setAlternateImage"
                            alt="empty"
                          > -->
                        </v-avatar>
                      </div>
                    </v-layout>
                    <v-card-title>
                      <v-layout justify-center>
                        <div class="text-md-center">
                          <h3
                            class="title font-weight-light"
                          >{{`${candidate.firstName} ${candidate.lastName}`}}</h3>
                          <h3>{{candidate.post}}</h3>
                        </div>
                      </v-layout>
                    </v-card-title>
                  </v-card>
                </v-flex>
              </template>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import CardWithUsers from "../components/CardWithUsers.vue";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    CardWithUsers
  },
  computed: {
    ...mapState(["parties"]),
    ...mapGetters(["getCandidatesInAParty"])
  },
  methods: {
    setAlternateImage(event) {
      if (event) {
        event.target.onerror = null;
        event.target.src = "http://localhost:8080/img/empty-img-3.png";
        // console.log(event);
      }
    }
  }
};
</script>
