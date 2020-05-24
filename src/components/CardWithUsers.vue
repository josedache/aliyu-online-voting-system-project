<template>
  <v-card>
    <v-card-title>
      <h3 class="display-3">{{party.name}}</h3>
    </v-card-title>
    <template v-for="user in party">
      <v-card :key="user">
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"/>
        <v-card-title>
          <v-layout>
            <v-spacer/>
            <v-flex>
              <h3 class="title font-weight-light">{{`${user.firstName} ${user.lastName}`}}</h3>
              <h3>{{user.post}}</h3>
            </v-flex>
            <v-spacer/>
          </v-layout>
        </v-card-title>
      </v-card>
    </template>
  </v-card>
</template>

<script>
export default {
  props: ["party"]
};
</script>

